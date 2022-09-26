
import * as THREE from "three";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: 'page-main',
  components: {},
  data () {
    return {

    }
  },
  setup(){

  /**
   * 經緯度
   * lng:經度
   * lat:维度
   * radius:地球半徑
   */

  let points  = (lng, lat, radius) => {
      const lg = THREE.MathUtils.degToRad(lng), lt = THREE.MathUtils.degToRad(lat);
      const y = radius * MathUtils.sin(lt);
      const temp = radius * MathUtils.cos(lt);
      const x = temp * MathUtils.sin(lg);
      const z = temp * MathUtils.cos(lg);
      return {x: x, y: y, z: z}
  } //end: points

  
  
 

    const scene = new THREE.Scene();
    // PerspectiveCamera( fov, aspect, near, far ) 
      /**
       * fov(Number): 仰角的角度
        aspect(Number): 截平面长宽比，多为画布的长宽比。
        near(Number): 近面的距离
        far(Number): 远面的距离
        这里采用的是透视相机。视角越大，看到的场景越大，那么中间的物体相对于整个场景来说，就越小了
       */
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
      
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
      // 载入控制器
      const controls = new OrbitControls( camera, renderer.domElement );
      document.body.appendChild( renderer.domElement );

      // 建立一個半徑為 1 的
			const geometry = new THREE.SphereGeometry( 1, 32, 16 );

      // 上材質
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


