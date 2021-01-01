// number of fireworks exploding at once
const N = 8;

// number of parts in one firework
const M = 40;	

// size of tail
const tail_size = 18;	

// our fireworks consist of rackets
var rackets = [];	 	

var canvas = document.getElementById('fireworks');	
var context = canvas.getContext('2d');

// Initialize fireworks
for (let i = 0; i < N; i++) {	 

  var racket = {
  				parts: []	
      };
  
  for (var n = 0; n < M; n++) {	

    var part = {	
      vx: Math.random() * 4, 
      vy: Math.random() * 4,
      weight: Math.random() * .3,
      red: Math.floor(Math.random() * 2),	    
      green: Math.floor(Math.random() * 2),	   
      blue: Math.floor(Math.random() * 2)	  
    };
    
    // make it fly to all quadrants
    if (Math.random() > .5) part.vx = - part.vx;	   
    if (Math.random() > .5) part.vy = - part.vy;	  
    
    racket.parts.push(part);	
  }	 
  
  reset(racket);
  rackets.push(racket);	
}

function reset(racket) {	
  racket.x = Math.floor(Math.random() * canvas.width);	
  racket.y = canvas.height;	 
  racket.age = 0;	 
  racket.explode = false; 
}	 

function explode() {

  context.clearRect(0, 0, canvas.width, canvas.height);	
  
  rackets.forEach((racket,index) => {	 
  
    if (racket.explode) {	  
    
      racket.parts.forEach((part) => {	       
        for (var i = 0; i < 10; i++) {	 
          var trailPos = racket.age + i;	     
          var fade = i * 24 - racket.age * 2;	  
					editPart(racket.x + part.vx * trailPos,
          				 racket.y + part.vy * trailPos + part.weight * trailPos, 
          				 Math.floor(part.red * fade),  
                   Math.floor(part.green * fade), 
                   Math.floor(part.blue * fade));     
        }	   
      });	     
      
      racket.age++;	    
      
      if (racket.age > 100 && Math.random() < .07) {	  
        reset(racket);	    
      }
      
    } else {  // when it does not explode it moves up
    
      racket.y -= 10;	
      
      // change tail
      for (var part = 0; part < tail_size; part++) {	  
        editPart(racket.x + Math.random() * part - part / 2, racket.y + part * 4,
                 index * 50, part * 17, 0);    
      }
      
      //  explode at a sufficient height
      if (racket.y < 170) {
      	racket.explode = true;	  
      }
      
    }
  });	 

  window.requestAnimationFrame(explode);

}

function editPart(x, y, r, g, b){
  context.beginPath();	 
  context.fillStyle = 'rgba(' + r + ',' + g + ',' +  b + ', 1)';
	context.rect(x, y, 3, 3);	
	context.fill();	   
}

explode();

