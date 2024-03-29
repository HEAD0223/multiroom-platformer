const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

let parsedCollisions;
let collisionBlocks;
let background;
let doors;
const player = new Player({
	imageSrc: './img/king/idle.png',
	frameRate: 11,
	animations: {
		idleRight: { imageSrc: './img/king/idle.png', frameRate: 11, frameBuffer: 8, loop: true },
		idleLeft: { imageSrc: './img/king/idleLeft.png', frameRate: 11, frameBuffer: 8, loop: true },
		runRight: { imageSrc: './img/king/runRight.png', frameRate: 8, frameBuffer: 12, loop: true },
		runLeft: { imageSrc: './img/king/runLeft.png', frameRate: 8, frameBuffer: 12, loop: true },
		enterDoor: {
			imageSrc: './img/king/enterDoor.png',
			frameRate: 8,
			frameBuffer: 12,
			loop: false,
			onComplete: () => {
				gsap.to(overlay, {
					opacity: 1,
					onComplete: () => {
						level++;
						if (level === 4) level = 1;
						levels[level].init();
						player.switchSprite('idleRight');
						player.preventInput = false;
						gsap.to(overlay, {
							opacity: 0,
						});
					},
				});
			},
		},
	},
});

let level = 1;
let levels = {
	1: {
		init: () => {
			parsedCollisions = collisionsLevel1.parse2D();
			collisionBlocks = parsedCollisions.createObjectsFrom2D();
			player.collisionBlocks = collisionBlocks;

			if (player.currentAnimation) player.currentAnimation.isActive = false;

			background = new Sprite({
				position: { x: 0, y: 0 },
				imageSrc: './img/backgroundLevel1.png',
			});

			doors = [
				new Sprite({
					position: { x: 767, y: 270 },
					imageSrc: './img/doorOpen.png',
					frameRate: 5,
					frameBuffer: 12,
					loop: false,
					autoplay: false,
				}),
			];
		},
	},
	2: {
		init: () => {
			parsedCollisions = collisionsLevel2.parse2D();
			collisionBlocks = parsedCollisions.createObjectsFrom2D();
			player.collisionBlocks = collisionBlocks;
			player.position.x = 96;
			player.position.y = 140;

			if (player.currentAnimation) player.currentAnimation.isActive = false;

			background = new Sprite({
				position: { x: 0, y: 0 },
				imageSrc: './img/backgroundLevel2.png',
			});

			doors = [
				new Sprite({
					position: { x: 772, y: 336 },
					imageSrc: './img/doorOpen.png',
					frameRate: 5,
					frameBuffer: 12,
					loop: false,
					autoplay: false,
				}),
			];
		},
	},
	3: {
		init: () => {
			parsedCollisions = collisionsLevel3.parse2D();
			collisionBlocks = parsedCollisions.createObjectsFrom2D();
			player.collisionBlocks = collisionBlocks;
			player.position.x = 750;
			player.position.y = 230;

			if (player.currentAnimation) player.currentAnimation.isActive = false;

			background = new Sprite({
				position: { x: 0, y: 0 },
				imageSrc: './img/backgroundLevel3.png',
			});

			doors = [
				new Sprite({
					position: { x: 176, y: 335 },
					imageSrc: './img/doorOpen.png',
					frameRate: 5,
					frameBuffer: 12,
					loop: false,
					autoplay: false,
				}),
			];
		},
	},
};

const keys = {
	ArrowUp: {
		pressed: false,
	},
	ArrowLeft: {
		pressed: false,
	},
	ArrowRight: {
		pressed: false,
	},
};

const overlay = {
	opacity: 0,
};

function animate() {
	window.requestAnimationFrame(animate);

	background.draw();
	// collisionBlocks.forEach((block) => block.draw());

	doors.forEach((door) => door.draw());

	player.handleInput(keys);
	player.draw();
	player.update();

	ctx.save();
	ctx.globalAlpha = overlay.opacity;
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
}

levels[level].init();
animate();
