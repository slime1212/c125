difference = 0
lwx = 0
rwx = 0

noseX = 0;
noseY = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() { console.log("PoseNet is initialized.") }

function gotPoses(r) {
    if (r.length > 0) {
        console.log(r);
        noseX = r[0].pose.nose.x;
        noseY = r[0].pose.nose.y;
        console.log("noseX: " + noseX + ", noseY: " + noseY);

        lwx = r[0].pose.leftWrist.x;
        rwx = r[0].pose.rightWrist.x;

        difference = floor(lwx - rwx)
        console.log("Left Wrist (x): " + lwx + ", Right Wrist (x): " + rwx + ", Difference: " + difference);
    }
}

function draw() {
    background('#002D52');
    document.getElementById("square-side").innerHTML = "Width: " + difference + ", Height: " + difference;
    fill('#008CFF');
    stroke('#008CFF');
    square(noseX, noseY, difference)
}