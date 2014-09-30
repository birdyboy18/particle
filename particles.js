(function(){

	//Set everything up
	
	var canvas = $('#canvas');
	var ctx = canvas[0].getContext('2d');

	canvasWidth = canvas.width();
	canvasHeight = canvas.height();

	$(window).resize(resizeCanvas);

	function resizeCanvas() {
		canvas.attr("width", $(window)[0].innerWidth);
		canvas.attr("height", $(window)[0].innerHeight);
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();
	}

	function random(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}


	//Make a particle object

	var Particle = function(x,y,rad,colour,vx,vy) {
		this.x = x;
		this.y = y;
		this.rad = rad;
		this.colour = colour;
		this.vx = vx;
		this. vy = vy;

		this.update = function() {
			x += vx;
			y += vy;

			//Reverse Direction if they hit the sides
			if ( x - rad <= 0  || x + rad >= canvasWidth) {
				vx = vx*-1;
			}

			if ( y - rad <= 0 || y + rad  >= canvasHeight) {
				vy = vy*-1;
			}
		}

		this.draw = function() {
			ctx.beginPath()
			ctx.arc(x,y,rad,0,Math.PI*2,false);
			ctx.fillStyle = colour;
			ctx.closePath();
			ctx.fill();
		}
	}

	function init() {

	Particles = [];
	resizeCanvas();

		for ( var i = 0; i < 100; i++) {
			Particles[i] = new Particle(random(0,canvasWidth),random(0,canvasHeight),random(1,2),'rgba(255,255,255,'+ (random(30,70))/100 +')',random(-1,1), random(-1,1));
		}

	}

	function draw() {
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		for ( var x = 0; x < Particles.length; x++) {
			Particles[x].update();
			Particles[x].draw();
		}
		window.requestAnimationFrame(draw);
	}

	init();
	draw();


})();