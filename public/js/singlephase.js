import MainScene from './MainScene.js'
const config = {
    width:560,
    height:560,
    type: Phaser.AUTO,
    parent: 'phaser-game',
    scene: [MainScene]
};

new Phaser.Game(config);