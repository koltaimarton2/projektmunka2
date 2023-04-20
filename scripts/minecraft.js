import * as THREE from 'three'
import { OrbitControls } from 'orbit';
import { GLTFLoader } from 'GLTF';

var loadedTexture, loadedModel;
let modelLoaded = false;
var Precanvas = document.querySelector('#Preview');
var UVs = document.getElementById("skinInput");
var skinHolder = document.getElementById("skinholder");
let UVLoader = new THREE.TextureLoader();
const HEIGHT = 300;
const WIDTH = 500;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, (WIDTH / HEIGHT), 0.1, 1000);
camera.position.set(1.5, 3, 3);

const renderer = new THREE.WebGLRenderer({
    canvas: Precanvas,
    antialias: true
});

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize(WIDTH, HEIGHT);

const gltfLoader = new GLTFLoader();

gltfLoader.load('models/steve.glb', (gltfScene) => {
    loadedModel = gltfScene;
    console.log(loadedModel);
    gltfScene.scene.traverse( function ( node ) {
        if(node.isMesh ){
            loadedTexture = node;
            console.log(node.material.map)
            modelLoaded = true;
        }
    });

    scene.add(gltfScene.scene)
})

function call(texture){
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.flipY = false
    loadedTexture.material.map = texture;
}


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const gridHelper = new THREE.GridHelper(500, 500);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

scene.background = new THREE.Color( 0xE0E0E0 );
const animate = () => {
    requestAnimationFrame(animate);

    controls.update();
    if(modelLoaded){
        loadedModel.scene.rotation.y += 0.01
    }
    renderer.render(scene, camera);
}

UVs.addEventListener("change", () => {
    let reader = new FileReader();
    reader.readAsDataURL(UVs.files[0]);
    reader.onload = () => {
        skinHolder.style.backgroundImage = `url(${reader.result})`
        let newUV = UVLoader.load(reader.result)
        call(newUV)
    }
})


document.querySelector("#Previewbutton").addEventListener("onclick", () => {
    let skin2d = document.querySelector("#2Dskin");
    let skin3d = document.querySelector("#3Dskin");

    skin2d.classList.toggle("col-md-12");
})

// to do the on click event

animate()