/* Muslim Matching — shared site behaviour (vanilla, no deps) */
(function(){
  // nav shadow on scroll (sentinel, no scroll listener)
  var nav = document.getElementById('nav');
  var sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:8px;width:1px';
  document.body.prepend(sentinel);
  if(nav && 'IntersectionObserver' in window){
    new IntersectionObserver(function(e){
      nav.classList.toggle('scrolled', !e[0].isIntersecting);
    },{threshold:0}).observe(sentinel);
  }

  // mobile menu
  var menu = document.getElementById('mobileMenu');
  var open = document.getElementById('menuOpen');
  var close = document.getElementById('menuClose');
  if(open&&menu) open.addEventListener('click',function(){menu.classList.add('open');document.body.style.overflow='hidden';});
  function shut(){if(menu){menu.classList.remove('open');document.body.style.overflow='';}}
  if(close) close.addEventListener('click',shut);
  if(menu) menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',shut);});

  // scroll reveal
  var els = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    },{rootMargin:'0px 0px -8% 0px',threshold:.12});
    els.forEach(function(el){io.observe(el);});
  } else { els.forEach(function(el){el.classList.add('in');}); }

  // subtle magnetic buttons
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('.js-magnetic').forEach(function(btn){
      btn.addEventListener('pointermove',function(e){
        var r=btn.getBoundingClientRect();
        var x=(e.clientX-r.left-r.width/2)/r.width;
        var y=(e.clientY-r.top-r.height/2)/r.height;
        btn.style.transform='translate('+(x*6)+'px,'+(y*6)+'px)';
      });
      btn.addEventListener('pointerleave',function(){btn.style.transform='';});
    });
  }

  // waitlist forms
  document.querySelectorAll('[data-form]').forEach(function(form){
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      var input=form.querySelector('input[type=email]');
      var msg=form.querySelector('[data-msg]');
      var val=(input.value||'').trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)){
        msg.className='form-msg err';msg.textContent='Please enter a valid email so we can reach you.';input.focus();return;
      }
      msg.className='form-msg ok';msg.textContent='You are on the list. We will email you the moment it opens, inshaAllah.';
      input.value='';input.setAttribute('disabled','');
    });
  });
})();
