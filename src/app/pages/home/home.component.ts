import { Component, OnInit,ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { ThreeService } from '../../services/three.service';
// import {ThreeService} from '../../../assets/3d-assets/Terrain_Year16.gltf'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mining: string = 'Pre mining';
  toggle!: any;
  videoPath: string = '../../../assets/media/media.mp4';
  @ViewChild('terrainVideo')
  private terrainVideo!: TemplateRef<any>;

  constructor(private threeService: ThreeService, public dialog: MatDialog) {
    this.toggle = new FormControl('', []);
   }
  
  ngOnInit() {
    const path = '../../../assets/3d-assets/Terrain_Existing.gltf';
    const canvas: any = document.querySelector('#terrain');
    this.threeService.renderTerrain(canvas, path);
  }

  openVideo() {
    this.dialog.open(this.terrainVideo)
  }
  onChangeToggle() {
    if (this.toggle.value) {
      this.mining = 'Mining'
      const canvas: any = document.querySelector('#terrain');
      const initPath = '../../../assets/3d-assets/Mining_Facilities.gltf';
      this.threeService.renderTerrain(canvas, initPath);
    } else {
      this.mining = 'Pre Mining'
      const path = '../../../assets/3d-assets/Terrain_Existing.gltf';
      const canvas: any = document.querySelector('#terrain');
      this.threeService.renderTerrain(canvas, path);
    }
  } 
}
