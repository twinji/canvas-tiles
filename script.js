// window dimensions
const WIDTH = window.innerWidth, 
      HEIGHT = window.innerHeight;

var tiles, tileRate;

var tileSize = 12;

window.onload = function(e) {

    // canvas setup
    var canvas = document.getElementById("canvas");
    var c = canvas.getContext("2d");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // initial setup
    init(c);
    
    // main logic loop
    var loop = function() {
        update();
        render(c);
        window.requestAnimationFrame(loop, canvas);
    }
    window.requestAnimationFrame(loop, canvas);
}

function init(c) {

    var tilesX = Math.round(WIDTH / tileSize) + 1;
    var tilesY = Math.round(HEIGHT / tileSize) + 1;

    tiles = new Array(tilesX);
    tileRate = new Array(tilesX);

    for (var x = 0; x < tiles.length; x++) {
        tiles[x] = new Array(tilesY);
        tileRate[x] = new Array(tilesY);
    }

    for (var x = 0; x < tiles.length; x++) {
        for (var y = 0; y < tiles[x].length; y++) {
            tiles[x][y] = Math.random();
            tileRate[x][y] = Math.random() * .01;
        }
    }

}

function update() {

    for (var x = 0; x < tiles.length; x++) {
        for (var y = 0; y < tiles[x].length; y++) {
            tiles[x][y] = (tiles[x][y] + tileRate[x][y]) % 1;
        }
    }

}

function render(c) {

    c.fillStyle = "black";

    for (var x = 0; x < tiles.length; x++) {
        for (var y = 0; y < tiles[x].length; y++) {
            c.globalAlpha = tiles[x][y];
            c.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    // screen fade out effect
    c.fillStyle = "crimson";
    c.globalAlpha = .06;
    c.fillRect(0, 0, WIDTH, HEIGHT)
    c.globalAlpha = 1;

}
