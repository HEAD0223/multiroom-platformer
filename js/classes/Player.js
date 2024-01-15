class Player extends Sprite {
	constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
		super({ imageSrc, frameRate, animations, loop });
		this.position = {
			x: 200,
			y: 200,
		};
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.sides = {
			bottom: this.position.y + this.height,
		};
		this.gravity = 0.2;
		this.collisionBlocks = collisionBlocks;
	}

	update() {
		// Blue Box for Player
		// ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
		// ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
		this.position.x += this.velocity.x;

		this.updateHitBox();
		this.chechForHorizontalCollisions();
		this.applyGravity();
		this.updateHitBox();
		this.checkForVerticalCollisions();
	}

	handleInput(keys) {
		if (this.preventInput) return;
		this.velocity.x = 0;
		if (keys.ArrowRight.pressed) {
			this.switchSprite('runRight');
			this.velocity.x = 5;
			this.lastDirection = 'right';
		} else if (keys.ArrowLeft.pressed) {
			this.switchSprite('runLeft');
			this.velocity.x = -5;
			this.lastDirection = 'left';
		} else {
			if (this.lastDirection === 'left') this.switchSprite('idleLeft');
			else this.switchSprite('idleRight');
		}
	}

	switchSprite(name) {
		if (this.image === this.animations[name].image) return;

		this.currentFrame = 0;
		this.image = this.animations[name].image;
		this.frameRate = this.animations[name].frameRate;
		this.frameBuffer = this.animations[name].frameBuffer;
		this.loop = this.animations[name].loop;
		this.currentAnimation = this.animations[name];
	}

	updateHitBox() {
		this.hitBox = {
			position: {
				x: this.position.x + 58,
				y: this.position.y + 34,
			},
			width: 50,
			height: 54,
		};
	}

	chechForHorizontalCollisions() {
		for (let i = 0; i < this.collisionBlocks.length; i++) {
			const block = this.collisionBlocks[i];
			// If Collision exists (Check all sides)
			if (
				this.hitBox.position.x <= block.position.x + block.width &&
				this.hitBox.position.x + this.hitBox.width >= block.position.x &&
				this.hitBox.position.y + this.hitBox.height >= block.position.y &&
				this.hitBox.position.y <= block.position.y + block.height
			) {
				// If Collision on x-axis going right
				if (this.velocity.x < 0) {
					const offset = this.hitBox.position.x - this.position.x;
					this.position.x = block.position.x + block.width - offset + 0.01;
					break;
				}
				// If Collision on x-axis going left
				if (this.velocity.x > 0) {
					const offset = this.hitBox.position.x - this.position.x + this.hitBox.width;
					this.position.x = block.position.x - offset - 0.01;
					break;
				}
			}
		}
	}

	applyGravity() {
		this.velocity.y += this.gravity;
		this.position.y += this.velocity.y;
	}

	checkForVerticalCollisions() {
		for (let i = 0; i < this.collisionBlocks.length; i++) {
			const block = this.collisionBlocks[i];
			// If Collision exists (Check all sides)
			if (
				this.hitBox.position.x <= block.position.x + block.width &&
				this.hitBox.position.x + this.hitBox.width >= block.position.x &&
				this.hitBox.position.y + this.hitBox.height >= block.position.y &&
				this.hitBox.position.y <= block.position.y + block.height
			) {
				// If Collision on y-axis going up
				if (this.velocity.y < 0) {
					this.velocity.y = 0;
					const offset = this.hitBox.position.y - this.position.y;
					this.position.y = block.position.y + block.height - offset + 0.01;
					break;
				}
				// If Collision on y-axis going down
				if (this.velocity.y > 0) {
					this.velocity.y = 0;
					const offset = this.hitBox.position.y - this.position.y + this.hitBox.height;
					this.position.y = block.position.y - offset - 0.01;
					break;
				}
			}
		}
	}
}
