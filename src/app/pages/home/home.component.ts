import { Component, OnInit,ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { ThreeService } from '../../services/three.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mining: string = 'Pre mining';
  toggle!: any;
  constructor(private threeService: ThreeService) {
    this.toggle = new FormControl('', []);
   }
  
  ngAfterViewInit() {
    const path = '../../../assets/3d-assets/Terrain_Existing.gltf';
    const canvas: any = document.getElementById('terrain');
    this.threeService.renderTerrain(canvas, path);
  }
  ngOnInit() {}

  onChangeToggle() {
    if (this.toggle.value) {
      this.mining = 'Mining'
      const canvas: any = document.getElementById('terrain');
      const initPath = '../../../assets/3d-assets/Mining_Facilities.gltf';
      this.threeService.renderTerrain(canvas, initPath);
    } else {
      this.mining = 'Pre Mining'
      const path = '../../../assets/3d-assets/Terrain_Existing.gltf';
      const canvas: any = document.getElementById('terrain');
      this.threeService.renderTerrain(canvas, path);
    }
  } 
}
