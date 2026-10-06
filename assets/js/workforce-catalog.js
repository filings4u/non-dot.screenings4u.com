(()=>{'use strict';
const API='https://elpbnytpciqnbexiaebp.supabase.co/functions/v1/nondot-website-public';
fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'pricing'})})
 .then(r=>{if(!r.ok)throw 0;return r.json()})
 .then(d=>{window.S4UNondotCatalog=d;window.dispatchEvent(new CustomEvent('s4u:nondot-catalog-loaded',{detail:d}))})
 .catch(()=>{});
})();
