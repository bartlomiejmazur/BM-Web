import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Theme from "./Theme.js";
import Renderer from "./Renderer.js";

import World from "./World/World.js";
import Preloader from "./World/Preloader.js";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();
    //event emitter sizes.resize()
    this.sizes.on("resize", () => {
      this.resize();
    });
    //event emitter time.update()
    this.time.on("update", () => {
      this.update();
    });
  }
  //update browser window when resizing it
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  //update over time
  update() {
    this.world.update();
    this.camera.update();
    this.renderer.update();
  }
}
