import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Order } from 'src/app/core/models/order';
import { AuthService } from 'src/app/user/auth.service';
import { FundDetail } from 'src/app/core/models/fund-detail';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { element } from 'protractor';

@Component({
  selector: 'app-fund-detail',
  templateUrl: './fund-detail.component.html',
  styleUrls: ['./fund-detail.component.css']
})
export class FundDetailComponent implements OnInit {
  pageTitle = 'Fund Detail';
  errorMessage: string;
  fundDetail: FundDetail;
  amountAlreadyInvested: number = 0;

  constructor(private router: Router, private sanitizer: DomSanitizer, private route: ActivatedRoute, private http: HttpService, private cartService: CartService, private authService: AuthService) { }
  percentageInvested : string ;
  order: Order = {
    item_id: 0,
    item_name: '',
    invest_type: 'F',
    user_id: this.authService.currentUser != null ? this.authService.currentUser.id : 25,
    amount: 0
  };
  itemid: number;
  amount: number = 0;
  numberOfCampaigns: number=0;
  fundRequired: number=0;
  daysLeft: number=0;

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.itemid = +id;
        console.log(id);
        this.getFundDetails(+id);
      }
    );
  }
  trustedUrl: SafeUrl;
  imageUrl: string;
  getUserRole(): number {
    return this.authService.getRole();
  }

  getFundDetails(fundid: number): void {
    var url = "getFundDetail/" + fundid;
    this.http.getRestData(url).subscribe(
      data => {
        if (data.status == 200) {
          console.log("after response..");
          console.log(this.fundDetail);
          let responseJson: any = JSON.parse((data.body));
          this.fundDetail = responseJson;
          console.log(this.fundDetail)
          this.amountAlreadyInvested = this.authService.amountInvestedInInvestment(fundid, 'F');
          this.amount = this.getAmountFromCart(fundid);
          this.numberOfCampaigns=this.fundDetail.fundCampaignsList.length;
          this.fundDetail.fundCampaignsList.forEach(element => {
            this.fundRequired = this.fundRequired + element.campaignDetail.fund_required;
          });
          this.percentageInvested= (100 * (this.fundDetail.capitalRaisedInThisFund)/this.fundRequired).toFixed(2);
          let myDate= new Date();
          let endDate = new Date(this.fundDetail.end_date);
          let diffc:number=0;
          diffc = endDate.getTime() - myDate.getTime();
          this.daysLeft = Math.round(Math.abs(diffc/(1000*60*60*24)));
          var tempurl = "https://www.youtube.com/embed/bNpx7gpSqbY";
          if (this.fundDetail.fundMedias != null) {
            this.fundDetail.fundMedias.forEach(
              element => {
                if (element.file_location.toString().includes("youtube")) {
                  tempurl = element.file_location.toString();
                }
              }
            );
          }
          
          this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(tempurl);

          

          
          console.log(fundid + '--fund id')
          console.log(this.fundDetail);
        } else {
          console.log("error in get rest data")
          this.fundDetail = null;
        }
      },
      error => {
        console.log("error in get rest data")
      }
    );

  }

  getAmountFromCart(fundid: number): number {
    var amount: number = this.authService.amountInvestedInInvestment(fundid, 'F');;
    this.cartService.getCurrentCartOrders().forEach(element => {
      if ((element.item_id == fundid)) {
        amount = element.amount;
      }
    });
    return amount;
  }


  isLoggedIn() {
    console.log('logging checking');
    return this.authService.isLoggedIn;

  }
  addToCart() {

    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    console.log(this.amount);
    this.order.item_id = this.itemid;
    this.order.item_name = this.fundDetail.fund_name;
    this.order.invest_type = 'F';
    this.order.user_id = this.authService.currentUser.id;
    this.order.amount = this.amount
    this.cartService.addToCart(this.order);
  }
}
