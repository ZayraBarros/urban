// Ano no footer
document.addEventListener("DOMContentLoaded", () => {
  const y = document.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();
});
// Atualiza o ano no footer
document.getElementById('year').textContent = new Date().getFullYear();


/* ===== UTM → WhatsApp (preserva origem) ===== */
function parseUTM(){
  const p = new URLSearchParams(location.search);
  const get = k => p.get(k) || "";
  return {
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_term: get("utm_term"),
    utm_content: get("utm_content"),
    referrer: document.referrer || "",
    page: location.href
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const utm = parseUTM();
  const utmStr = Object.entries(utm)
    .filter(([,v]) => v && v.length)
    .map(([k,v]) => `${k}:${v}`).join(" | ");
  if(!utmStr) return;

  document.querySelectorAll('a[href*="wa.me/"]').forEach(a=>{
    try{
      const url = new URL(a.href);
      const txt = url.searchParams.get('text') || '';
      a.href = url.toString();
    }catch(e){}
  });
});

/* ===== On-scroll reveal (IntersectionObserver) ===== */
(function(){
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const els = document.querySelectorAll(`
    [data-animate],
    .stat-card,
    .service-card,
    .t-card,
    .closing-box,
    .numbers .text-center
  `);

  // se o dev não marcou, padroniza como slide-up
  els.forEach(el => { if(!el.hasAttribute("data-animate")) el.setAttribute("data-animate","slide-up"); });

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .14 });

  els.forEach(el => io.observe(el));
})();
