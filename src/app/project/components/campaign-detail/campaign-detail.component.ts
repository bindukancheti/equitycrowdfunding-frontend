import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { MainCampaign } from 'src/app/core/models/main-campaign';
import { NavLinks } from 'src/app/core/models/nav-links';
import { CartService } from 'src/app/core/services/cart.service';
import { Order } from 'src/app/core/models/order';
import { AuthService } from 'src/app/user/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {
  count = 0;


  pageTitle = 'Product Detail';
  //product: Product;
  errorMessage: string;
  mainCampaignDetail : MainCampaign;
  amountAlreadyInvested:number =0;
  idAlreadyInvestedByUser:boolean;
  navLinks : NavLinks[] = [
    {label : "List of Active Campaigns" , path : "campaignlist"},
    {label : "List of Funds" , path : "welcome"}
  ]
   percentageInvested : string ;
  constructor(private router : Router, private sanitizer: DomSanitizer,private route: ActivatedRoute, private http : HttpService , private cartService : CartService,private authService :AuthService) { }
  order : Order = {
    item_id : 0,
    invest_type: 'I',
    user_id : this.authService.currentUser!=null? this.authService.currentUser.id: 25,
    item_name : '',
    amount : 0
  };
  itemid:number;     
  amount: number = 0;
  daysLeft: number=0;
  trustedUrl;
  ngOnInit(): void {
       //const resolvedData: ProductResolved =
      this.route.paramMap.subscribe(
        params => {
          const id  =  params.get('id');
          this.itemid = +id;
          console.log(id);
          this.getCampaignDetails(+id);
        }
      );
  }

  getUserRole() : number {
    return this.authService.getRole();
  }
  
  getCampaignDetails(campaignid : number): void {
    var url = "getMainCampaignDetailsOnCampaignId/" +campaignid ;
    this.http.getRestData(url).subscribe(
      data=> {
        if(data.status == 200)
        {
          let responseJson: any = JSON.parse((data.body));
          this.mainCampaignDetail = responseJson;
          this.amountAlreadyInvested =this.authService.amountInvestedInInvestment(campaignid,'I');
          this.amount=this.getAmountFromCart(campaignid);
          this.percentageInvested= (100 * (this.mainCampaignDetail.campaignDetail.capitalRaisedIndividually +
             this.mainCampaignDetail.campaignDetail.capitalRaisedInFunds)/this.mainCampaignDetail.campaignDetail.fund_required).toFixed(2);
          let myDate= new Date();
          let endDate = new Date(this.mainCampaignDetail.campaignDetail.end_date);
          let diffc:number=0;
          diffc = endDate.getTime() - myDate.getTime();
          this.daysLeft = Math.round(Math.abs(diffc/(1000*60*60*24)));
          var tempurl="https://www.youtube.com/embed/bNpx7gpSqbY";
          if(this.mainCampaignDetail.campaignMedias!=null){
            this.mainCampaignDetail.campaignMedias.forEach(
              element => {
                if (element.file_location.toString().includes("youtube")) {
                   tempurl = element.file_location.toString();
                }
              }
            );
          }
         
          this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(tempurl);
          console.log(this.authService.getRole() + '--role')
          console.log(campaignid + '--campaign id')
          console.log(this.mainCampaignDetail);
        }  else {
          console.log("error in get rest data")
          this.mainCampaignDetail = null;
        }
      },
      error => {
        console.log("error in get rest data")
      }
    );
  }

  getAmountFromCart(campaignId : number) : number {
    var amount : number =this.authService.amountInvestedInInvestment(campaignId,'I');
    this.cartService.getCurrentCartOrders().forEach(element => {
      if ((element.item_id == campaignId)) {
         amount= element.amount;
      }
    });
    return amount;
  }
  
  isLoggedIn(){
    console.log('logging checking');
    return this.authService.isLoggedIn;

  }

  addToCart() {
    if(!this.authService.isLoggedIn){
      this.router.navigate(['/login']);
    }
    
    console.log(this.amount);
    this.order.item_id=this.itemid;
    this.order.item_name =this.mainCampaignDetail.campaignDetail.name;
    this.order.invest_type ='I';
    this.order.user_id=this.authService.currentUser.id;
    this.order.amount=this.amount
    this.cartService.addToCart(this.order);
  }

}
