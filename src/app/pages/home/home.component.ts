import { Component, OnInit,ViewChild, AfterViewInit, TemplateRef, Inject } from '@angular/core';
import { ThreeService } from '../../services/three.service';
import { FormControl } from '@angular/forms';
import { appConstants } from 'src/app/constants/appConstants';
import { iThreeProvider, THREE_PROVIDER } from 'src/app/interfaces/iThreeProvider';

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
    this.threeProvider.renderTerrain(document.getElementById('terrain'), path);
  }
  ngOnInit() {}

  onChangeToggle() {
    if (this.toggle.value) {

      this.mining = 'Mining'
      const initPath = appConstants.homeComponent.miningFacilities;
      console.log(initPath);
      this.threeProvider.renderTerrain(document.getElementById('terrain'), initPath);
    } else {

      this.mining = 'Pre Mining'
      const path = appConstants.homeComponent.terrainExisting;
      this.threeProvider.renderTerrain(document.getElementById('terrain'), path);
    }
  } 
}
