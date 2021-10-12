scoreLeftWrist = 0;
scoreRightWrist = 0;
songFile = "";
song = "";
song2 = "";

leftWrist_x = 0;
rightWrist_x = 0;

leftWrist_y = 0;
rightWrist_y = 0;

function preload() {
    song = loadSound("AvengersThemeRemix.mp3");
    song2 = loadSound("harry.mp3");
}

function setup() {
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.position(700,400)
    canvas = createCanvas(300, 300);
    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    img(video, 0, 0, 300, 300);
    fill("#164975");

    songStatus = song.isPlaying();
    song2Status = song2.isPlaying();

    if(scoreRightWrist > 0.2) {
        song.stop();
        fill("#164975");
        circle(RightWrist_x, RightWrist_y, 20);
    if (songStatus == true) {
        song2.play();
    }
    }

    if(scoreLeftWrist > 0.2) {
        song2.stop();
        fill("#164975");
        circle(leftWrist_x, leftWrist_y, 20);
    if (song2Status == true) {;
        song.play();
    }
    }
}

function PLAY() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function ModelLoaded() {
    console.log("Model is loaded..")
}

function gotPoses(results) {
    if(results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(results);
        rightWrist_x = results[0].pose.rightWrist.x;
        leftWrist_x = results[0].pose.leftWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        leftWrist_y = results[0].pose.leftWrist.y;
    }
}