import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router:Router){
  }
  gotosignup(){
    this.router.navigate(['/HOME/SIGN_UP']);
  }
  gotologin(){
    this.router.navigate(['HOME/LOGIN']);
  }
}
