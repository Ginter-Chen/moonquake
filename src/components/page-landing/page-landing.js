import * as THREE from "three";
export default {
  name: 'page-landing',
  components: {},
  props: [],
  data () {
    return {
      isShake: false,
    }
  },
  computed: {

  },
  mounted () {
    this.initThree()
  },
  methods: {
    initThree() {
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#000')
      const canvas = document.querySelector('#moonLanding')
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight);
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 15
      let rad = 10; //半徑
      const geometry = new THREE.SphereGeometry(rad, 32, 16);
      const texture = new THREE.TextureLoader().load(require('assets/images/textures/lroc_color_poles_16k-q60.jpg'));
      const normalMap = new THREE.TextureLoader().load(require('assets/images/textures/ldem_3_8bit_turn.png'));
      const material = new THREE.MeshPhongMaterial({ map: texture, normalMap: normalMap });
      const Moon = new THREE.Mesh(geometry, material);
      Moon.position.set(7.5,-7.5,0);
      scene.add(Moon);
      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(-10, 10, 5);
      scene.add(light);
      function animate() {
        renderer.render(scene, camera);
        Moon.rotation.y+=Math.PI/8000;
        Moon.rotation.x+=Math.PI/8000;
        requestAnimationFrame(animate)
      }
      animate();
      window.addEventListener("resize", onWindowResize);
      function onWindowResize() {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      };
    },
    onClickStart(){
      this.isShake=true;
      setTimeout(()=> {
        this.$router.push({name: 'work'});
      },950)
    }
  },
}


