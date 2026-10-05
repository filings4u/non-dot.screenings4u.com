(()=>{
'use strict';
const TARGET='siteHeader';
function key(){const f=(location.pathname.split('/').pop()||'index.html').toLowerCase();return f.replace(/\.html$/,'')||'index'}
function active(...keys){return keys.includes(key())?' is-active':''}
function render(){
 const t=document.getElementById(TARGET); if(!t)return;
 t.innerHTML=`<header class="s4u-header"><nav class="s4u-nav" aria-label="Primary navigation">
 <a class="s4u-brand" href="index.html" aria-label="screenings4u Workforce Compliance home"><img src="images/logo.png" alt="screenings4u Workforce Compliance"></a>
 <button class="s4u-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="s4uPrimary"><span></span></button>
 <div class="s4u-links" id="s4uPrimary">
   <a class="s4u-link${active('platform')}" href="platform.html">Platform</a>
   <details class="s4u-menu s4u-mega${active('employers','ctpa')}"><summary>Solutions <i class="s4u-caret"></i></summary><div class="s4u-menu-panel s4u-mega-panel"><div class="s4u-mega-grid">
     <div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Workforce Solutions</span>
       <a href="employers.html"><strong>Employers</strong><small>Manage employees, company-policy testing programs, compliance work and records.</small></a>
       <a href="ctpa.html"><strong>C/TPAs</strong><small>Manage multiple client workforces, NON-DOT programs, pools and testing workflows.</small></a>
     </div>
     <div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Software</span>
       <a href="platform.html"><strong>Workforce Compliance Platform</strong><small>One connected NON-DOT compliance workspace.</small></a>
       <a href="pricing.html"><strong>Plans & Pricing</strong><small>Compare Employer and C/TPA subscriptions.</small></a>
       <a href="contact.html"><strong>Talk With Our Team</strong><small>Get help choosing the right software plan.</small></a>
     </div>
     <a class="s4u-mega-feature" href="platform.html"><span>Workforce Compliance</span><strong>Connected software for company-policy testing programs.</strong><small>Employees, testing, random pools, documents, reporting and compliance history in one system.</small><b>Explore the platform →</b></a>
   </div></div></details>
   <details class="s4u-menu s4u-mega${active('employer-pricing','ctpa-pricing','pricing')}"><summary>Pricing <i class="s4u-caret"></i></summary><div class="s4u-menu-panel s4u-mega-panel"><div class="s4u-mega-grid">
     <div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Subscription Plans</span><a href="employer-pricing.html"><strong>Employer Pricing</strong><small>Plans for organizations managing their own workforce.</small></a><a href="ctpa-pricing.html"><strong>C/TPA Pricing</strong><small>Plans for multi-client program administration.</small></a></div>
     <div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Get Started</span><a href="pricing.html"><strong>Pricing Overview</strong><small>Choose the workspace that fits your operation.</small></a><a href="contact.html"><strong>Plan Questions</strong><small>Talk with screenings4u before you subscribe.</small></a></div>
     <a class="s4u-mega-feature" href="pricing.html"><span>Monthly software</span><strong>Choose the plan depth your operation needs.</strong><small>Testing services are purchased separately when you want screenings4u fulfillment.</small><b>Compare plans →</b></a>
   </div></div></details>
   <details class="s4u-menu s4u-mega${active('blog','blog-post','contact')}"><summary>Resources <i class="s4u-caret"></i></summary><div class="s4u-menu-panel s4u-mega-panel"><div class="s4u-mega-grid">
     <div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Resources</span><a href="blog.html"><strong>Workforce Blog</strong><small>NON-DOT compliance and program guidance.</small></a><a href="contact.html"><strong>Contact</strong><small>Talk with the Workforce Compliance team.</small></a></div>
     <div class="s4u-mega-col"><span class="s4u-mega-eyebrow">Account</span><a href="login.html"><strong>Sign In</strong><small>Access your Workforce Compliance workspace.</small></a><a href="employer-pricing.html"><strong>Employer Plans</strong><small>Compare employer software plans.</small></a><a href="ctpa-pricing.html"><strong>C/TPA Plans</strong><small>Compare C/TPA software plans.</small></a></div>
     <a class="s4u-mega-feature" href="blog.html"><span>NON-DOT Resources</span><strong>Practical guidance for workforce testing and compliance.</strong><small>Company-policy programs, random testing, records and operational workflows.</small><b>Browse articles →</b></a>
   </div></div></details>
   <div class="s4u-mobile-actions"><a class="s4u-signin" href="login.html">Sign In</a><a class="s4u-nav-btn secondary" href="contact.html">Contact Sales</a><a class="s4u-nav-btn primary" href="pricing.html">View Plans</a></div>
 </div>
 <div class="s4u-actions"><a class="s4u-signin" href="login.html">Sign In</a><a class="s4u-nav-btn secondary" href="contact.html">Contact Sales</a><a class="s4u-nav-btn primary" href="pricing.html">View Plans</a></div>
 </nav></header>`;
 const toggle=t.querySelector('.s4u-toggle'), links=t.querySelector('.s4u-links');
 const mobile=()=>innerWidth<=980;
 const closeMenus=()=>t.querySelectorAll('.s4u-menu[open]').forEach(d=>d.removeAttribute('open'));
 const close=()=>{toggle?.setAttribute('aria-expanded','false');links?.classList.remove('mobile-open');document.body.classList.remove('s4u-nav-open');closeMenus()};
 toggle?.addEventListener('click',e=>{e.stopPropagation();const o=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!o));links?.classList.toggle('mobile-open',!o);document.body.classList.toggle('s4u-nav-open',!o)});
 links?.querySelectorAll('.s4u-menu').forEach(menu=>{const summary=menu.querySelector('summary');summary?.addEventListener('click',e=>{if(!mobile()){e.preventDefault();e.stopPropagation();const was=menu.open;closeMenus();if(!was)menu.open=true}});summary?.addEventListener('mouseenter',()=>{if(!mobile()){closeMenus();menu.open=true}})});
 links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('click',e=>{if(!t.contains(e.target))close()}); window.addEventListener('resize',close);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();
