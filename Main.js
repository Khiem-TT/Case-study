let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');
let scoreShow = document.getElementById('score');
let birdImg = new Image();
let backGround = new Image();
let upperTube = new Image();
let lowerTube = new Image();

birdImg.src = 'images/bird.png';
backGround.src = 'images/background.png';
upperTube.src = 'images/uppertube.png';
lowerTube.src = 'images/lowertube.png';

let score = 0;
let distanceOf2Tubes = 150;
let distanceToLowerTube;
let bird = {
    x: canvas.width / 5,
    y: canvas.height / 2
}
let tube = [];
tube[0] = {
    x: canvas.width,
    y: 0
}

let fly = new Audio();
let point = new Audio();
let hit = new Audio();

fly.src = 'sounds/fly.mp3';
point.src = 'sounds/point.mp3';
hit.src = 'sounds/hit.mp3';

function playGame() {
    ctx.drawImage(backGround, 0, 0);
    ctx.drawImage(birdImg, bird.x, bird.y);
    for (let i = 0; i < tube.length; i++) {
        distanceToLowerTube = upperTube.height + distanceOf2Tubes;
        ctx.drawImage(upperTube, tube[i].x, tube[i].y);
        ctx.drawImage(lowerTube, tube[i].x, tube[i].y + distanceToLowerTube);
        tube[i].x -= 5;
        if (tube[i].x === canvas.width / 2) {
            tube.push({
                x: canvas.width,
                y: Math.random() * upperTube.height - upperTube.height
            });
        }
        if (tube[i].x + upperTube.width === 0) {
            tube.splice(0, 1);
        }
        if (tube[i].x === bird.x) {
            score++;
            point.play();
        }
        if (bird.y + birdImg.height === backGround.height ||
            bird.x + birdImg.width >= tube[i].x &&
            bird.x <= tube[i].x + upperTube.width &&
            (bird.y <= tube[i].y + upperTube.height ||
                bird.y + birdImg.height >= tube[i].y + distanceToLowerTube)
        ) {
            hit.play();
            ctx.font = "100px Comic Sans MS";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText('Game over!', canvas.width / 2, canvas.height / 2);
            return;
        }
    }

    scoreShow.innerHTML = 'Scores: ' + score;
    bird.y += 3;
    requestAnimationFrame(playGame);
}

document.addEventListener('keydown', function () {
    bird.y -= 60;
    fly.play();
});

document.addEventListener('click', function () {
    bird.y -= 60;
    fly.play();
});

playGame();