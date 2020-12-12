import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  isSignedIn: boolean = false;

  constructor(private router: Router,
    private noteService: NoteService,
    private authService: AuthServiceService) { }

  ngOnInit(): void {
    // re-route to '/notes' if currently singed in 
    if(this.checkSignedIn()) {
      this.router.navigate(['/notes/']);
    }

    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  checkSignedIn() {
    return this.authService.loggedIn();
  }

  onSignIn() {
    console.log("the signIn form: ", this.signInForm.value);
    this.noteService.signIn(this.signInForm.value)
      .then((response: any) => {
        console.log('response:', response);
        this.authService.setToken(response.jwt);
        this.authService.setUser(response.user);
        this.router.navigate(['/notes/'])
      });
  }

}
