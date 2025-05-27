import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js'
import { PointerLockControls} from 'three/addons/controls/PointerLockControls.js'

const scene = new THREE.Scene();

let prevTime = performance.now();
let direction = new THREE.Vector3();
let velocity = new THREE.Vector3();

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let raycaster;

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(1,1,1,1),
  new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
  })
)
floor.scale.x = 5;
floor.scale.y = 7;
floor.castShadow = false;
floor.receiveShadow = true;
floor.rotation.x = -(Math.PI / 2);
scene.add(floor);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  300,
)

camera.position.set(0,1,5)

const light = new THREE.DirectionalLight(0xFFFFFF);
light.position.set(100,100,100);
light.target.position.set(0,0,0)
light.castShadow = true;
light.shadow.bias = -0.01;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 300;

scene.add(light);
scene.add(new THREE.AxesHelper(2));

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient)

const canvas = document.querySelector("canvas");

const controls = new PointerLockControls( camera, document.body );

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth , window.innerHeight);

// const controls = new FirstPersonControls(camera,renderer.domElement);
// controls.lookSpeed = 0.1;
// controls.movementSpeed = 5;

scene.add(controls.object);

document.addEventListener('click', () => {
  controls.lock();
})

const onKeyDown = function ( event ) {

  switch ( event.code ) {

    case 'ArrowUp':
    case 'KeyW':
      moveForward = true;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = true;
      break;

    case 'ArrowDown':
    case 'KeyS':
      moveBackward = true;
      break;

    case 'ArrowRight':
    case 'KeyD':
      moveRight = true;
      break;

  }

};

const onKeyUp = function ( event ) {

  switch ( event.code ) {

    case 'ArrowUp':
    case 'KeyW':
      moveForward = false;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = false;
      break;

    case 'ArrowDown':
    case 'KeyS':
      moveBackward = false;
      break;

    case 'ArrowRight':
    case 'KeyD':
      moveRight = false;
      break;

  }

};



document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );

raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );


renderer.render(scene,camera);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth , window.innerHeight);
})

const clock = new THREE.Clock();

const renderLoop = () => {
  const time = performance.now();
  
  if ( controls.isLocked === true ) {
    const delta = ( time - prevTime ) / 1000;

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize();


    if(moveForward || moveBackward){
      velocity.z = 0;
      velocity.z -= direction.z * 400.0 * delta;
      controls.moveForward(-velocity.z *  delta)
    }
    
    if(moveLeft || moveRight){
      velocity.x = 0;
      velocity.x -= direction.x * 400.0 * delta;
      controls.moveRight(-velocity.x *  delta)
    }
    

    // if ( moveForward || moveBackward ) {
    //   velocity.z -= direction.z * 40.0 * delta;
    // }
    // if ( moveLeft || moveRight ) {
    //   velocity.x -= direction.x * 40.0 * delta;
    // }

    // controls.moveRight( - velocity.x * delta );
    // controls.moveForward( - velocity.z * delta );

    controls.object.position.y += ( velocity.y * delta );
  }

  prevTime = time;

  // const deltatemp = clock.getDelta(); 
  // controls.update(delta); 
  renderer.render(scene,camera);
  window.requestAnimationFrame(renderLoop);
}
renderLoop();