/*
library used: https://github.com/TrevorSundberg/h264-mp4-encoder 

a simple example exporting mp4 with p5js.
record video while animation is being played.
*/
let cwidth = 960
let cheight = 540
let buttonn 

let encoder

const frate = 30 // frame rate- Max:9000Frames
const numFrames = 9000 // num of frames to record
let recording = false
let recordedFrames = 0

let count = 0
let x =0;

document.getElementById("record").onclick = function() {clickRecording()};
document.getElementById("stop").onclick = function() {stopRecording()};
// let stop = document.getElementById("stop").value();

// make sure encoder is ready before use
function preload() {
    HME.createH264MP4Encoder().then(enc => {
        encoder = enc
        encoder.outputFilename = 'test'
        encoder.width = cwidth
        encoder.height = cheight
        encoder.frameRate = frate
        encoder.kbps = 50000 // video quality
        encoder.groupOfPictures = 10 // lower if you have fast actions.
        encoder.initialize()
    })
}

function setup() {
    
    createCanvas(cwidth, cheight)
    background('rgba(0,255,0, 0.25)');
    frameRate(frate)
    //button = button = createButton('record')
    //button.mousePressed(() => recording = true);
    loop();
}

function clickRecording(){
    recording = true;
}
function stopRecording(){
    recording = false;
}

function draw() {
    
    ellipse(150, 100, 100, 100);
    rectMode(CENTER);
    translate(width / 2, height / 2);
    translate(p5.Vector.fromAngle(millis() / 1000, 40));
    rect(0, 0, 20, 20)
    
    /*
    x = x + 0.1;
    if (x >width) {
        x = 0;
    };
    line(x, 0, x, height);
    */
    // keep adding new frame
    
    if (recording) {
        console.log('recording')
        encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);
        recordedFrames++
    }
    
    // finalize encoding and export as mp4
    if (recordedFrames === numFrames || (recordedFrames > 0 && recording == false))  {
        recording = false
        recordedFrames = 0
        console.log('recording stopped')

        encoder.finalize()
        const uint8Array = encoder.FS.readFile(encoder.outputFilename);
        const anchor = document.createElement('a')
        anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }))
        anchor.download = encoder.outputFilename
        anchor.click()
        encoder.delete()

        preload() // reinitialize encoder
    }
    
}