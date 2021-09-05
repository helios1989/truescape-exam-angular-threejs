import { Component, OnInit,ViewChild, AfterViewInit, TemplateRef, Inject } from '@angular/core';
import { ThreeService } from '../../services/three.service';
import { FormControl } from '@angular/forms';
import { appConstants } from 'src/app/constants/appConstants';
import { iThreeProvider, THREE_PROVIDER } from 'src/app/interfaces/iThreeProvider';
const canvas: any = document.getElementById('terrain');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mining: string = 'Pre mining';
  toggle!: any;
  constructor(   
    @Inject(THREE_PROVIDER) private threeProvider: iThreeProvider) {
    this.toggle = new FormControl('', []);
   }
  
  ngAfterViewInit() {
    const path =  appConstants.homeComponent.terrainExisting;
    const canvas: any = document.getElementById('terrain');
    this.threeProvider.renderTerrain(canvas, path);
  }
  ngOnInit() {}

  onChangeToggle() {
    if (this.toggle.value) {
      this.mining = 'Mining'
      const initPath = appConstants.homeComponent.miningFacilities;
      this.threeProvider.renderTerrain(canvas, initPath);
    } else {
      this.mining = 'Pre Mining'
      const path = appConstants.homeComponent.terrainExisting;
      this.threeProvider.renderTerrain(canvas, path);
    }
  } 
}
