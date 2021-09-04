import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { ThreeService } from '../../services/three.service';
// import {ThreeService} from '../../../assets/3d-assets/Terrain_Year16.gltf'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private threeService: ThreeService) { }
  
  ngOnInit() {
    const canvas: any = document.querySelector('#terrain');
    const initPath = '../../../assets/3d-assets/Mining_Facilities.gltf';
    this.threeService.renderTerrain(canvas, initPath);
  }

  changeTerrain() {
    const path = '../../../assets/3d-assets/Terrain_Year16.gltf';
    const canvas: any = document.querySelector('#terrain');
    this.threeService.renderTerrain(canvas, path);
  }
  
}
