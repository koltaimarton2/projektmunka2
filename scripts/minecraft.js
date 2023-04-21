import * as THREE from 'three';
import { OrbitControls } from 'orbit';
import { GLTFLoader } from 'GLTF';

// --------------------------------------------------------------------
var SteveTexture, HatTexture, SteveModel, TophatModel;
let modelLoaded = 0, isMobile = false;
var Precanvas = document.querySelector('#Preview');
var UVs = document.getElementById("skinInput");
var testCheck = document.getElementById("test");
var skinHolder = document.getElementById("skinholder");
var hatern = document.getElementById("HatDestroy");
var tophats = Array.from(document.getElementsByClassName("holders"));
var radioBtns = new Array();

tophats.forEach(function(currentValue, index, arr) {
    radioBtns.push(tophats[index].firstElementChild.children[1]);
});
radioBtns = radioBtns.slice(1);

// THREE JS VARS ------------------------------------------------------
const UVLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();
const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0xffffff);
const gridHelper = new THREE.GridHelper(500, 500);
var HEIGHT, WIDTH;

// Check if using mobile then adjust WIDTH AND HEIGHT
if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) { HEIGHT = 500; WIDTH = 300; isMobile = true; } else { HEIGHT = 300; WIDTH = 500; }

// CAMERA ******************************************************************
const camera = new THREE.PerspectiveCamera(75, (WIDTH / HEIGHT), 0.1, 1000);
if(isMobile) camera.position.set(1.5, 5, 5);
else camera.position.set(1.5, 3, 3);

// RENDERER ******************************************************************
const renderer = new THREE.WebGLRenderer({
    canvas: Precanvas,
    antialias: true
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(WIDTH, HEIGHT);

// STEVE MODEL ******************************************************************
gltfLoader.load('models/steve.glb', (gltfScene) => {
    SteveModel = gltfScene;
    // console.log(SteveModel);
    gltfScene.scene.traverse( function ( node ) {
        if(node.isMesh){
            SteveTexture = node;
            // console.log(node.material.map)
            modelLoaded += 1;
        }
    });
    scene.add(gltfScene.scene);
})

gltfLoader.load('models/tophat.glb', (gltfScene) => {
    TophatModel = gltfScene;
    // console.log(loadedModel);
    gltfScene.scene.traverse( function ( node ) {
        if(node.isMesh){
            HatTexture = node;
            // console.log(node.material.map)
            modelLoaded += 1;
        }
    });
    gltfScene.scene.position.y = 300;
    scene.add(gltfScene.scene);
})

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(gridHelper, ambientLight);
scene.background = new THREE.Color( 0xE0E0E0 );

// ANIMATE ---------------------------------------------------------------------
const animate = () => {
    requestAnimationFrame(animate);

    controls.update();
    if(modelLoaded == 2) { SteveModel.scene.rotation.y += 0.01; TophatModel.scene.rotation.y += 0.01;}
    renderer.render(scene, camera);
};

// UPDATE TEXTURE FOR steve.gbl ------------------------
function call(texture, id){
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.flipY = false
    if(id == undefined) SteveTexture.material.map = texture;
    else HatTexture.material.map = texture;
};

// EVENT LISTENERS ------------------------
UVs.addEventListener("change", () => {
    let reader = new FileReader();
    reader.readAsDataURL(UVs.files[0]);
    reader.onload = () => {
        skinHolder.style.backgroundImage = `url(${reader.result})`
        let newUV = UVLoader.load(reader.result)
        call(newUV)
    }
});

testCheck.addEventListener('change', (e) => {
    if(!e.target.checked) return;
    let coolUV = UVLoader.load('images/kellekek/coolsteve.png');
    skinHolder.style.backgroundImage = 'url("images/kellekek/coolsteve.png")';
    //console.log("Cool test");
    call(coolUV);
});

//console.log(radioBtns);
radioBtns.forEach(changeHat);

function changeHat(item, index, arr) {
    let element = radioBtns[index]
    element.addEventListener("change", ()=>{
        console.log(`images/kellekek/${element.id}.png`);
        let hatUV = UVLoader.load(`images/kellekek/TophatTexture/${element.id}.png`);
        TophatModel.scene.position.y = 3;
        call(hatUV, 0);
    });
}

//console.log(hatern);
hatern.addEventListener("click", () => {
    TophatModel.scene.position.y = 300;
    //console.log("Moved!");
    radioBtns.forEach(function(currentValue) {
        currentValue.checked = false;
    })
});

animate()