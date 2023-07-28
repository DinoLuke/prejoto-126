Song = "";
Song2 = "";
Song_status = "";
Song_status2 = "";

rightX= 0;
leftX= 0;
rightY= 0;
leftY= 0;
pontuacaoPulsoEsquerdo = 0;
pontuacaoPulsoDireito = 0;
function preload() {
Song = loadSound("music.mp3");
Song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

posenet = ml5.poseNet(video,modeloCarregado);
posenet.on("pose",pegarPose);
}
function draw() {
image(video, 0, 0, 600, 500);
fill("green");
stroke("blue");
Song_status = Song.isPlaying();
Song2_status = Song2.isPlaying();
if(pontuacaoPulsoDireito > 0.2) {
    circle(rightX, rightY, 20);
    Song2.stop();
    if(Song_status == false) {
        document.getElementById("Song").innerHTML = "Tocando: Tema de Harry Potter";
Song.play();
    }

}



if (pontuacaoPulsoEsquerdo>0.2){
    circle(leftX,leftY, 20);

    Song.stop();
    if(Song_status == false) {
        document.getElementById("Song").innerHTML = "Tocando: Música de Peter Pan";
Song2.play();
    }
}
}
function Play() {
Song.play();
Song.setVolume(0.3);
Song.rate(100);
}
function modeloCarregado()
{
console.log("modelo foi carregado");
}
function pegarPose(results)
{
if (results.length>0){
console.log(results);
leftX= results[0].pose.leftWrist.x;
leftY= results[0].pose.leftWrist.y;
console.log("leftX = " + leftX +" leftY = "+ leftY);
pontuacaoPulsoDireito = results[0].pose.keypoints[10].score;
pontuacaoPulsoEsquerdo = results[0].pose.keypoints[9].score;
rightX= results[0].pose.rightWrist.x;
rightY= results[0].pose.rightWrist.y;
console.log("rightX = " + rightX +" rightY = "+ rightY);
}
}