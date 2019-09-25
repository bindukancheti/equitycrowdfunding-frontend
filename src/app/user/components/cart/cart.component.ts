import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Order, SellOrder } from 'src/app/core/models/order';
import { HttpService } from 'src/app/core/services/http.service';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router, private cartService: CartService, private http: HttpService) { }
  currentOrders: Array<Order>;
  currentSellOrders: Array<SellOrder>;
  conditionsAccepted: boolean = false;
 
  ngOnInit() {
    this.currentOrders = this.cartService.currentOrders;
    this.currentSellOrders = this.cartService.currentSellOrders;
  }

  removeItem(order: Order) {
    this.cartService.removeFromCart(order);
    this.currentOrders = this.cartService.currentOrders;
  }
  acceptConditions() {
    this.conditionsAccepted = true;
  }

  checkOut() {
    
    if (this.currentOrders != null && this.currentOrders.length > 0) {
      this.http.postRestData("insertOrUpdateOrder", this.currentOrders).subscribe(
        userResponse => {
          let user: any = JSON.parse((userResponse.body));
          if (userResponse.status == 200) {
            console.log('order successful');
            this.cartService.clearCart();
            this.currentOrders = this.cartService.getCurrentCartOrders();
            if (this.currentSellOrders != null && this.currentSellOrders.length > 0) {
                this.checkOutSell();
            }
            else{
              this.updateUseAndrouteToHome();
            }
            
          } else if (userResponse.status == 500) {
            console.log('login not succesfull')
          }
          
        },
        error => {
          console.log('errors in log in -error message :- ' + error);
        }
      );
    }
    else {
      if (this.currentSellOrders != null && this.currentSellOrders.length > 0) {
        this.checkOutSell();
       }

    }
    
  }

  updateUseAndrouteToHome(){
    this.authService.updateUserInformation();
    this.router.navigate(['/home']);
  }

  currentInvestmentAmountForOrder(investment_type: string,id: number) :number {
    var amount = 0;
    this.authService.currentUser.userInvestOnCampaignDetails.forEach(element => {
      if (id == element.campaign_id && investment_type=='I') {
         amount =element.amount;
      }
    });

    this.authService.currentUser.userInvestOnFundDetails.forEach(element => {
      if (id == element.fund_id && investment_type=='F') {
        amount =element.amount
      }
    });

    return amount;
  }

  removeSellItem(sellOrder: SellOrder) {
    this.cartService.removeFromSellCart(sellOrder);
    this.currentSellOrders = this.cartService.currentSellOrders;
  }

  checkOutSell() {

    var orders: Order[] = [];
    this.currentSellOrders.forEach(element => {
      var order: Order = {
        item_id: element.item_id,
        invest_type: 'I',
        user_id: element.user_id,
        item_name: element.item_name,
        amount: element.remainingAmount
      };
      orders.push(order)
    });
    this.http.postRestData("updateOrder", orders).subscribe(
      userResponse => {
        let user: any = JSON.parse((userResponse.body));
        if (userResponse.status == 200) {
          console.log('order successful');
          this.cartService.clearSellCart();
          this.currentSellOrders = this.cartService.getCurrentSellCartOrders()
          this.updateUseAndrouteToHome();
        } else if (userResponse.status == 500) {
          console.log('login not succesfull')
        }
      },
      error => {
        console.log('errors in log in -error message :- ' + error);
      }
    );

  }

}
