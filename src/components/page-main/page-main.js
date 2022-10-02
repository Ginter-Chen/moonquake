import { ref, onMounted, reactive, getCurrentInstance } from 'vue';
import * as THREE from "three";


import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import VueTimeline from "vue-timeline-component"
import moment from 'moment';
import UiTimeline from '../ui-timeline/index.vue';
import UiTimeSlider from '../ui-time-slider/index.vue';


/**
* 經緯度
* lon:經度
* lat:维度
* magnitude:強度
*/
// import moonQuakeData from '../../assets/json/all_data.json';
import moonQuakeData from '../../assets/json/all_location.json';
import stationData from '../../assets/json/all_station.json';
import eventData from '../../assets/json/all_event.json';
import { _ } from 'core-js';

export default {
  name: 'page-main',
  components: {
    UiTimeSlider,
    UiTimeline,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    // timeline event  (mode =1 的事件資料)
    let timeEventDatas = reactive([]);
    let text =reactive(['ddd','aaa']);

    const markerLabel = ref(null)
    const clostBtn = ref(null);
    const idNumRef = ref(null);
    const typeRef = ref(null);
    const dateRef = ref(null);
    const magnitudeRef = ref(null);
    const depthRef = ref(null);
    const coordinatesRef = ref(null);
    let state = reactive({
      mode: 0,
      type: "",
      startTime: "",
      duration: "",
    })

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

    let event = reactive([{
      name: "event 1",
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 4),
    }, {
      name: "event 2",
      start: new Date(2020, 1, 2),
      end: new Date(2020, 1, 5),
    }, {
      name: "event 3",
      start: new Date(2020, 1, 3),
      end: new Date(2020, 1, 10),
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
        formatter: function (val) {
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

    let points = (lng, lat, radius) => {
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
    const camera = new THREE.PerspectiveCamera(45, (window.innerWidth-200) / (window.innerHeight+500), 0.1, 1000);
    camera.position.x = 25;
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(window.innerWidth-200, window.innerHeight+500);
    let rad = 4; //半徑
    // 建立一個半徑為 1 的
    const geometry = new THREE.SphereGeometry(rad, 32, 16);

    // 上材質
    const texture = new THREE.TextureLoader().load(require('assets/images/textures/lroc_color_poles_16k-q60.jpg'));
    const normalMap = new THREE.TextureLoader().load(require('assets/images/textures/ldem_3_8bit_turn.png'));
    // const material = new THREE.MeshBasicMaterial( { map: texture , normalMap: normalMap} );
    const material = new THREE.MeshPhongMaterial({ map: texture, normalMap: normalMap });

    const Moon = new THREE.Mesh(geometry, material);
    Moon.receiveShadow = true;
    scene.add(Moon);
    //Apollo
    var _station_data = [];
    const Apollo_material = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
    var Apollo_mesh = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    let Apollo = new THREE.InstancedMesh(Apollo_mesh, Apollo_material, _station_data.length);
    // let Apollo;
    scene.add(Apollo);
    //燈光
    const light = new THREE.DirectionalLight(0xffffff, 1.8)
    light.position.set(-15, 15, 0);
    camera.add(light);
    // scene.add(light)
    // label
    let labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    // document.body.appendChild(labelRenderer.domElement);
    labelRenderer.render(scene, camera);//渲染

    window.addEventListener("resize", onWindowResize);
    // 载入控制器
    const controls = new OrbitControls(camera, labelRenderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 8;
    controls.maxDistance = 30;
    controls.enableDamping = false;
    controls.autoRotate = false;  // 自轉開關
    controls.autoRotateSpeed *= 0.1;

    let gMarker
    let mMarker
    let markers;
    var _moonquakeData = [];// label 
    let labelDiv;
    let closeBtn;

    text = [... ['xxx','000']];

    
    // 無震央 event 處理
    // 轉換event的typp
    const converEventType = (type) => {
      switch(type){
        case 'A':
          return "Deep moonquake with assigned number";
        case 'T':
          return "Suspected long-period thermal moonquake with assigned number";
        case 'M':
        return  "Unclassified deep moonquake";
        case 'C':
          return "Meteoroid impact";
        case 'H':
          return "Shallow moonquake";
        case 'Z':
          return "Mostly short-period event";
        case 'L':
          return"LM impact";
        case 'S':
          return "S-IVB impact";
        case 'X':
          return "Special type";
        default:
          return "--";
      }
    }//end: converEventType
    
    let _handleEventDatas = ()  => {
      let _data = eventData;
      let _handleData = [];
      _data.forEach((item, index) => {
        if(index < 400){
          _handleData.push({
          name: item.id,
          data:[{
            x: 'event',
            y:[
              Date.parse(item.start),
              Date.parse(item.end),
            ]
          }]
        })// push
        }//end: if
      })
      return _handleData;

    }//end: handleEventDatas

    timeEventDatas = _handleEventDatas();
    // mounted
    onMounted(() => {

     
     
      // state.mode = 1;
      console.log('onMounted timeEventDatas',timeEventDatas)

      document.getElementById('moon').appendChild(renderer.domElement);
      renderer.domElement.style.marginTop = "-300px";
      document.getElementById('labels').appendChild(labelRenderer.domElement);

      // /document.body.appendChild(labelRenderer.domElement);

      // document.body.appendChild(renderer.domElement);

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
        color: '#0060ff',
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
                val = step(lenUv, 0.19); // central circle
                float tShift1 = fract(time * 0.5 + vPhase);
                float tShift2 = fract(time * 0.5 + vPhase + 0.33);
                float tShift3 = fract(time * 0.5 + vPhase + 0.66);
                val = max(val, step(0.19 + (tShift1 * 0.81), lenUv) - step(0.25 + (tShift1 * 0.75), lenUv)); // ripple 1
                val = max(val, step(0.19 + (tShift2 * 0.81), lenUv) - step(0.25 + (tShift2 * 0.75), lenUv)); // ripple 2
                val = max(val, step(0.19 + (tShift3 * 0.81), lenUv) - step(0.25 + (tShift3 * 0.75), lenUv)); // ripple 3
                if (val < 0.5) discard;
                vec4 diffuseColor = vec4(diffuse , 1.0 - 0.75*lenUv); // color change speed: slow
                `
          );
          //console.log(shader.fragmentShader)
        }
      });
      mMarker.defines = { USE_UV: " " }; // needed to be set to be able to work with UVs
      // let markers = new THREE.InstancedMesh(gMarker, mMarker, markerCount);
      markers = new THREE.InstancedMesh(gMarker, mMarker, moonQuakeData.length);
      setTime();


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

      // console.log(document.getElementById('moon').children[0].style.width);
      // 點擊事件
      window.addEventListener("pointerdown", event => {
        // console.log('pointerdown',event);
        // pointer.x = (event.clientX / (window.innerWidth)) * 2 - 1;
        pointer.x = ((event.clientX -200) / (window.innerWidth-200)) * 2 - 1;
        pointer.y = - ((event.clientY + 300) / (window.innerHeight +500)) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        if (state.mode == 0) {
          intersections = raycaster.intersectObject(markers).filter(m => {
            // console.log((m.uv.subScalar(0.5).length() * 2));
            return (m.uv.subScalar(0.5).length() * 2) < 0.25; // check, if we're in the central circle only
          });
          if (intersections.length > 0) {
            let iid = intersections[0].instanceId;
            var typeName = "";
            if (_moonquakeData[iid].type == "ai") {
              typeName = "<div style='line-height: 27px;text-align: center;font-size: 14px;display: inline-block;width:168px;height:27px;border-radius: 2px;background: #7000FF;'>Artificial Impacts</div>"
            } else if (_moonquakeData[iid].type == "m") {
              typeName = "<div style='line-height: 27px;text-align: center;font-size: 16px;display: inline-block;width:168px;height:27px;border-radius: 2px;background: #FF5C00;'>Meteoroid Impact</div>"
            } else if (_moonquakeData[iid].type == "dm") {
              typeName = "<div style='line-height: 27px;text-align: center;font-size: 16px;display: inline-block;width:168px;height:27px;border-radius: 2px;background: #FFA800;'>Deep Moonquake</div>"
            } else if (_moonquakeData[iid].type == "sm") {
              typeName = "<div style='line-height: 27px;text-align: center;font-size: 16px;display: inline-block;width:168px;height:27px;border-radius: 2px;background: #3DA922;'>Shallow Moonquake</div>"
            }
            divID.innerHTML = `ID: <b>${_moonquakeData[iid].id}</b>`;
            divType.innerHTML = `Type: ${typeName}`;
            divDate.innerHTML = `Time: <b>` + (_moonquakeData[iid].date == null ? `Unknow` : `${_moonquakeData[iid].date}</b>`);
            divMagnitude.innerHTML = `Magnitude: <b>` + (_moonquakeData[iid].magnitude == null ? `Unknow` : `${_moonquakeData[iid].magnitude}</b>`);
            divDepth.innerHTML = `depth: <b>` + (_moonquakeData[iid].depth == null ? `Unknow` : `${_moonquakeData[iid].depth} KM</b>`);
            divCrd.innerHTML = `Lon: <b>${_moonquakeData[iid].lon}</b>; Lat: <b>${_moonquakeData[iid].lat}</b>`;
            label.position.copy(_moonquakeData[iid].crd);
            label.element.animate([
              { width: "0px", height: "0px", marginTop: "0px", marginLeft: "0px" },
              { width: "256px", height: "180px", marginTop: "-150px", maginLeft: "45px" }
            ], {
              duration: 250
            });
            label.element.classList.remove("hidden");
          }
        } else if (state.mode) {

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
      // light.position.copy(camera.position.clone());
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };

    function onWindowResize() {
      let w=innerWidth-200;
      let h=innerHeight+500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      labelRenderer.setSize(w, h);
    };
    const setTime = (start, end) => {
      scene.remove(markers);
      scene.remove(Apollo);
      console.log('moonQuakeData',moonQuakeData);
      if (start != undefined && end != undefined) {
        start = Date.parse(start);
        end = Date.parse(end);
        _moonquakeData = [];
        labelDiv.classList.add("hidden");
        for (let _m = 0; _m < moonQuakeData.length; _m++) {
          var _date = Date.parse(moonQuakeData[_m].date);
          if (_date >= start && _date <= end) {
            _moonquakeData.push(moonQuakeData[_m]);
          }
        }
      } else {
        for (let _m = 0; _m < moonQuakeData.length; _m++) {
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
    };
    const removeMoonMarker = () => {
      scene.remove(markers);
      scene.remove(Apollo);
    }
    const add_station = (value) => {
      console.log('add_station',value);
      labelDiv.classList.add("hidden");
      scene.remove(markers);
      scene.remove(Apollo);
      _station_data = [];
      state.type = "";
      state.startTime = "";
      if (value != undefined) {
        var _event = eventData[value];
        console.log('_event',_event);
        if (_event["A11"]) {
          _station_data.push(stationData[0]);
        }
        if (_event["A12"]) {
          _station_data.push(stationData[1]);
        }
        if (_event["A14"]) {
          _station_data.push(stationData[2]);
        }
        if (_event["A15"]) {
          _station_data.push(stationData[3]);
        }
        if (_event["A16"]) {
          _station_data.push(stationData[4]);
        }
        state.type = converEventType(_event.type);
        state.startTime = _event.start;
        var diff = new Date(_event.end) - new Date(_event.start);
        state.duration = diff / 60000 + " Minute";
      } else {
        for (let _s = 0; _s < stationData.length; _s++) {
          _station_data.push(stationData[_s]);
        }
      }
      // Apollo = new THREE.InstancedMesh(Apollo_mesh, Apollo_material, _station_data.length);
      let dummy = new THREE.Object3D();
      var loader = new GLTFLoader();
      loader.load("/model/Apollo4.gltf", function (gltf) {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.material.color = new THREE.Color("rgb(0,96,255)");
            Apollo = new THREE.InstancedMesh(child.geometry, child.material, _station_data.length);
            for (let i = 0; i < _station_data.length; i++) {
              var _p = calcPosFromLatLonRad(_station_data[i].lon, _station_data[i].lat, rad);
              dummy.position.set(_p[0], _p[1], _p[2]);
              dummy.scale.set(.01, .01, .01);
              dummy.lookAt(dummy.position.clone().setLength(rad + 1));
              dummy.updateMatrix();
              Apollo.setMatrixAt(i, dummy.matrix);
            }
            // Apollo.castShadow = true; //default is false
            // Apollo.receiveShadow = false; //default
            scene.add(Apollo);
          }
        })
      });
    }
    

   

    // watch(
    //   () => (state.mode),
    //   (val) => {
    //     console.log('state mode watch', val);
    //     if(val === 1){
    //       _handleEventDatas();
    //     }
    //   },
    //   { deep: true },
    // ) //end: watch



    const onChange = (event) => {
      state.startTime = 0;
      state.mode = event;
      removeMoonMarker();
      if (state.mode == 0) {
        setTime();
      } else if (state.mode == 1) {
        // add_station(0);
        // 處理Event資料
    
      }
    }

    // time slider 更新時間
    let dateStart = ref('1969-01-01 00:00:00');
    let dateEnd = ref('1977-12-31 23:59:59');

    let updateDate = (val) => {
      // console.log('updateDate',val);
      setTime(val.start, val.end);
    }//end: updateDate


    

    



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
      onChange,
      state,
      event,
      chartOptions,
      series,
      updateDate,
      dateStart,
      dateEnd,
      add_station,
      timeEventDatas,
      text,
      removeMoonMarker,
    } //end: return;

  } // end: setup

}// end: export 


