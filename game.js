/* Pure JS Pong game. */

// Initializing and/or declaring variables.
let canvas;
let canvasContext;

// Ball Variables
let ballX = 390;
let ballXV = 9;
let ballY = 290;
let ballYV = 3;

// Previous ball velocity variables
let ballXVPre;
let ballYVPre;

// Paddle variables
let paddle1Y = 230;
let paddle1X = 20;

let paddle2Y = 250;
let paddle2X = 760;

const PADDLE_THICKNESS = 20;
const PADDLE_HEIGHT = 140;

// function that finds the mouse position
function calculateMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;
	let mouseX = evt.clientX - rect.left - root.scrollLeft;
	let mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x:mouseX,
		y:mouseY
	};
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	// Run mainloop and draw everything 60 times each second.
	let fps = 60;
	setInterval(function() { mainloop(); drawEverything(); }, 1000/fps);
	resetBall();
	
	canvas.addEventListener('mousemove', function(evt) {
		let mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y - PADDLE_HEIGHT/2;
	});
}

function drawEverything() {
	
	// Background
	colorRect(0, 0, canvas.width, canvas.height, "black");
	
	// Ball
	colorCircle(ballX, ballY, 10, "white");
	
	// Player Paddle
	colorRect(paddle1X, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
	
	// AI Paddle
	colorRect(paddle2X, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
	
}

function mainloop() {
	
	ballX += ballXV;
	ballY += ballYV
	
	// If ball hits side of canvas this code resets the ball.
	if(ballX > canvas.width) {
		
		resetBall();
		
	}
	if(ballX < 0) {
		 
		resetBall();
	
	}
	
	// If the ball hits the top or bottom bounce it back.
	if(ballY < 0) {
		ballYV = -ballYV
	}
	if(ballY > canvas.height) {
		ballYV = -ballYV
	}
	
	// Paddle collisions
	
	// Player
	if(ballX <= paddle1X+PADDLE_THICKNESS && ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
		ballXV = -ballXV;
	}
	// AI
	if(ballX > paddle2X && ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
		ballXV = -ballXV;
	}

}

// Makes drawing shapes a little faster.
function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}
function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

// Reset ball function
function resetBall() {
	
	// Set all variables back to default and set previous velocity variables so we can reverse the balls direction to the winner when a score happens.
	ballX = 390;
	ballY = 290;
	ballXVPre = ballXV;
	ballYVPre = ballYV;
	ballXV = 0;
	ballYV = 0;
	
	// Small timeout so players know a score happened.
	setTimeout(function() {
		// Whoever wins gets the ball first.
		ballXV = -ballXVPre;
		ballYV = -ballYVPre;
	}, 1000);
}
