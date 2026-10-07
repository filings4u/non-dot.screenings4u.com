(()=>{'use strict';
const API='https://elpbnytpciqnbexiaebp.supabase.co/functions/v1/nondot-website-public';
const labels={"employee_management":"Employee / driver records","employer_management":"Employer client management","team_users":"Staff / account users","locations":"Locations / terminals","ders_supervisors":"DERs & supervisors","post_accident":"Post-accident management","action_center":"Compliance Action Center","policy_acknowledgments":"Policy distribution & acknowledgments","training_records":"Training records","programs":"NON-DOT programs","random_pool":"Random pool participation","consortium_pools":"Consortium pools","random_selections":"Random selections","testing_orders":"Testing orders & workflow","collection_sites":"Collection site finder","results_summary":"Result summary visibility","results_sensitive":"Sensitive result visibility","compliance":"Compliance management","documents":"Documents & certificates","standard_reports":"Standard reports","advanced_reports":"Advanced reports / MIS","billing_tools":"Billing tools","notifications":"Notifications & reminders","customer_portal_delivery":"Customer portal delivery","client_invoicing":"Client invoicing","bulk_employee_import":"Bulk employee / driver import","integrations":"Integrations","scheduler":"Scheduler","branded_email":"Branded customer email","task_manager":"Task Manager","white_label":"White label","audit_history":"Audit history","policy_builder":"Employer drug & alcohol policy builder","employer_settings":"Employer feature controls","employer_import":"Employer spreadsheet import","enrollment_documents":"Enrollment agreements & certificates","sso":"Single sign-on (SSO)"};
const pricingData={"employer":[{"code":"workforce_employer_essential","name":"Essential","price":85,"limit":"100 employees / 100 drivers","services":["employee_management","post_accident","policy_acknowledgments","programs","random_pool","random_selections","testing_orders","results_summary","compliance","documents","standard_reports","notifications"]},{"code":"workforce_employer_professional","name":"Professional","price":145,"limit":"500 employees / 500 drivers","popular":true,"services":["employee_management","team_users","ders_supervisors","post_accident","action_center","policy_acknowledgments","training_records","programs","random_pool","random_selections","testing_orders","collection_sites","results_summary","results_sensitive","compliance","documents","standard_reports","advanced_reports","notifications"]},{"code":"workforce_employer_enterprise","name":"Enterprise","price":245,"limit":"Expanded / custom","services":["employee_management","bulk_employee_import","team_users","locations","ders_supervisors","post_accident","action_center","policy_acknowledgments","training_records","programs","random_pool","random_selections","testing_orders","collection_sites","results_summary","results_sensitive","compliance","documents","standard_reports","advanced_reports","notifications","integrations","scheduler","branded_email","task_manager","white_label","audit_history"]}],"ctpa":[{"code":"workforce_ctpa_essential","name":"Essential","price":125,"services":["employee_management","employer_management","programs","consortium_pools","random_selections","testing_orders","results_summary","compliance","documents","standard_reports","billing_tools","notifications","client_invoicing"]},{"code":"workforce_ctpa_professional","name":"Professional","price":225,"popular":true,"services":["employee_management","employer_management","programs","consortium_pools","random_selections","testing_orders","collection_sites","results_summary","results_sensitive","compliance","documents","standard_reports","advanced_reports","billing_tools","notifications","customer_portal_delivery","client_invoicing"]},{"code":"workforce_ctpa_enterprise","name":"Enterprise","price":375,"services":["employee_management","employer_management","team_users","locations","programs","consortium_pools","random_selections","testing_orders","collection_sites","results_summary","results_sensitive","compliance","documents","standard_reports","advanced_reports","billing_tools","notifications","customer_portal_delivery","integrations","branded_email","policy_builder","employer_settings","employer_import","enrollment_documents","client_invoicing","white_label","sso","audit_history"]}]};
const meta={
 employer:{eyebrow:'Employer Plans',title:'NON-DOT Employer software plan comparison.',description:'Compare the services included in the active Employer Essential, Professional, and Enterprise plans.'},
 ctpa:{eyebrow:'C/TPA Plans',title:'NON-DOT C/TPA software plan comparison.',description:'Compare active C/TPA plans for employer-client management, pools, testing, billing, portal delivery, and enterprise controls.'}
};
const priceBar=document.querySelector('[data-price-bar]');
const tableBody=document.querySelector('[data-table-body]');
const tableFoot=document.querySelector('[data-table-foot]');
const tabs=[...document.querySelectorAll('.product-tab')];
const eyebrow=document.querySelector('[data-audience-eyebrow]');
const title=document.querySelector('[data-audience-title]');
const description=document.querySelector('[data-audience-description]');
const comparisonHeading=document.querySelector('.comparison-heading');
const comparisonShell=document.querySelector('[data-comparison-shell]');
let mobileCards=document.querySelector('[data-mobile-cards]');
if(!mobileCards&&comparisonHeading&&comparisonShell){
 mobileCards=document.createElement('div');
 mobileCards.className='mobile-plan-cards';
 mobileCards.setAttribute('data-mobile-cards','');
 comparisonShell.parentNode.insertBefore(mobileCards,comparisonShell);
}
let activeProduct='employer';
const link=code=>`checkout.html?plan=${encodeURIComponent(code)}`;

function renderPricing(product){
 activeProduct=product;
 const data=pricingData[product],m=meta[product];
 eyebrow.textContent=m.eyebrow;title.textContent=m.title;description.textContent=m.description;
 tabs.forEach(tab=>{const on=tab.dataset.product===product;tab.classList.toggle('active',on);tab.setAttribute('aria-selected',String(on));});
 priceBar.innerHTML=`<div class="summary-intro"><span class="summary-kicker">${m.eyebrow}</span><p>Pricing stays visible while you compare</p></div>`+
 data.map(plan=>`<article class="summary-plan ${plan.popular?'is-featured':''}"><span class="summary-plan-name">${plan.name}</span>${plan.popular?'<em>Most Popular</em>':''}<strong>${`$${plan.price}`}</strong><small>/month</small><a href="${link(plan.code)}" class="mini-btn ${plan.popular?'primary':''}">Choose ${plan.name}</a></article>`).join('');

 const featureOrder=[];
 data.forEach(plan=>plan.services.forEach(service=>{if(!featureOrder.includes(service))featureOrder.push(service);}));
 const core=['employee_management','employer_management','programs','random_pool','consortium_pools','random_selections','testing_orders','results_summary','compliance','documents','standard_reports','notifications','client_invoicing'];
 const coreFeatures=featureOrder.filter(x=>core.includes(x));
 const expanded=featureOrder.filter(x=>!core.includes(x));
 const row=service=>`<tr><th scope="row">${labels[service]||service}</th>${data.map(plan=>`<td class="${plan.services.includes(service)?'yes':'no'}">${plan.services.includes(service)?'✓':'—'}</td>`).join('')}</tr>`;
 let html=`<tr class="section-row"><th colspan="4">Core included services</th></tr>${coreFeatures.map(row).join('')}`;
 if(product==='employer') html+=`<tr><th scope="row">Employee / driver capacity</th>${data.map(plan=>`<td>${plan.limit||'Expanded / custom'}</td>`).join('')}</tr>`;
 if(expanded.length)html+=`<tr class="section-row"><th colspan="4">Expanded tools & administration</th></tr>${expanded.map(row).join('')}`;
 tableBody.innerHTML=html;
 tableFoot.innerHTML=`<tr><th scope="row">Monthly price</th>${data.map(plan=>`<td class="${plan.popular?'popular-col':''}"><strong>$${plan.price}</strong><small>/month</small><a href="${link(plan.code)}" class="table-btn ${plan.popular?'primary':''}">Choose ${plan.name}</a></td>`).join('')}</tr>`;

 if(mobileCards){
  mobileCards.innerHTML=data.map(plan=>`<article class="mobile-plan-card ${plan.popular?'is-featured':''}"><div class="mobile-plan-head"><div><span class="mobile-plan-name">${plan.name}</span>${plan.popular?'<span class="mobile-plan-badge">Most Popular</span>':''}</div><div class="mobile-plan-price"><strong>$${plan.price}</strong><span>/month</span></div></div><a href="${link(plan.code)}" class="mobile-plan-cta">Choose ${plan.name}</a><details class="mobile-plan-details" ${plan.popular?'open':''}><summary>Included services (${plan.services.length})</summary><ul class="mobile-feature-list">${plan.services.map(s=>`<li>${labels[s]||s}</li>`).join('')}</ul></details></article>`).join('');
 }
}
tabs.forEach(tab=>tab.addEventListener('click',()=>renderPricing(tab.dataset.product)));
renderPricing(activeProduct);

const sideLinks=[...document.querySelectorAll('.side-link')];
const sectionMap=sideLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if(sideLinks.length&&sectionMap.length){const setActive=()=>{let current=sectionMap[0].id;const offset=window.scrollY+160;sectionMap.forEach(section=>{if(section.offsetTop<=offset)current=section.id;});sideLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));};window.addEventListener('scroll',setActive,{passive:true});setActive();}

