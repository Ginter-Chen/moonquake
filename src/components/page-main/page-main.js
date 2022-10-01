import { ref, onMounted, reactive } from 'vue';
import * as THREE from "three";


import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
// import VueTimeline from "vue-timeline-component"
import moment from 'moment';
import VueApexCharts from "vue3-apexcharts";
import UiTimeline from '../ui-timeline/index.vue';

/**
* 經緯度
* lon:經度
* lat:维度
* magnitude:強度
*/
import moonQuakeData from '../../assets/json/all_data.json';
import { _ } from 'core-js';

export default {
  name: 'page-main',
  
  setup(){

    const markerLabel = ref(null)
    const clostBtn = ref(null);
    const idNumRef = ref(null);
    const typeRef = ref(null);
    const dateRef = ref(null);
    const magnitudeRef = ref(null);
    const depthRef = ref(null);
    const coordinatesRef = ref(null);


    let info = reactive([{
      id: 0,
      mag: 0,
      coord: 0,
    }])
    let globalUniforms = {
      time: { value: 0 }
    };

    let label;

    /**
     * 經緯度
     * lng:經度
     * lat:维度
     * radius:地球半徑
     */

  let event = reactive( [{
    name: "event 1",
    start: new Date(2020, 1,1),
    end: new Date(2020, 1,4),
},{
    name: "event 2",
    start: new Date(2020, 1,2),
    end: new Date(2020, 1,5),
},{
    name: "event 3",
    start: new Date(2020, 1,3),
    end: new Date(2020, 1,10),
}]);



let chartOptions = reactive({
  chart: {
    height: 350,
    type: 'rangeBar'
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function(val) {
      var a = moment(val[0])
      var b = moment(val[1])
      var diff = b.diff(a, 'days')
      return diff + (diff > 1 ? ' days' : ' day')
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [50, 0, 100, 100]
    }
  },
  xaxis: {
    type: 'datetime'
  },
  legend: {
    position: 'top'
  }
});
let series = reactive([
  {
    name: 'Bob',
    data: [
      {
        x: 'Design',
        y: [
          new Date('2019-03-05').getTime(),
          new Date('2019-03-08').getTime()
        ]
      },
      {
        x: 'Code',
        y: [
          new Date('2019-03-08').getTime(),
          new Date('2019-03-11').getTime()
        ]
      },
      {
        x: 'Test',
        y: [
          new Date('2019-03-11').getTime(),
          new Date('2019-03-16').getTime()
        ]
      }
    ]
  },
  {
    name: 'Joe',
    data: [
      {
        x: 'Design',
        y: [
          new Date('2019-03-02').getTime(),
          new Date('2019-03-05').getTime()
        ]
      },
      {
        x: 'Code',
        y: [
          new Date('2019-03-06').getTime(),
          new Date('2019-03-09').getTime()
        ]
      },
      {
        x: 'Test',
        y: [
          new Date('2019-03-10').getTime(),
          new Date('2019-03-19').getTime()
        ]
      }
    ]
  }
])





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
      return { x: x, y: y, z: z }
    } //end: points
    /**
     * 經緯度
     * lon:經度
     * lat:维度
     * radius：月球半徑
     */
    function calcPosFromLatLonRad(lat, lon, radius) {
      var phi = (90 - lat) * (Math.PI / 180);
      var theta = (lon + 180) * (Math.PI / 180);
      var x = -(radius * Math.sin(phi) * Math.cos(theta));
      var z = (radius * Math.sin(phi) * Math.sin(theta));
      var y = (radius * Math.cos(phi));
      return [x, y, z];
      // return (new THREE.Vector3()).setFromSpherical(new THREE.Spherical(radius, phi, theta))
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
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    let rad = 4; //半徑
    // 建立一個半徑為 1 的
    const geometry = new THREE.SphereGeometry(rad, 32, 16);

    // 上材質
    const texture = new THREE.TextureLoader().load(require('assets/images/textures/lroc_color_poles_1k.jpg'));
    const normalMap = new THREE.TextureLoader().load(require('assets/images/textures/ldem_3_8bit_turn.png'));
    // const material = new THREE.MeshBasicMaterial( { map: texture , normalMap: normalMap} );
    const material = new THREE.MeshPhongMaterial({ map: texture, normalMap: normalMap });

    const Moon = new THREE.Mesh(geometry, material);
    scene.add(Moon);
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 2, 5)
    scene.add(light)
    const light1 = new THREE.DirectionalLight(0xffffff, 1)
    light1.position.set(-5, 2, 5)
    scene.add(light1)
    const light2 = new THREE.DirectionalLight(0xffffff, 1)
    light2.position.set(-5, -2, -5)
    scene.add(light2)
    const light3 = new THREE.DirectionalLight(0xffffff, 1)
    light3.position.set(5, -2, -5)
    scene.add(light3)
    camera.position.x = 15;


    // label
    let labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(labelRenderer.domElement);
    labelRenderer.render(scene, camera);//渲染

    // 载入控制器
    const controls = new OrbitControls(camera, labelRenderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 15;
    controls.enableDamping = false;
    controls.autoRotate = false;  // 自轉開關
    controls.autoRotateSpeed *= 0.25;

    let gMarker
    let mMarker
    let markers;
    var _moonquakeData = [];// label 
    let labelDiv;
    let closeBtn;
    // mounted
    onMounted(() => {
      labelDiv = markerLabel.value;
      closeBtn = clostBtn.value;
      // 關閉
      closeBtn.addEventListener("pointerdown", event => {
        labelDiv.classList.add("hidden");
      })

      label = new CSS2DObject(labelDiv);
      label.userData = {
        cNormal: new THREE.Vector3(),
        cPosition: new THREE.Vector3(),
        mat4: new THREE.Matrix4(),
        trackVisibility: () => { // the closer to the edge, the less opacity
          let ud = label.userData;
          ud.cNormal.copy(label.position).normalize().applyMatrix3(Moon.normalMatrix);
          ud.cPosition.copy(label.position).applyMatrix4(ud.mat4.multiplyMatrices(camera.matrixWorldInverse, Moon.matrixWorld));
          let d = ud.cPosition.negate().normalize().dot(ud.cNormal);
          d = smoothstep(0.2, 0.7, d);
          label.element.style.opacity = d;

          // https://github.com/gre/smoothstep/blob/master/index.js
          function smoothstep(min, max, value) {
            var x = Math.max(0, Math.min(1, (value - min) / (max - min)));
            return x * x * (3 - 2 * x);
          };
        }
      }
      scene.add(label);
      // </Label>

      // marker 
      const markerCount = 5;
      // let markerInfo = []; // information on markers
      gMarker = new THREE.PlaneGeometry();
      mMarker = new THREE.MeshBasicMaterial({
        color: 'yellow',
        onBeforeCompile: (shader) => {
          shader.uniforms.time = globalUniforms.time;
          // shader.uniforms.time = 'xxx';
          shader.vertexShader = `
              attribute float phase;
              varying float vPhase;
              ${shader.vertexShader}
            `.replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
                vPhase = phase; // de-synch of ripples
              `
          );
          shader.fragmentShader = `
              uniform float time;
              varying float vPhase;
              ${shader.fragmentShader}
            `.replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `
              vec2 lUv = (vUv - 0.5) * 2.;
              float val = 0.;
              float lenUv = length(lUv);
              val = max(val, 1. - step(0.25, lenUv)); // central circle
              val = max(val, step(0.4, lenUv) - step(0.5, lenUv)); // outer circle
              
              float tShift = fract(time * 0.5 + vPhase);
              val = max(val, step(0.4 + (tShift * 0.6), lenUv) - step(0.5 + (tShift * 0.5), lenUv)); // ripple
              
              if (val < 0.5) discard;
              
              vec4 diffuseColor = vec4( diffuse, opacity );
              `
          );
          //console.log(shader.fragmentShader)
        }
      });
      mMarker.defines = { USE_UV: " " }; // needed to be set to be able to work with UVs
      // let markers = new THREE.InstancedMesh(gMarker, mMarker, markerCount);
      markers = new THREE.InstancedMesh(gMarker, mMarker, moonQuakeData.length);
      setTime();
      // let dummy = new THREE.Object3D();
      // // dummy.scale.set(.2,.2,.2);
      // let phase = [];
      // for (let i = 0; i < moonQuakeData.length; i++) {
      //   // dummy.position.randomDirection().setLength(rad + 0.001);
      //   var _p = calcPosFromLatLonRad(moonQuakeData[i].lon, moonQuakeData[i].lat, rad);
      //   dummy.position.set(_p[0], _p[1], _p[2]);
      //   dummy.lookAt(dummy.position.clone().setLength(rad + 1));
      //   dummy.updateMatrix();
      //   markers.setMatrixAt(i, dummy.matrix);
      //   phase.push(Math.random());


      //   moonQuakeData[i]["crd"] = dummy.position.clone();
      //   // markerInfo.push({
      //   //   id: i + 1,
      //   //   mag: THREE.MathUtils.randInt(1, 10),
      //   //   crd: dummy.position.clone()
      //   // });
      // }
      // // info = [...markerInfo];
      // gMarker.setAttribute(
      //   "phase",
      //   new THREE.InstancedBufferAttribute(new Float32Array(phase), 1)
      // );
      // scene.add(markers);


      // end of marker

      // <Interaction>
      let pointer = new THREE.Vector2();
      let raycaster = new THREE.Raycaster();
      let intersections;
      let divID = idNumRef.value;
      let divType = typeRef.value;
      let divDate = dateRef.value;
      let divMagnitude = magnitudeRef.value;
      let divDepth = depthRef.value;
      let divCrd = coordinatesRef.value;


      // 點擊事件
      window.addEventListener("pointerdown", event => {
        // console.log('pointerdown',event);
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        intersections = raycaster.intersectObject(markers).filter(m => {
          return (m.uv.subScalar(0.5).length() * 2) < 0.25; // check, if we're in the central circle only
        });
        if (intersections.length > 0) {
          let iid = intersections[0].instanceId;
          divID.innerHTML = `ID: <b>${_moonquakeData[iid].id}</b>`;
          divType.innerHTML = `Type: <b>${_moonquakeData[iid].type}</b>`;
          divDate.innerHTML = `Time: <b>` + (_moonquakeData[iid].date == null ? `Unknow` : `${_moonquakeData[iid].date}</b>`);
          divMagnitude.innerHTML = `Magnitude: <b>` + (_moonquakeData[iid].magnitude == null ? `Unknow` : `${_moonquakeData[iid].magnitude}</b>`);
          divDepth.innerHTML = `depth: <b>` + (_moonquakeData[iid].depth == null ? `Unknow` : `${_moonquakeData[iid].depth} KM</b>`);
          divCrd.innerHTML = `Lon: <b>${_moonquakeData[iid].lon}</b>; Lat: <b>${_moonquakeData[iid].lat}</b>`;
          label.position.copy(_moonquakeData[iid].crd);
          label.element.animate([
            { width: "0px", height: "0px", marginTop: "0px", marginLeft: "0px" },
            { width: "230px", height: "96px", marginTop: "-25px", maginLeft: "120px" }
          ], {
            duration: 250
          });
          label.element.classList.remove("hidden");
        }

      })
      // </Interaction>
      animate();
    }) //end: mounted

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      let t = clock.getElapsedTime();
      globalUniforms.time.value = t;
      label.userData.trackVisibility();
      controls.update();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };
    const setTime = (start,end) => {
      if(start!=undefined&&end!=undefined){
        scene.remove(markers);
        start = Date.parse(start);
        end = Date.parse(end);
        _moonquakeData = [];
        labelDiv.classList.add("hidden");
        for(let _m = 0;_m<moonQuakeData.length;_m++){
          var _date =Date.parse(moonQuakeData[_m].date);
          if(_date>=start&&_date<=end){
            _moonquakeData.push(moonQuakeData[_m]);
          }
        }
      }else{
        for(let _m = 0;_m<moonQuakeData.length;_m++){
          _moonquakeData.push(moonQuakeData[_m]);
        }
      }
      markers = new THREE.InstancedMesh(gMarker, mMarker, _moonquakeData.length);
      let dummy = new THREE.Object3D();
      let phase = [];
      for (let i = 0; i < _moonquakeData.length; i++) {
          var _p = calcPosFromLatLonRad(_moonquakeData[i].lon, _moonquakeData[i].lat, rad);
          dummy.position.set(_p[0], _p[1], _p[2]);
          dummy.lookAt(dummy.position.clone().setLength(rad + 1));
          dummy.updateMatrix();
          markers.setMatrixAt(i, dummy.matrix);
          phase.push(Math.random());
          _moonquakeData[i]["crd"] = dummy.position.clone();
      }
      gMarker.setAttribute(
        "phase",
        new THREE.InstancedBufferAttribute(new Float32Array(phase), 1)
      );
      scene.add(markers);
    }

    return {
      markerLabel,
      clostBtn,
      idNumRef,
      typeRef,
      dateRef,
      magnitudeRef,
      depthRef,
      coordinatesRef,
      info,
      setTime,
      event,
      chartOptions,
      series,

    } //end: return;

  } // end: setup


}// end: export 


