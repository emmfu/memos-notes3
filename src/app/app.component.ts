import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn: boolean;

  constructor(private router: Router,
              private auth: AuthServiceService){}

  ngOnInit(): void {
    this.loggedIn = this.auth.loggedIn();
    console.log("isLoggedIn", this.loggedIn);
  }

  isLoggedIn(): boolean {
    return this.auth.loggedIn();
  }

  onIconClick() {
    if(this.isLoggedIn()){
      this.router.navigate(['/notes']);
    } else {
      this.router.navigate(['']);
    }
  }

  onChecking() {
    console.log('** Currently logged in: ', this.auth.loggedIn());
    console.log('** Current user: ', this.auth.getUser());
    console.log('** Current Token: ', this.auth.getToken());
  }
  onRegister() {
    console.log('clicked onRegister');
    this.router.navigate(['/register/']);
  }
  
  onLogOut() {
    this.auth.logout();
    this.router.navigate(['']);

  }

}
