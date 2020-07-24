import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  onSignIn() {
    this.router.navigate(['/notes'])
  }

}
