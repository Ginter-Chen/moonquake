
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

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
  /**
   * 經緯度
   * lat:經度
   * lon:维度
   * radius：月球半徑
   */
  function calcPosFromLatLonRad(lat,lon,radius){
    var phi   = (90-lat)*(Math.PI/180);
    var theta = (lon+180)*(Math.PI/180);
    var x = -(radius * Math.sin(phi)*Math.cos(theta));
    var z = (radius * Math.sin(phi)*Math.sin(theta));
    var y = (radius * Math.cos(phi));
    return [x,y,z];
  }
  
  
 

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
      //#region 測試用 
      const geometry_box = new THREE.BoxGeometry( .1, .1, .1 );
      const material_box = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
      const cube = new THREE.Mesh( geometry_box, material_box );
      cube.position.x = calcPosFromLatLonRad(0,0,1)[0];
      cube.position.y = calcPosFromLatLonRad(0,0,1)[1];
      cube.position.z = calcPosFromLatLonRad(0,0,1)[2];
      scene.add( cube );
      const geometry_box2 = new THREE.BoxGeometry( .1, .1, .1 );
      const material_box2 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
      const cube_2 = new THREE.Mesh( geometry_box2, material_box2 );
      cube_2.position.x = calcPosFromLatLonRad(0,20,1)[0];
      cube_2.position.y = calcPosFromLatLonRad(0,20,1)[1];
      cube_2.position.z = calcPosFromLatLonRad(0,20,1)[2];
      scene.add( cube_2 );
      //#endregion
			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );
                controls.update();
				renderer.render( scene, camera );
			};

			animate();
  }
}


