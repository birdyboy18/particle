$(document).ready(function(){

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

	function random(max) {
		return Math.floor(Math.random()*max);
	}

	var Game = function() {
		Circles = [];
		colours = ['#802441','#BD1349','#FF3675','#FF6E6E','#FF996E'];
		maxCircles = 1000;
		
		this.init = function() {
			resizeCanvas();
			for (var i=0; i < maxCircles; i++) {
				Circles[i] = new Circle(random(canvasWidth),random(canvasHeight),random(10),colours[random(colours.length)],random(20),random(20));
			}
		}
		
		this.draw = function() {
			ctx.clearRect(0,0,canvasWidth,canvasHeight);
			for (i=0; i < Circles.length; i++) {
				//Circles[i].move(origPos[i]);
				Circles[i].update();
				Circles[i].draw();
			}
		}

		this.changeColours = function() {
			colours = ['#E1FC11','#FC4617','#4DAD94','#ACFCF8','#9572AB'];

			for (var i=0; i < maxCircles; i++) {
				Circles[i] = new Circle(random(canvasWidth),random(canvasHeight),random(10),colours[random(colours.length)],random(20),random(20));
			}			
		}

		this.drawGrid = function() {
			var width = 80;
			var height = 80;
			Circles = [];
			origPos = [];
			for(x=0; x < canvasWidth/width; x++) {
				for (y=0; y < (canvasHeight/height); y++) {
					Circles.push(new Circle(x*width,y*height,2.5,colours[random(colours.length)],0,0));
				}
			}
			origPos = Circles;
		}
	}

	//fillRect(x,y,w,h)
	//arc(x,y,r,startAngle,endAngle);

	//ctx.fillStyle = 'rgb(255,45,89)';

	//cirlce Object

	var Circle = function(x,y,rad,colour,vx,vy) {
		this.x = x;
		this.y = y;
		this.rad = rad;
		//this.r = r;
		//this.g = g;
		//this.b = b;
		this.vx = vx;
		this.vy = vy;

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

		this.move = function(origPos) {
			var choice = random(3);
			var minX = origPos.x - 30;
			var minY = origPos.y - 30;
			var maxX = origPos.x + 30;
			var maxY = origPos.y + 30;

			if (choice == 0 && x <= maxX) {
				x += 0.2;
			} else {
				x -= 0.2;
			}

			if (choice == 1 && x >= minX) {
				x -= 0.2;
			} else {
				x += 0.2;
			}

			if (choice == 2 && y <= maxY) {
				y += 0.2;
			} else {
				y -= 0.2;
			}

			if (choice == 3 && y >= minY) {
				y -= 0.2;
			} else {
				y += 0.2;
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

	var game = new Game();

	game.init();
	game.draw();
	//game.drawGrid();
	function startGame() {
		window.requestAnimationFrame(startGame);
		game.draw();
	}

	startGame();

	//canvas.click(game.changeColours);



});