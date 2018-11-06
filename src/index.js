const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload,
    create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.setBaseURL('./');

  this.load.image('sky', 'assets/skies/space3.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  this.load.image('red', 'assets/particles/red.png');
}

function create() {
  this.add.image(400, 300, 'sky');

  const particles = this.add.particles('red');

  const emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  });

  const logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
}

function onResize() {
  const { innerWidth, innerHeight } = window;

  const canvas = document.querySelector('canvas');
  const canvasWidth = parseInt(canvas.style.width);
  const canvasHeight = parseInt(canvas.style.height);
  console.log({ canvasWidth, canvasHeight})

  const widthRatio = innerWidth / canvasWidth;
  const heightRatio = innerHeight / canvasHeight;
  const minRatio = Math.min(widthRatio, heightRatio);
  canvas.style.width = canvasWidth * minRatio + 'px';
  canvas.style.height = canvasHeight * minRatio + 'px';
}

window.addEventListener('load', () => {
  onResize()
});

window.addEventListener('resize', onResize);
