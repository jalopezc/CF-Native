// SIZE OF CANVAS
let cwidth = 960;
let cheight = 540;

// RECORD VIDEO
let encoder;
const frate = 30; // frame rate- Max:9000Frames
const numFrames = 9000; // num of frames to record
let recording = false;
let recordedFrames = 0;
//-----------------------------------------------
let fTriangle = 0;

// Variables para los personajes y los escenarios
let imgCharacterP1, imgCharacterP2, imgCharacter1, imgCharacter2, imgCharacter3, imgCharacter1Move, imgCharacter2Move, imgCharacter3Move, imgScene, imgScene1, imgScene2, imgScene3;

// Cargar personajes
var vid;

//Variables para animación
let xMoveP1;
let yMoveP1;
let xMoveP2;
let yMoveP2;
let vjumpP1 = false;
let vjumpP2 = false;
const limit = 170;
const suelo = 200;
let saltarP1 = suelo;
let saltarP2 = suelo;
let upP1 = true;
let upP2 = true;
const scale = 4;
let movP1 = false;
let movP2 = false;

//Complemento de los botones para la funcion de grabar.
document.getElementById("record").onclick = function () { clickRecording() };
document.getElementById("stop").onclick = function () { stopRecording() };

// Toma los datos de los botones character P1
document.getElementById("character1P1").onclick = function () { selectedCharacterP1(document.getElementById("character1P1").value) };
document.getElementById("character2P1").onclick = function () { selectedCharacterP1(document.getElementById("character2P1").value) };
document.getElementById("character3P1").onclick = function () { selectedCharacterP1(document.getElementById("character3P1").value) };

// Toma los datos de los botones character P2
document.getElementById("character1P2").onclick = function () { selectedCharacterP2(document.getElementById("character1P2").value) };
document.getElementById("character2P2").onclick = function () { selectedCharacterP2(document.getElementById("character2P2").value) };
document.getElementById("character3P2").onclick = function () { selectedCharacterP2(document.getElementById("character3P2").value) };

// Toma los datos de los botones scene
document.getElementById("scene1").onclick = function () { selectedScene(document.getElementById("scene1").value) };
document.getElementById("scene2").onclick = function () { selectedScene(document.getElementById("scene2").value) };
document.getElementById("scene3").onclick = function () { selectedScene(document.getElementById("scene3").value) };

// Saltar
document.getElementById("jumpP1").onclick = function () { jumpP1() };
document.getElementById("jumpP2").onclick = function () { jumpP2() }; 

// Caminar
document.getElementById("walkP1").onclick = function () { walkP1() };
document.getElementById("walkP2").onclick = function () { walkP2() };

//-----------------------------------------------------

// Carga todos los elementos de la grabación de video.
function preload() {
    HME.createH264MP4Encoder().then(enc => {
        encoder = enc;
        encoder.outputFilename = 'test';
        encoder.width = cwidth;
        encoder.height = cheight;
        encoder.frameRate = frate;
        encoder.kbps = 50000; // video quality
        encoder.groupOfPictures = 10; // lower if you have fast actions.
        encoder.initialize();
    })

    imgCharacter1 = loadImage("./img/personaje1.gif");
    imgCharacter2 = loadImage("./img/personaje3.gif");
    imgCharacter3 = loadImage("./img/personaje4.gif");
    imgCharacter1Move = loadImage("./img/personaje1-caminando.gif");
    imgCharacter2Move = loadImage("./img/personaje3-caminando.gif");
    imgCharacter3Move = loadImage("./img/personaje4-caminando.gif");
    imgScene1 = loadImage("./img/Escenario1.jpg");
    imgScene2 = loadImage("./img/Escenario2.jpg");
    imgScene3 = loadImage("./img/Escenario3.jpg");

    
}

function clickRecording() {
    recording = true;
}
function stopRecording() {
    recording = false;
}

function selectedCharacterP1(value) {
    imgCharacterP1 = value;
}

function selectedCharacterP2(value) {
    imgCharacterP2 = value;
}

function selectedScene(value) {
    imgScene = value;
}

function jumpP1() {
    vjumpP1 = true;
}

function jumpP2() {
    vjumpP2 = true;
}

function walkP1() {
    if(movP1 == true){
        movP1 = false;
    }else if (movP1 == false){
        movP1 = true;
    }
}

function walkP2() {
    if(movP2 == true){
        movP2 = false;
    }else if (movP2 == false){
        movP2 = true;
    }
}

