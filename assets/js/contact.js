(()=>{
'use strict';
const topic=document.getElementById('topicSelect');
document.querySelectorAll('[data-topic]').forEach(link=>{
  link.addEventListener('click',()=>{
    if(!topic)return;
    const wanted=String(link.dataset.topic||'');
    [...topic.options].forEach(o=>{ if(o.textContent.trim()===wanted) topic.value=o.value; });
  });
});
const params=new URLSearchParams(location.search);
const incoming=params.get('topic');
if(topic&&incoming){
  const clean=incoming.replace(/[-_]+/g,' ').trim().toLowerCase();
  const option=[...topic.options].find(o=>o.textContent.trim().toLowerCase()===clean||o.value.trim().toLowerCase()===clean);
  if(option)topic.value=option.value;
}
})();