(()=>{
'use strict';
const API='https://elpbnytpciqnbexiaebp.supabase.co/functions/v1/nondot-website-public';
const path=()=>{const p=location.pathname||'/';return p==='/index.html'?'/':p};
const meta=(name)=>{let el=document.head.querySelector(`meta[name="${name}"]`);if(!el){el=document.createElement('meta');el.name=name;document.head.appendChild(el)}return el};
const prop=(name)=>{let el=document.head.querySelector(`meta[property="${name}"]`);if(!el){el=document.createElement('meta');el.setAttribute('property',name);document.head.appendChild(el)}return el};
const link=(rel)=>{let el=document.head.querySelector(`link[rel="${rel}"]`);if(!el){el=document.createElement('link');el.rel=rel;document.head.appendChild(el)}return el};
function apply(d){
 if(d.redirect?.target_url){const u=new URL(d.redirect.target_url,location.origin);if(u.href!==location.href){location.replace(u.href);return}}
 const p=d.page||{},s=d.site_seo||{},x=d.page_seo||{};
 if(p.title)document.title=p.seo_title||x.title_template||p.title;
 const desc=p.seo_description||x.meta_description||s.meta_description;if(desc)meta('description').content=desc;
 const canonical=p.canonical_url||x.canonical_url||((location.origin==='https://non-dot.screenings4u.com')?location.href.split('#')[0].split('?')[0]:'');if(canonical)link('canonical').href=canonical;
 const index=!(p.noindex===true||x.robots_index===false||s.robots_index===false);const follow=!(x.robots_follow===false||s.robots_follow===false);meta('robots').content=`${index?'index':'noindex'},${follow?'follow':'nofollow'}`;
 const ogt=x.og_title||s.og_title||p.title;if(ogt)prop('og:title').content=ogt;const ogd=x.og_description||s.og_description||desc;if(ogd)prop('og:description').content=ogd;
 if(x.og_image_url||s.og_image_url)prop('og:image').content=x.og_image_url||s.og_image_url;
 const html=p.content_json?.html;if(html&&document.querySelector('main'))document.querySelector('main').innerHTML=html;
 const selectors=p.content_json?.selectors;if(selectors&&typeof selectors==='object')Object.entries(selectors).forEach(([sel,value])=>{const el=document.querySelector(sel);if(el&&typeof value==='string')el.innerHTML=value});
}
fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'page',path:path()})}).then(r=>r.json().then(d=>({r,d}))).then(({r,d})=>{if(r.ok)apply(d)}).catch(()=>{});
})();
