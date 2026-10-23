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
