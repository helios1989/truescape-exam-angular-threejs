import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggedinService} from '../../services/logged-in.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {


  public loginForm!: FormGroup
  constructor(private fb: FormBuilder, 
    private router: Router,
    private loggedInService: LoggedinService) {

  }

  onSubmit() {
    const {username,password} = this.loginForm.value;
    if (username ==='test' && password ==='test') {
      this.loggedInService.setLogin(true);
      this.router.navigate(['/home'])
    } else {
      alert('wrong username and password');
    }
  }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null],
      password: [null]
    });
  }

}