(()=>{
'use strict';
const target=document.getElementById('siteHeader');if(!target)return;
const f=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const active=n=>f===n?' is-active':'';
const group=names=>names.includes(f)?' is-active':'';
target.innerHTML=`<header class="s4u-header"><nav class="s4u-nav" aria-label="Primary navigation">
<a class="s4u-brand" href="index.html" aria-label="Workforce by screenings4u home"><img src="images/logo.png" alt="Workforce by screenings4u"></a>
<button class="s4u-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="s4uPrimary"><span></span></button>
<div class="s4u-links" id="s4uPrimary">
<a class="s4u-link${active('platform.html')}" href="platform.html">Platform</a>
<details class="s4u-menu s4u-mega${group(['employers.html','ctpa.html'])}"><summary>Solutions <i class="s4u-caret"></i></summary><div class="s4u-menu-panel s4u-mega-panel"><div class="s4u-mega-grid">
<div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Workforce Solutions</span>
<a class="${active('employers.html').trim()}" href="employers.html"><strong>Employers</strong><small>Manage employees, workforce programs, random testing, records and compliance.</small></a>
<a class="${active('ctpa.html').trim()}" href="ctpa.html"><strong>C/TPAs</strong><small>Manage multiple non-DOT employer clients from one operating workspace.</small></a></div>
<div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Platform</span>
<a href="platform.html"><strong>Workforce Platform</strong><small>One connected SaaS workspace for non-DOT workforce operations.</small></a>
<a href="pricing.html"><strong>Plans & Pricing</strong><small>Compare Employer and C/TPA subscription plans.</small></a>
<a href="demo.html"><strong>Request a Demo</strong><small>See the Workforce platform with your team.</small></a></div>
<a class="s4u-mega-feature" href="platform.html"><span>Workforce</span><strong>Connected workforce software for non-DOT programs.</strong><small>Employees, programs, random selections, testing, compliance, documents and reporting in one system.</small><b>Explore the platform →</b></a>
</div></div></details>
<details class="s4u-menu s4u-mega${group(['services.html','testing.html','background-screening.html','occupational-health.html','compliance-services.html'])}"><summary>Services <i class="s4u-caret"></i></summary><div class="s4u-menu-panel s4u-mega-panel"><div class="s4u-mega-grid">
<div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Workforce Services</span>
<a href="testing.html"><strong>Workforce Testing</strong><small>Non-DOT drug and alcohol testing workflows connected to workforce records.</small></a>
<a href="background-screening.html"><strong>Background Screening</strong><small>Screening and verification workflows through approved providers.</small></a>
<a href="occupational-health.html"><strong>Occupational Health</strong><small>Clinic-based occupational health scheduling and record tracking.</small></a></div>
<div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Compliance Services</span>
<a href="compliance-services.html"><strong>Policies & Compliance</strong><small>Policy creation, acknowledgments, compliance reviews and remediation workflows.</small></a>
<a href="services.html"><strong>All Services</strong><small>Explore the active Workforce service catalog.</small></a>
<a href="contact.html"><strong>Talk to Our Team</strong><small>Discuss implementation, integrations and service configuration.</small></a></div>
<a class="s4u-mega-feature" href="services.html"><span>Workforce services</span><strong>Software first, with services connected when you need them.</strong><small>Keep operational work and service records attached to the same employer and employee data.</small><b>Explore services →</b></a>
</div></div></details>
<details class="s4u-menu s4u-mega${group(['resources.html','contact.html'])}"><summary>Resources <i class="s4u-caret"></i></summary><div class="s4u-menu-panel s4u-mega-panel"><div class="s4u-mega-grid">
<div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Resources</span><a href="resources.html"><strong>Resource Center</strong><small>Workforce operations, compliance and implementation resources.</small></a><a href="contact.html"><strong>Contact</strong><small>Talk with the Workforce team.</small></a></div>
<div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Get Started</span><a href="demo.html"><strong>Request Demo</strong><small>See the platform with your workflows.</small></a><a href="pricing.html"><strong>View Plans</strong><small>Compare Employer and C/TPA plans.</small></a><a href="login.html"><strong>Sign In</strong><small>Access your Workforce account.</small></a></div>
<a class="s4u-mega-feature" href="resources.html"><span>Resource Center</span><strong>Practical information for workforce program operations.</strong><small>Keep software, services and operational guidance close at hand.</small><b>Browse resources →</b></a></div></div></details>
<a class="s4u-link${active('pricing.html')}" href="pricing.html">Pricing</a>
<div class="s4u-mobile-actions"><a class="s4u-signin" href="login.html">Sign In</a><a class="s4u-nav-btn secondary" href="demo.html">Request Demo</a><a class="s4u-nav-btn primary" href="pricing.html">View Plans</a></div></div>
<div class="s4u-actions"><a class="s4u-signin" href="login.html">Sign In</a><a class="s4u-nav-btn secondary" href="demo.html">Request Demo</a><a class="s4u-nav-btn primary" href="pricing.html">View Plans</a></div>
</nav></header>`;
const toggle=target.querySelector('.s4u-toggle'),links=target.querySelector('.s4u-links');const mobile=()=>innerWidth<=980;
const closeMenus=()=>target.querySelectorAll('.s4u-menu[open]').forEach(d=>d.removeAttribute('open'));const close=()=>{toggle?.setAttribute('aria-expanded','false');links?.classList.remove('mobile-open');document.body.classList.remove('s4u-nav-open');closeMenus()};
toggle?.addEventListener('click',e=>{e.stopPropagation();const o=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!o));links?.classList.toggle('mobile-open',!o);document.body.classList.toggle('s4u-nav-open',!o)});
links?.querySelectorAll('.s4u-menu').forEach(menu=>{const summary=menu.querySelector('summary');const openDesktop=()=>{if(mobile())return;closeMenus();menu.setAttribute('open','')};summary?.addEventListener('mouseenter',openDesktop);menu.querySelector('.s4u-menu-panel')?.addEventListener('mouseenter',openDesktop);summary?.addEventListener('click',e=>{if(!mobile()){e.preventDefault();e.stopPropagation();const was=menu.open;closeMenus();if(!was)menu.setAttribute('open','')}})});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('click',e=>{if(!target.contains(e.target))close();else if(!mobile()&&!e.target.closest('.s4u-menu'))closeMenus()});addEventListener('resize',close);
})();