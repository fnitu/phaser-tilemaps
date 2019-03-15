// Create our only scene called mainScene, in the game.js file
class mainScene {
    preload() {
        this.load.image("tiles", "Tiles_32x32.png");
        this.load.tilemapTiledJSON("map", "platform3.json");
    }

    create() {
        const map = this.make.tilemap({key:"map"})
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("Tiles_32x32", "tiles");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const groundLayer = map.createStaticLayer("GroundLayer", tileset, 0, 0);

        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main;

        // Set up the arrows to control the camera
        const cursors = this.input.keyboard.createCursorKeys();
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: camera,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        });

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    }
    update(time, delta) {
        // Apply the controls to the camera each update tick of the game
        this.controls.update(delta);
    }

}

new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    scene: mainScene, // The name of the scene we created
    backgroundColor: '#3498db', // The background color (blue)
    input: {
        gamepad: true  // add to enable gamepad input
    },
    // The physics engine to use
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    parent: 'game', // Create the game inside the <div id="game">
});