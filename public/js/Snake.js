

export default class Snake {
    constructor(scene) {
        this.scene = scene;
        this.lastMoveTime = 0;
        this.moveInterval = 100;
        this.tileSize = 20;
        this.direction = Phaser.Math.Vector2.DOWN;
        this.body = [];
        this.body.push(
            this.scene.add.rectangle(
                this.tileSize * 16, this.tileSize * 16,
                this.tileSize, this.tileSize, 0xff0000).setOrigin(0)
        );
        this.apple = this.scene.add.rectangle(
            this.scene.game.config.width / 2,
            this.scene.game.config.height / 2,
            this.tileSize, this.tileSize, 0x00ff00).setOrigin(0)
        this.positionApple();
        scene.input.keyboard.on('keydown', e => {
            this.keydown(e);
        });
    }

    positionApple() {
        this.apple.x = Math.floor(Math.random()
            * this.scene.game.config.width / this.tileSize) * this.tileSize;
        this.apple.y = Math.floor(Math.random()
            * this.scene.game.config.height / this.tileSize) * this.tileSize;
    }

    keydown(event) {
        console.log(event);
        switch (event.keyCode) {
            case 37: //Left
                if (this.direction !== Phaser.Math.Vector2.RIGHT) {
                    this.direction = Phaser.Math.Vector2.LEFT;
                }
                break;
            case 38: //Up
                if (this.direction !== Phaser.Math.Vector2.DOWN) {
                this.direction = Phaser.Math.Vector2.UP;
                }
                break;
            case 39: //Right
                if (this.direction !== Phaser.Math.Vector2.LEFT) {
                    this.direction = Phaser.Math.Vector2.RIGHT;
                }
                break;
            case 40: //Down
                if (this.direction !== Phaser.Math.Vector2.UP) {
                    this.direction = Phaser.Math.Vector2.DOWN;
                }
                break;
        }
    }

    update(time) {
        if (time >= this.lastMoveTime + this.moveInterval) {
            this.lastMoveTime = time;
            this.move();
        }
    }

    move() {
        let x = this.body[0].x + this.direction.x * this.tileSize;
        let y = this.body[0].y + this.direction.y * this.tileSize;
        if (this.apple.x === x && this.apple.y === y) {
            //eaten the apple
            this.body.push(this.scene.add.rectangle(-100, -100, this.tileSize, this.tileSize, 0x0000ff).setOrigin(0))
            this.body.push(this.scene.add.rectangle(-100, -100, this.tileSize, this.tileSize, 0x0000ff).setOrigin(0))
            this.positionApple();
            this.moveInterval += 2.5;
        }
        for (let index = this.body.length - 1; index > 0; index--) {
            this.body[index].x = this.body[index - 1].x;
            this.body[index].y = this.body[index - 1].y;
        }

        this.body[0].x = x;
        this.body[0].y = y;

        //death by going off screen
        if (this.body[0].x < 0 ||
            this.body[0].x >= this.scene.game.config.width ||
            this.body[0].y < 0 ||
            this.body[0].y >= this.scene.game.config.height) {
            this.scene.scene.restart();
        }
        //death by eating own tail
        let tail = this.body.slice(1);
        if (tail.filter(s => s.x === this.body[0].x && s.y === this.body[0].y).length > 0) {
            this.scene.scene.restart();
        }
    }
}