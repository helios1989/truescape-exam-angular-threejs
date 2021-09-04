import { Component, OnInit } from '@angular/core';
import { LoggedinService } from '../../services/logged-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private loggedInService: LoggedinService) { }

  ngOnInit(): void {
    this.loggedInService.isAuthenticated$.subscribe((d) =>
    { 
      console.log(d);
      this.isAuthenticated = d
    } );
  }

}
