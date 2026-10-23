'use strict';
(() => {
  const root = document.documentElement;
  const dictionary = JSON.parse(document.getElementById('translations').textContent);
  const languageButton = document.getElementById('langToggle');
  const themeButton = document.getElementById('themeToggle');
  // Storage is optional (private browsing, embedded views and disabled storage).
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* UI remains usable. */ } };
  const labels = {
    es: {nav:'Navegación principal', lang:'Read this portfolio in English', theme:'Activar tema claro', dark:'Activar tema oscuro', photo:'Fotografía profesional de Roy Alexander Azofeifa Muñoz', copy:'Copiar registro de ', copied:'Registro copiado: ', failed:'No se pudo copiar. Seleccione el registro: ', title:'Roy Azofeifa | Infraestructura TI y soporte', description:'Ingeniero de Sistemas con experiencia en soporte L1/L2, infraestructura y redes. Maestría en Educación con énfasis en Docencia. Experiencia en Amazon ERC.'},
    en: {nav:'Main navigation', lang:'Leer este portafolio en español', theme:'Switch to light theme', dark:'Switch to dark theme', photo:'Professional portrait of Roy Alexander Azofeifa Muñoz', copy:'Copy credential number for ', copied:'Credential number copied: ', failed:'Unable to copy. Select the credential number: ', title:'Roy Azofeifa | IT Infrastructure & Technical Support', description:'Systems Engineer with L1/L2 support, infrastructure and network experience. Professional master’s degree in education with an emphasis in teaching. Former Amazon ERC specialist.'}
  };
  function updateThemeLabel() {
    const l=labels[root.lang];
    themeButton.setAttribute('aria-label', root.dataset.theme==='light' ? l.dark : l.theme);
    themeButton.setAttribute('aria-pressed', String(root.dataset.theme==='light'));
    document.querySelector('meta[name="theme-color"]').content=root.dataset.theme==='light'?'#edf5fa':'#07111f';
  }
  function setLanguage(lang) {
    if (!labels[lang]) lang='es';
    document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent=dictionary[node.dataset.i18n][lang]; });
    root.lang=lang;
    languageButton.textContent=lang==='es'?'EN':'ES';
    languageButton.setAttribute('aria-label',labels[lang].lang);
    languageButton.setAttribute('lang',lang==='es'?'en':'es');
    document.querySelector('nav').setAttribute('aria-label',labels[lang].nav);
    document.querySelector('.portrait').alt=labels[lang].photo;
    document.title=labels[lang].title;
    document.querySelector('meta[name="description"]').content=labels[lang].description;
    document.querySelectorAll('.copy-code').forEach(button => {
      const title=button.closest('.credential').querySelector('strong').textContent;
      button.setAttribute('aria-label',labels[lang].copy+title);
    });
    document.getElementById('copyStatus').textContent='';
    updateThemeLabel(); save('cv-lang',lang);
  }
  const initialTheme=read('cv-theme');
  root.dataset.theme=['light','dark'].includes(initialTheme)?initialTheme:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
  const requested=new URLSearchParams(location.search).get('lang');
  setLanguage(['es','en'].includes(requested)?requested:read('cv-lang')||'es');
  languageButton.addEventListener('click',()=>{
    const lang=root.lang==='es'?'en':'es';setLanguage(lang);
    const url=new URL(location.href);url.searchParams.set('lang',lang);
    try { history.replaceState(null,'',url); } catch { /* Language still changes. */ }
  });
  themeButton.addEventListener('click',()=>{
    root.dataset.theme=root.dataset.theme==='light'?'dark':'light';save('cv-theme',root.dataset.theme);updateThemeLabel();
  });
  document.getElementById('printResume').addEventListener('click',()=>window.print());
  document.querySelectorAll('.copy-code').forEach(button=>button.addEventListener('click',async()=>{
    const status=document.getElementById('copyStatus');
    try { await navigator.clipboard.writeText(button.dataset.code);status.textContent=labels[root.lang].copied+button.dataset.code; }
    catch { status.textContent=labels[root.lang].failed+button.dataset.code; }
  }));
  document.getElementById('year').textContent=new Date().getFullYear();
})();

// Original interactive constellation background.
const root=document.documentElement;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
(()=>{if(reduce)return;const canvas=document.getElementById('constellation'),ctx=canvas.getContext('2d');let points=[],w=0,h=0,dpr=1,pointer={x:-9999,y:-9999};
      const resize=()=>{dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.min(78,Math.max(34,Math.floor(w*h/22000)));points=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.5+.5,phase:Math.random()*Math.PI*2}))};
      addEventListener('resize',resize,{passive:true});addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY},{passive:true});addEventListener('pointerleave',()=>pointer={x:-9999,y:-9999});resize();
      const frame=t=>{ctx.clearRect(0,0,w,h);const light=root.dataset.theme==='light';for(const p of points){const dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy);if(d<150&&d>0){p.vx+=dx/d*.008;p.vy+=dy/d*.008}p.x+=p.vx;p.y+=p.vy;p.vx*=.998;p.vy*=.998;if(p.x<-10)p.x=w+10;if(p.x>w+10)p.x=-10;if(p.y<-10)p.y=h+10;if(p.y>h+10)p.y=-10}
        for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],dist=Math.hypot(a.x-b.x,a.y-b.y);if(dist<145){ctx.strokeStyle=light?`rgba(18,101,145,${(1-dist/145)*.12})`:`rgba(72,214,232,${(1-dist/145)*.13})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
        points.forEach(p=>{const glow=.65+Math.sin(t*.001+p.phase)*.25;ctx.fillStyle=light?`rgba(38,119,158,${glow*.35})`:`rgba(103,232,183,${glow*.48})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(frame)};requestAnimationFrame(frame)})();