const floatingStack=document.querySelector('[data-floating-stack]');
const comparisonWrap=document.querySelector('.comparison-wrap');
const comparisonTableShell=document.querySelector('[data-comparison-shell]');
if(floatingStack&&comparisonWrap){
 let raf=0;
 const update=()=>{raf=0;if(window.innerWidth<=700){floatingStack.style.opacity='1';floatingStack.style.transform='none';return;}const stopTarget=comparisonTableShell||comparisonWrap;const remaining=stopTarget.getBoundingClientRect().bottom-floatingStack.getBoundingClientRect().bottom;const opacity=Math.max(0,Math.min(1,(remaining-120)/(560-120)));floatingStack.style.opacity=String(opacity);floatingStack.style.transform=opacity<1?`translate3d(0,${-10*(1-opacity)}px,0)`:'translate3d(0,0,0)';};
 const req=()=>{if(!raf)raf=requestAnimationFrame(update)};window.addEventListener('scroll',req,{passive:true});window.addEventListener('resize',req);req();
}

function applyLive(payload){
 const plans=Array.isArray(payload?.plans)?payload.plans:[];
 if(!plans.length)return;
 ['employer','ctpa'].forEach(kind=>{
  const list=plans.filter(p=>p.audience===kind).sort((a,b)=>Number(a.monthly_price)-Number(b.monthly_price));
  if(list.length!==3)return;
  pricingData[kind]=list.map((p,i)=>{
    const details=Array.isArray(p.feature_details)?p.feature_details:[];
    const services=details.length?details.filter(f=>f.enabled===true).sort((a,b)=>Number(a.sort_order||999)-Number(b.sort_order||999)).map(f=>f.code):Object.entries(p.feature_entitlements||{}).filter(([,v])=>v===true).map(([k])=>k);
    details.forEach(f=>{if(f?.code&&f?.name)labels[f.code]=String(f.name).replace(/^DOT \/ Non-DOT Programs$/,'NON-DOT Programs');});
    return {code:p.code,name:String(p.name||'').replace(/^Workforce (Employer|C\/TPA) /,''),price:Number(p.monthly_price||0),popular:i===1,limit:p.employee_limit?`${p.employee_limit} employees / ${p.driver_limit||p.employee_limit} drivers`:'Expanded / custom',services};
  });
 });
 renderPricing(activeProduct);
}
fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'pricing'})}).then(r=>r.ok?r.json():Promise.reject()).then(applyLive).catch(()=>{});
})();
