console.log( "lets make 3d!");


//Set up a re-usable 3d scene template!//
function main(){
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({
canvas,
  alpha:true,
  premultipliedAlpha: false,
});




//scene//
  const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x5c5c5c);
    const camera = new THREE.PerspectiveCamera( 50, window.innerWidth/      window.innerHeight, 0.1, 1000);
    const axes = new THREE.AxesHelper(40);

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 4;
    controls.maxDistance = 3;

//scene geometry set up//

camera.position.z = - 50;
camera.position.y = 90;


// camera.lookAt( scene.position );



//Ground plane for reference//
    var geometry = new THREE.PlaneGeometry(4,4,5);
    var material = new THREE.ShadowMaterial({
    color: 0x292929, });
    var plane = new THREE.Mesh (geometry, material);

scene.add( plane );
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, -1.2 ,-1 );

  plane.receiveShadow = true;

//Lighting//
// var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.1 );
// scene.add( ambientLight );

var spotLight = new THREE.SpotLight( 0xFFFFFF );
  spotLight.position.set( 0, 10, 1 );
    spotLight.intensity =4;
      spotLight.castShadow = true;
        spotLight.angle =2.8;
          spotLight.penumbra =0.8;

  spotLight.distance = 200;
// spotLight.target = plane;

  renderer.shadowMap.enabled = false;
    spotLight.shadow.mapSize.width = 2048;
      spotLight.shadow.mapSize.height = 2048;
        scene.add (spotLight);


var spotLight = new THREE.SpotLight( 0xFFFFFF );
  spotLight.position.set( -11.3, 3, -0.38 );
    spotLight.intensity =2;
        spotLight.castShadow = false;
            spotLight.angle =0.3;
                spotLight.penumbra =0.8;

  spotLight.distance = 200;
// spotLight.target = plane;

    renderer.shadowMap.enabled = true;
      spotLight.shadow.mapSize.width = 512;
        spotLight.shadow.mapSize.height = 512;
          scene.add (spotLight);


var hemiLight = new THREE.HemisphereLight ( 0xffffff, 0xffffff, 0.6);
  hemiLight.color.setHSL( 0.6, 1, 0.6);
    hemiLight.groundColor.setHSL( 0.95, 1, 0.75);
      hemiLight.position.set( 0, 50, 0);
          hemiLight.intensity = 3;

  scene.add( hemiLight );





//add the model to the scene//
var loader = new THREE.GLTFLoader();
loader.load('/models/Dewey10.glb',function(gltf){

  gltf.scene.traverse (function( child ) {

    if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;


    }
})

scene.add( gltf.scene );



const deweyGeo = ( gltf.scene);

deweyGeo.position.set( 0, -1.5, 0 );
  deweyGeo.scale.set( 2.5, 2.5, 2.5 );

  deweyGeo.castShadow = true;
  deweyGeo.receiveShadow = true;




  });


// });












var animate = function () {
requestAnimationFrame( animate );






renderer.render( scene, camera );
};
animate();
}


main();
