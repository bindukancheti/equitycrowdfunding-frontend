import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }
  loginButtonString: string = "Login";
  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.loginButtonString = 'Welcome' + this.authService.currentUser.name;
      console.log(this.loginButtonString);
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  getUserRole(): number {
    return this.authService.getRole();
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.name;
    }
    return '';
  }
  logOut(): void {
    this.authService.logout();
    this.cartService.clearCart();
    this.router.navigate(['/home']);
  }

  get cartSize(): number {
    return  this.cartService.getCurrentCartSize();
  }


}
