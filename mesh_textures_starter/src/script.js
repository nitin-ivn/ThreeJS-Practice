import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

const uv2Geometry = new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
geometry.setAttribute('uv2', uv2Geometry)

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32)
const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32)

//const grassTexture = textureLoader.load("/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png")
// grassTexture.repeat.set(10,10);
// grassTexture.wrapS = THREE.RepeatWrapping
// grassTexture.wrapT = THREE.RepeatWrapping

// load the grass textures
const grassAlbedo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png')
grassAlbedo.colorSpace = THREE.SRGBColorSpace
const grassAo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png')
const grassHeight = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png')
const grassMetallic = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png')
const grassNormal = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png')
const grassRoughness = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png')

// load the boulder textures
const boulderAlbedo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_albedo.png')
boulderAlbedo.colorSpace = THREE.SRGBColorSpace
const boulderAo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_ao.png')
const boulderHeight = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_height.png')
const boulderMetallic = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_metallic.png')
const boulderNormal = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png')
const boulderRoughness = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_roughness.png')

// load the space cruiser textures
const spaceCruiserAlbedo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png')
spaceCruiserAlbedo.colorSpace = THREE.SRGBColorSpace
const spaceCruiserAo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png')
const spaceCruiserHeight = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png')
const spaceCruiserMetallic = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png')
const spaceCruiserNormal = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png')
const spaceCruiserRoughness = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png')




// initialize the material
const material = new THREE.MeshStandardMaterial();

material.map = grassAlbedo;
material.roughnessMap = grassRoughness;;
material.metalnessMap = grassMetallic;
// material.displacementMap = grassHeight;
// material.displacementScale = 0.1; 

material.aoMap = grassAo;

material.normalMap = grassNormal;

const group = new THREE.Group();

// initialize the mesh
const cube = new THREE.Mesh(geometry, material);

const knot = new THREE.Mesh(torusKnotGeometry, material);
knot.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;
// plane.rotation.x = -(Math.PI * 0.5)
// plane.scale.set(100,100);

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.y = 1.5;

const cylinder = new THREE.Mesh(cylinderGeometry, material);
cylinder.position.y = -1.5;

// add the mesh to the scene
group.add(plane,knot,sphere,cube,cylinder);
scene.add(group);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff,130);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 10;
// camera.position.y = 5;

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

  // group.children.forEach((child) => {
  //     if(child instanceof THREE.Mesh){
  //       child.rotation.y += 0.01
  //     }
  // })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
