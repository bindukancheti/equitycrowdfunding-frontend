import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService,
    private router: Router) { }

  login(loginForm: NgForm) {

    console.log("login hit");
    if (loginForm && loginForm.valid) {
      var userName = loginForm.form.value.userName;
      var password = loginForm.form.value.password;
      password = 'a';      this.authService.login(userName, password).subscribe(
        userResponse => {
          let user: any = JSON.parse((userResponse.body));
          if (userResponse.status == 200) {
            console.log('login succesful');
            this.authService.setCurrentUser(user);
            if (this.authService.currentUser.role == 1) {
              // Navigate to the investor home page after log in as investor.
              console.log('user role 1 - investor home page after log in as investor')
              this.router.navigate(['/home']);
            }
            else if (this.authService.currentUser.role == 2) {
              //Navigate to the fund raiser home page after log in as Raiser.
              console.log('user role 2- fund raiser home page after log in as Raiser ')
              this.router.navigate(['/fundRaiserHome']);
            }
            else if (this.authService.currentUser.role == 0) {
              // Navigate to the fund manager home page after log in as F.m.
              console.log('user role 0 - fund manager home page after log in as F.m.')
              this.router.navigate(['/login']);
            }
          } else if (userResponse.status == 500) {
            console.log('login not succesfull')
          }

        },
        error => {
          console.log('errors in log in -error message :- ' + error);
        }
      );
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
