import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { max, min } from "three/tsl";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1,1);
const torusKnowGeometry = new THREE.TorusKnotGeometry(0.5,0.15,100,16);

// initialize the material
// const material = new THREE.MeshLambertMaterial() 

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 90

const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0x00ff00);
material.roughness = 1

// pane.addInput(material,'metalness', {
//   min: 0,
//   max: 1,
//   step: 0.01
// })

// pane.addInput(material,'roughness', {
//   min: 0,
//   max: 1,
//   step: 0.01
// })

//mesh basic
// material.color = new THREE.Color(0x00ff00)
// material.transparent = true;
// material.opacity = 0.5
// material.side = THREE.DoubleSide

// const fog = new THREE.Fog(0xffffff,1,10)
// scene.fog = fog;
// scene.background = new THREE.Color(0xffffff);



// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = new THREE.Mesh(torusKnowGeometry,material)
mesh2.position.x = 1.5

const plane = new THREE.Mesh(planeGeometry,material)
plane.position.x = -1.5;

scene.add(mesh);
scene.add(mesh2)
scene.add(plane)

const light = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(light)

const pointLight = new THREE.PointLight(0xffffff, 200);
pointLight.position.set(5,2,5);
scene.add(pointLight)

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