function caminar(){

    if(movP1 == true){
        if (imgCharacterP1 == 11) {
            image(imgCharacter1Move, xMoveP1, yMoveP1, (imgCharacter1Move.width / scale), (imgCharacter1Move.height / scale));
        } else if (imgCharacterP1 == 12) {
            image(imgCharacter2Move, xMoveP1, yMoveP1, (imgCharacter2Move.width / scale), (imgCharacter2Move.height / scale));
        } else if (imgCharacterP1 == 13) {
            image(imgCharacter3Move, xMoveP1, yMoveP1, (imgCharacter3Move.width / scale), (imgCharacter3Move.height / scale));
        }

        if (xMoveP1 < cwidth){
            xMoveP1++
        }else if (xMoveP1 == cwidth) {
            xMoveP1 = 0;
        }
    }

    if(movP2 == true){

        if (imgCharacterP2 == 21) {
            image(imgCharacter1Move, xMoveP2, yMoveP2, (imgCharacter1Move.width / scale), (imgCharacter1Move.height / scale));
        } else if (imgCharacterP2 == 22) {
            image(imgCharacter2Move, xMoveP2, yMoveP2, (imgCharacter2Move.width / scale), (imgCharacter2Move.height / scale));
        } else if (imgCharacterP2 == 23) {
            image(imgCharacter3Move, xMoveP2, yMoveP2, (imgCharacter3Move.width / scale), (imgCharacter3Move.height / scale));
        }

        if (xMoveP2 < cwidth){
            xMoveP2++
        }else if (xMoveP2 == cwidth) {
            xMoveP2 = 0;
        }
    }
}

function character(){
    if (movP1 == false){
        if (imgCharacterP1 == 11) {
            image(imgCharacter1, xMoveP1, yMoveP1, (imgCharacter1.width / scale), (imgCharacter1.height / scale));
        } else if (imgCharacterP1 == 12) {
            image(imgCharacter2, xMoveP1,  yMoveP1, (imgCharacter2.width / scale), (imgCharacter2.height / scale));
        } else if (imgCharacterP1 == 13) {
            image(imgCharacter3, xMoveP1,  yMoveP1, (imgCharacter3.width / scale), (imgCharacter3.height / scale));
        }
    }

    if (movP2 == false){
        
        if (imgCharacterP2 == 21) {
            console.log("ENTRO");
            image(imgCharacter1, xMoveP2, yMoveP2, (imgCharacter1.width / scale), (imgCharacter1.height / scale));
        } else if (imgCharacterP2 == 22) {
            image(imgCharacter2, xMoveP2,  yMoveP2, (imgCharacter2.width / scale), (imgCharacter2.height / scale));
        } else if (imgCharacterP2 == 23) {
            image(imgCharacter3, xMoveP2,  yMoveP2, (imgCharacter3.width / scale), (imgCharacter3.height / scale));
        }
    }
}

function saltar(){
    if (vjumpP1 == true) {
        if (saltarP1 > limit && upP1 == true) {
            yMoveP1--;
            saltarP1--;
        } else if (saltarP1 == limit) {
            upP1 = false;
            yMoveP1++;
            saltarP1++;
        } else if (saltarP1 < suelo) {
            yMoveP1++;
            saltarP1++;
        }
        else if (saltarP1 == suelo) {
            upP1 = true;
            vjumpP1 = false;
        }
    }

    if (vjumpP2 == true) {
        if (saltarP2 > limit && upP2 == true) {
            yMoveP2--;
            saltarP2--;
        } else if (saltarP2 == limit) {
            upP2 = false;
            yMoveP2++;
            saltarP2++;
        } else if (saltarP2 < suelo) {
            yMoveP2++;
            saltarP2++;
        }
        else if (saltarP2 == suelo) {
            upP2 = true;
            vjumpP2 = false;
        }
    }
}

function setup() {
    var canvas = createCanvas(cwidth, cheight);
    canvas.parent('canvas');
    frameRate(frate);

    xMoveP1 = 0;
    yMoveP1 = suelo;

    xMoveP2 = 0;
    yMoveP2 = suelo;

    // vid = createVideo("./img/personaje1a.mp4");
    //vid.loop();
}

function draw() {
    background(200);

    if (imgScene == 1) {
        image(imgScene1, 0, 0, cwidth, cheight);
    } else if (imgScene == 2) {
        image(imgScene2, 0, 0, cwidth, cheight);
    } else if (imgScene == 3) {
        image(imgScene3, 0, 0, cwidth, cheight);
    }

    character();
    caminar();
    saltar();

    //Saltar

    //rectMode(CENTER);
    //translate(width / 2, height / 2);
    //translate(p5.Vector.fromAngle(millis() / 1000, 40));
    //rect(0, 0, 20, 20);

    if (fTriangle == 1) {
        triangle(30, 75, 58, 20, 86, 75);
    }
    //--------------------------------------------------------------
    //Grabación y guardado de video.
    // keep adding new frame
    if (recording) {
        console.log('recording');
        encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);
        recordedFrames++;
    }
    // finalize encoding and export as mp4
    if (recordedFrames === numFrames || (recordedFrames > 0 && recording == false)) {
        recording = false;
        recordedFrames = 0;
        console.log('recording stopped');

        encoder.finalize();
        const uint8Array = encoder.FS.readFile(encoder.outputFilename);
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }));
        anchor.download = encoder.outputFilename;
        anchor.click();
        encoder.delete();
        preload();
    }
}