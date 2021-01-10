song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightwristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
status=0;
function preload(){
    song1= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}
function setup(){
    canvas= createCanvas(600, 500);
    canvas.position(450, 210);

    video=createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("poseNet is Initialised");
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#BD1742");
    stroke("#BD1742");

    if (scoreRightWrist > 0.2){

    circle(rightWristY, rightwristX, 20);
    
    if (song1.isPlaying()){
    song1.stop()
    }
    InNumberRightWristY= Number(rightwristY);
    remove_decimals= floor(InNumberRightWristY);
    rightwristY_divide_1000= remove_decimals/1000;
    volume= rightwristY_divide_1000*2;
    song2.play();
}
    if (scoreLeftWrist > 0.2){
        if (song2.isPlaying()){
            song2.stop();
        }
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY= Number(leftWristY);
        remove_decimals= floor(InNumberLeftWristY);
        leftWristY_divide_1000= remove_decimals/1000;
        volume= leftWristY_divide_1000*2;
        song1.play();
    }
}
function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
function gotPoses(results){
    if (results.length>0){
        console.log(results);
        scoreRightWrist= results[0].pose.keypoints[10].score;
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist="+ scoreLeftWrist + "scoreRightWrist" + scoreRightWrist);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY);
    }
}