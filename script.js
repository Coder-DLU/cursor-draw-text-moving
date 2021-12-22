(function(){
  
  
  Math.lerp = function (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};
  
  
  const ease = .1;
  const current = {x: 0, y: 0};
  const last = {x: 0, y: 0};
  const characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  
 function renderChar() {
    const char = characters.charAt(Math.floor(Math.random() * characters.length));
    const span = document.createElement('span');
    span.textContent = char;
    span.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    document.body.append(span);
   

   gsap.fromTo(span, {x: current.x, y: current.y}, {opacity: 0, scale: 0, ease: 'power3.inOut', onComplete: ()=>{
     span.remove();
   }});
}
  
 function onMoving(event) {
    
    const {clientX, clientY} = event;
    
    last.x = clientX;
    last.y = clientY;
  };
  
  function loop(){
    
    current.x = Math.lerp(current.x, last.x, ease);
    current.y = Math.lerp(current.y, last.y, ease);
    
    if(
      Math.abs(last.x - current.x) > 1 
      ||
        Math.abs(last.y - current.y) > 1 
      ){
      renderChar();
    }
  }
  
  function loaded(){
     gsap.ticker.add(loop);
  }
  
  window.addEventListener('mousemove', onMoving);
  window.addEventListener('load', loaded);
  
})();