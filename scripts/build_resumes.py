"""Rebuild selectable, single-column resumes from assets/profile.json.
Run with Python 3 and reportlab. No remote assets or credentials required.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import json
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import letter
BASE=Path(__file__).resolve().parents[1]
# Bundled DejaVu has accents and readable extraction; use common OS fonts if absent.
fontdir=Path('C:/Windows/Fonts')
if (fontdir/'arial.ttf').exists():
    regular,bold=fontdir/'arial.ttf',fontdir/'arialbd.ttf'
else:
    import reportlab
    fontdir=Path(reportlab.__file__).parent/'fonts'
    regular,bold=fontdir/'Vera.ttf',fontdir/'VeraBd.ttf'
pdfmetrics.registerFont(TTFont('Resume',str(regular)))
pdfmetrics.registerFont(TTFont('ResumeBold',str(bold)))
pdfmetrics.registerFontFamily('Resume',normal='Resume',bold='ResumeBold',italic='Resume',boldItalic='ResumeBold')
styles={
'body':ParagraphStyle('body',fontName='Resume',fontSize=10.2,leading=14,spaceAfter=6,textColor=colors.HexColor('#172331')),
'name':ParagraphStyle('name',fontName='ResumeBold',fontSize=20,leading=25,spaceAfter=6),
'role':ParagraphStyle('role',fontName='ResumeBold',fontSize=11,leading=15,spaceAfter=7),
'contact':ParagraphStyle('contact',fontName='Resume',fontSize=9,leading=13,spaceAfter=8),
'heading':ParagraphStyle('heading',fontName='ResumeBold',fontSize=11.5,leading=16,spaceBefore=10,spaceAfter=6,keepWithNext=True),
'job':ParagraphStyle('job',fontName='ResumeBold',fontSize=10.2,leading=14,spaceAfter=3),
'bullet':ParagraphStyle('bullet',fontName='Resume',fontSize=10.2,leading=14,leftIndent=11,firstLineIndent=-8,spaceAfter=4),
}
def para(text,style='body'):return Paragraph(escape(text),styles[style])
def build(language,filename,support=False):
    data=json.loads((BASE/'assets/profile.json').read_text(encoding='utf-8'));v=data[language];labels=v['labels'];story=[]
    story.extend([para(data['name'],'name'),para(v['title'],'role'),para(data['location']+' | '+data['phone']+' | '+data['email'],'contact'),para(data['linkedin']+' | '+data['portfolio'],'contact')])
    story.extend([para(labels[0],'heading'),para(v['summary'])])
    if support:
        story.append(para('Focus: L1/L2 troubleshooting, connectivity, network monitoring, user guidance and documented case follow-up.'))
    story.append(para(labels[1],'heading'))
    for title,text in v['skills']:story.append(para(title+': '+text))
    story.append(para(labels[2],'heading'))
    for i,job in enumerate(v['jobs']):
        if i==3:story.extend([PageBreak(),para(labels[2]+(' · continuación' if language=='es' else ' · continued'),'heading')])
        block=[para(job['title']+' | '+job['company'],'job'),para(job['date'])]
        block.extend(para('• '+s,'bullet') for s in job['bullets'])
        story.append(KeepTogether(block))
    story.append(para(labels[3],'heading'))
    for title,meta in v['education']:story.append(KeepTogether([para(title,'job'),para(meta)]))
    story.append(para(labels[4],'heading'))
    for text in v['courses']:story.append(para(text))
    story.extend([para(labels[5],'heading'),para(v['languages'])])
    doc=SimpleDocTemplate(str(BASE/filename),pagesize=letter,rightMargin=52,leftMargin=52,topMargin=42,bottomMargin=42,title=data['name']+' | '+v['title'],author=data['name'])
    doc.build(story)
if __name__=='__main__':
    build('en','Roy_Azofeifa_Resume_EN.pdf')
    build('es','Roy_Azofeifa_CV_ES.pdf')
    build('en','Roy_Azofeifa_Amazon_Support_Engineer_CV.pdf',support=True)
