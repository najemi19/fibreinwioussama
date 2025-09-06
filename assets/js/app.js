// تحديث السنة تلقائياً
document.querySelectorAll('#year-ar, #year-fr').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// تبديل اللغة
const btnAr = document.getElementById('btn-ar');
const btnFr = document.getElementById('btn-fr');
const mainAr = document.getElementById('lang-ar');
const mainFr = document.getElementById('lang-fr');

function toggleLang(lang) {
  const isAr = lang === 'ar';
  mainAr.hidden = !isAr;
  mainFr.hidden = isAr;
  btnAr.setAttribute('aria-pressed', isAr);
  btnFr.setAttribute('aria-pressed', !isAr);
  document.documentElement.lang = isAr ? 'ar' : 'fr';
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
}

btnAr?.addEventListener('click', () => toggleLang('ar'));
btnFr?.addEventListener('click', () => toggleLang('fr'));

// روابط واتساب ديناميكية
const waNumber = '212622358924';
function buildWAText(data, lang) {
  const sanitize = t => (t||'').toString().trim();
  const lines = lang === 'ar' ? [
    'سلام، بغيت نفعل فايبر إنوي فـ أكادير 👋',
    `— الاسم: ${sanitize(data.name)}`,
    `— الهاتف: ${sanitize(data.phone)}`
  ] : [
    'Bonjour, je souhaite activer la fibre inwi à Agadir 👋',
    `— Nom: ${sanitize(data.name)}`,
    `— Téléphone: ${sanitize(data.phone)}`
  ];
  return encodeURIComponent(lines.join('\n'));
}

function bindForm(formId, waLinkId, lang) {
  const form = document.getElementById(formId);
  const waLink = document.getElementById(waLinkId);
  form?.addEventListener('input', () => {
    const data = Object.fromEntries(new FormData(form).entries());
    waLink.href = `https://wa.me/${waNumber}?text=${buildWAText(data, lang)}`;
  });
}

bindForm('leadFormAr', 'waQuickAr', 'ar');
bindForm('leadFormFr', 'waQuickFr', 'fr');
