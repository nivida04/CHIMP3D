var renderer = new THREE.WebGLRenderer({ antialias: true, canvas: frame, alpha: true });
renderer.setSize( window.innerWidth-100, window.innerHeight-100 );
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 20;




var model;
var modelUrl = './Chimp_Head.gltf';

var loader = new THREE.GLTFLoader();
loader.load( modelUrl, function ( gltf ) {

  console.log(gltf)
  mixer = new THREE.AnimationMixer( gltf.scene );
  clips = gltf.animations;
  model = gltf.scene;
  model.scale.set(4,4,4);
  model.position.set(0,0,0);
  scene.add( model );

}, undefined, function ( e ) {
  console.error( e );
});


scene.background = null;

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);


const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(10, 10, 10);
//light.castShadow = false;
scene.add(light);

const lightTwo = new THREE.DirectionalLight(0xaab6ff, 2);
lightTwo.position.set(-5, 3, 2);
lightTwo.castShadow = false;
scene.add(lightTwo);




window.addEventListener('mousemove', function(e) {
    
    let percX = window.innerWidth*0.5 - e.clientX;
  
    camera.position.x = percX / 100;
    let percY = window.innerWidth*0.5 - e.clientY;
  
    camera.position.y = percY / 100;
  
    camera.lookAt(new THREE.Vector3(0,0,0));
});

window.addEventListener('touchmove', function(e) {
    let percX = window.innerWidth*0.5 - e.touches[0].pageX;

      camera.position.x = percX / 100;

      camera.lookAt(new THREE.Vector3(0,0,0));
});

window.addEventListener('scroll', function(e) {
  let elem = document.getElementById("frame");
  let div1 = elem.getBoundingClientRect().top - (window.innerHeight - elem.offsetHeight)/2;
    
    let percY = div1;
    camera.position.y = percY / 100;
  
    camera.lookAt(new THREE.Vector3(0,0,0));
});




function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
