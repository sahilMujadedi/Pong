/* PONG */

/* Declaring and/or initializing variables */

// Canvas variables
let canvas;
let canvasContext;

// Score variables
let playerScore = 0;
let cpuScore = 0;

// Ball object
let ball = {
	x:390,
	y:290,
	xv:12,
	yv:6
};

// Player object
let player = {
	x:20,
	y:230
};

// computer object
let cpu = {
	x:760,
	y:250,
	yv:5.45
};

// Constants
const PADDLE_THICKNESS = 20;
const PADDLE_HEIGHT = 140;

// A function that finds the location of the mouse and returns it
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

// Start the game when the window loads up
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	document.getElementById('player1Score').innerText = playerScore;
	document.getElementById('player2Score').innerText = cpuScore;

	// fps says how many times run everything each second
	let fps = 60;
	setInterval(function() { mainLoop(); drawEverything(); }, 1000/fps);

	// Event listener listening for mouse movement
	canvas.addEventListener('mousemove', function(evt) {
		let mousePos = calculateMousePos(evt);
		player.y = mousePos.y - (PADDLE_HEIGHT / 2);
	});
}

// Function that draws everything to the screen
function drawEverything() {
	// Draw background
	colorRect(0, 0, canvas.width, canvas.height, "black");

	// Draw ball
	colorRect(ball.x, ball.y, 20, 20, "white");

	// Draw player paddle
	colorRect(player.x, player.y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

	// Draw CPU paddle
	colorRect(cpu.x, cpu.y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
}

// Main function that controls the whole game
function mainLoop() {
	// Ball should always be moving
	ball.x += ball.xv;
	ball.y += ball.yv;

	// CPU should be following ball
	let cpuCenter = cpu.y + (PADDLE_HEIGHT / 2);

	// plus and minus 35 so it doesn't chase the ball when it's close to center.
	if (cpuCenter < ball.y - 35) {
		cpu.y += cpu.yv;
	} else if (cpuCenter > ball.y + 35) {
		cpu.y -= cpu.yv;
	}

	// If ball hits side of canvas add point and reset the ball
	if (ball.x > cpu.x) {
		resetBall();
		playerPoint();
	}
	if (ball.x < player.x) {
		resetBall();
		cpuPoint();
	}

	// If ball hits top or bottom it bounces it back
	if (ball.y < 0) {
		ball.yv = -ball.yv;
	}
	if (ball.y > canvas.height) {
		ball.yv = -ball.yv;
	}

	/* Paddle collisions */

	// Player collision
	if (
		ball.x <= player.x + PADDLE_THICKNESS &&
		ball.y > player.y &&
		ball.y < player.y + PADDLE_HEIGHT
	) {
		ball.xv = -ball.xv;
	}

	// CPU collision
	if (
		ball.x > cpu.x - PADDLE_THICKNESS &&
		ball.y > cpu.y &&
		ball.y < cpu.y + PADDLE_HEIGHT
	) {
		ball.xv = -ball.xv
	}
}

// Makes drawing shapes easier to understand
function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}

// A function to reset the ball
function resetBall() {
	ball.x = 390;
	ball.y = 290;
	let prevBallXV = ball.xv;
	let prevBallYV = ball.yv;
	ball.xv = 0;
	ball.yv = 0;

	// Small break so players know a score happened
	setTimeout(function() {
		// Whoever won last round gets the ball first
		ball.xv = -prevBallXV;
		ball.yv = -prevBallYV;
	}, 1000);
}

function resetCpuPaddle() {
	cpu.y = 250;
}

function cpuPoint() {
	cpuScore += 1;
	document.getElementById('player2Score').innerText = cpuScore;
}
function playerPoint() {
	playerScore += 1;
	document.getElementById('player1Score').innerText = playerScore;
}

