
import * as THREE from "three";
// import 'three-orbitcontrols';
import {
  OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: 'page-main',
  components: {},
  data () {
    return {

    }
  },
  setup(){
    const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
      // const controls = new THREE.OrbitControls( camera, renderer.domElement );
      const controls = new OrbitControls( camera, renderer.domElement );
      document.body.appendChild( renderer.domElement );
			const geometry = new THREE.SphereGeometry( 1, 32, 16 );
      const texture = new THREE.TextureLoader().load( require('assets/images/textures/ldem_3_8bit.jpg') );
      const normalMap = new THREE.TextureLoader().load( require('assets/images/textures/lroc_color_poles_1k.jpg') );
			const material = new THREE.MeshBasicMaterial( { map: texture , normalMap: normalMap} );
			const Moon = new THREE.Mesh( geometry, material );
			scene.add( Moon );

			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );
                controls.update();
				renderer.render( scene, camera );
			};

			animate();
  }
}


