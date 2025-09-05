document.addEventListener('DOMContentLoaded', () => {
  const envelopeWrap=document.getElementById('envelopeWrap');
  const envelope=document.getElementById('envelope');
  const mainContent=document.getElementById('mainContent');
  const seal=document.querySelector('.seal');

  function openEnvelope(){
    envelope.classList.add('open');
    setTimeout(()=>{
      envelopeWrap.style.transition='opacity .6s';
      envelopeWrap.style.opacity=0;
      setTimeout(()=>{
        envelopeWrap.style.display='none';
        mainContent.classList.add('visible');
      },600);
    },900);
  }
  if(seal) seal.addEventListener('click', openEnvelope);

  const bgm=document.getElementById('bgm');
  const musicBtn=document.getElementById('musicBtn');
  function setMusicUI(play){ musicBtn.textContent=play?'⏸ Jeda Musik':'▶ Putar Musik Gamelan'; }
  if(musicBtn) musicBtn.addEventListener('click', async()=>{
    if(bgm.paused){ await bgm.play(); setMusicUI(true); }
    else { bgm.pause(); setMusicUI(false); }
  });
  window.addEventListener('load',()=>{ bgm.play().then(()=>setMusicUI(true)).catch(()=>{}); });

  const imgs=document.querySelectorAll('.gallery img');
  const gIO=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const img=e.target;
        if(img.dataset.src) img.src=img.dataset.src;
        img.classList.add('visible');
        gIO.unobserve(img);
      }
    });
  },{threshold:.1});
  imgs.forEach(i=>gIO.observe(i));

  const lb=document.getElementById('lightbox');
  const lbImg=document.getElementById('lightboxImg');
  document.getElementById('gallery').addEventListener('click',e=>{
    const img=e.target.closest('img'); if(!img) return;
    lbImg.src=img.src; lb.style.display='flex';
  });
  lb.addEventListener('click',()=>{ lb.style.display='none'; lbImg.src=''; });

  const rsvp=document.getElementById('rsvp');
  const r_status=document.getElementById('r_status');
  rsvp.addEventListener('submit',e=>{
    e.preventDefault();
    r_status.textContent='Terima kasih — RSVP diterima';
    rsvp.reset(); setTimeout(()=>r_status.textContent='',4000);
  });
});