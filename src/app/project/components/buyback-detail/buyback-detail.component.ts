import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/user/auth.service';
import { MainCampaign } from 'src/app/core/models/main-campaign';
import { BuybackDetails } from 'src/app/core/models/buyback-details';
import { Order, SellOrder } from 'src/app/core/models/order';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-buyback-detail',
  templateUrl: './buyback-detail.component.html',
  styleUrls: ['./buyback-detail.component.css']
})
export class BuybackDetailComponent implements OnInit {
  pageTitle = 'Buy Back Detail';
  errorMessage: string;
 
  buybackDetails : BuybackDetails;
  amountAlreadyInvested:number =0;
  percentage:number =0;
  cartValue : number;
  currentInvestmentValue:number =0;
  trustedUrl: SafeUrl;
  sellOrder : SellOrder = {
    item_id : 0,
    item_name:'',
    invest_type: 'I',
    buyBackPercentage :0,
    declaredPercenatege:0,
    user_id : this.authService.currentUser.id,
    remainingAmount : 0
  };
  constructor(private router: Router, private sanitizer: DomSanitizer, private route: ActivatedRoute, private http: HttpService, private cartService: CartService, private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id  =  params.get('id');
        console.log(id);
        this.getBuybackDetails(+id);

      }
    );
  }

  getAmountFromCart(campaignId : number) : number{
    var percentage : number =0;
    this.cartService.getCurrentSellCartOrders().forEach(element => {
      if ((element.item_id == campaignId)) {
         percentage= element.declaredPercenatege;
      }
    });
    return percentage;
  }

  getBuybackDetails(campaignid : number): void {
    // var url = "getMainCampaignDetailsOnCampaignId/" +campaignid ;
    var url = "getBuyBackMainCampaignDetail/" + campaignid;
    this.http.getRestData(url).subscribe(
      data=> {
        if(data.status == 200)
        {
          console.log(campaignid + '--------campaign id');
         
          let responseJson: any = JSON.parse((data.body));
          
          this.buybackDetails = responseJson;
          console.log(this.buybackDetails);
          this.amountAlreadyInvested =this.authService.amountInvestedInInvestment(campaignid,'I');
          this.currentInvestmentValue=this.amountAlreadyInvested*(this.buybackDetails.buyback_return_percentage/100);
          this.percentage=this.getAmountFromCart(campaignid);



          // video content
          var tempurl="https://www.youtube.com/embed/bNpx7gp";
          if(this.buybackDetails.mainCampaign.campaignMedias!=null){
            this.buybackDetails.mainCampaign.campaignMedias.forEach(
              element => {
                if (element.file_location.toString().includes("youtube")) {
                  tempurl = element.file_location.toString();
                }
              }
            );
          }
          this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(tempurl);
          console.log( this.percentage);
       
        }  else {
          console.log("error in get rest data")
          this.buybackDetails = null;
        }
      },
      error => {
        console.log("error in get rest data")
      }
    );

  }
  checkOut() {

    console.log('checkOut-sell called')
    this.cartValue=this.amountAlreadyInvested*(1-this.percentage/100);
    this.sellOrder.item_id=this.buybackDetails.mainCampaign.campaignDetail.id;
    this.sellOrder.item_name =this.buybackDetails.mainCampaign.campaignDetail.name;
    this.sellOrder.invest_type ='I';
    this.sellOrder.user_id=this.authService.currentUser.id;
    this.sellOrder.buyBackPercentage=this.buybackDetails.buyback_return_percentage;
    this.sellOrder.declaredPercenatege=this.percentage;
    this.sellOrder.remainingAmount=this.cartValue;
    this.cartService.addToSellCart(this.sellOrder);
    
    console.log(this.cartService.currentSellOrders)

  }

}
