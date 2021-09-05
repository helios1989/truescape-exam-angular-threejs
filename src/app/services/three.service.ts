import { Injectable, TemplateRef } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { iThreeProvider } from '../interfaces/iThreeProvider';
import {MatDialog} from '@angular/material/dialog';
import { VideoPlayerComponent } from '../components/video-player/video-player.component';
import { AppSharedMaterialModule } from '../shared/app.shared.material.module';
import { appConstants } from '../constants/appConstants';
@Injectable({
  providedIn: AppSharedMaterialModule
})
export class ThreeService implements iThreeProvider {
  canvas!: HTMLDocument;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  controls!: OrbitControls;
  
  private terrainVideo!: TemplateRef<any>;
  constructor(private dialog: MatDialog) { }
  // load and setup a 3d models
  // setup the canvas and mesh
  // setup the camera
  // setup the scene
  // setup the mesh
  renderTerrain(canvas: any, pathLoader:any): void {

    const texturePath = appConstants.threeService.textTurePathBem;
    this.renderer = new THREE.WebGLRenderer({canvas});
    this.renderer.domElement.addEventListener('dblclick', this._onDblClick.bind(null,this.dialog));
    // this.renderer.domElement.addEventListener.arguments('verge')
    this.camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
    this.camera.position.set(0, 10, 20);
    this.scene = new THREE.Scene();
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.target.set(0, 5, 0);
    this.controls.update();

    this._setupMesh(texturePath);
    this._setupScene();
    this._loadGltf(pathLoader);
    requestAnimationFrame(this._render);
  }
  private _setupMesh(texturePath: string) {
    this.scene.background = new THREE.Color('black');
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texturePath);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const planeSize = 40;
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    this.scene.add(mesh);
  }
  private _resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  private _addPin() {
    const pin = new THREE.TextureLoader().load(appConstants.threeService.pinImage );
    var marker = new THREE.SpriteMaterial( { map: pin } );
    var sprite = new THREE.Sprite( marker );
  
    sprite.position.set( 200,100,100 );
    sprite.scale.set(5,700,50);

    //Group the markers to set them relative to the map
    var group = new THREE.Object3D;
    group.add(sprite);
    this.scene.add(group);
  }
  private _render = () =>  {
    this._addPin(); 
    if (this._resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this._render);
  }

  private _frameArea(sizeToFitOnScreen: number, boxSize: number, boxCenter: THREE.Vector3, camera: THREE.PerspectiveCamera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }
  private _setupScene() {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    this.scene.add(light);
    this.scene.add(light.target);
  }
  private _onDblClick(dialog: MatDialog): void {
    dialog.open(VideoPlayerComponent);
  }

  private _loadGltf(pathLoader: any): void{
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(pathLoader, (gltf) => {
      const root = gltf.scene;
      this.scene.add(root);

      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      this._frameArea(boxSize * 0.5, boxSize, boxCenter, this.camera);

      // update the Trackball controls to handle the new size
      this.controls.maxDistance = boxSize * 10;
      this.controls.target.copy(boxCenter);
      this.controls.update();
    });
    
  }
}
