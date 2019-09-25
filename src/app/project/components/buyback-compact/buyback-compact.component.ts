import { Component, OnInit, Input } from '@angular/core';
import { BuybackDetails } from 'src/app/core/models/buyback-details';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-buyback-compact',
  templateUrl: './buyback-compact.component.html',
  styleUrls: ['./buyback-compact.component.css']
})
export class BuybackCompactComponent implements OnInit {
  @Input() buybackDetails: BuybackDetails;
  amountAlreadyInvested:number =0;
  userRole:number=25;
  amountReturn: number =0;
  daysLeft: number=0;
  imageUrl : string;
  constructor(private route: ActivatedRoute, private http : HttpService, private authService :AuthService) { }

  ngOnInit() {
    console.log("single buyback...")
    console.log(this.buybackDetails);
    this.userRole=this.authService.getRole();

    this.imageUrl = "https://images.pexels.com/photos/2933265/pexels-photo-2933265.jpeg?cs=srgb&dl=action-adult-bike-2933265.jpg&fm=";
    if (this.buybackDetails.mainCampaign.campaignMedias != null) {
      this.buybackDetails.mainCampaign.campaignMedias.forEach(
        element => {
          if (!element.file_location.toString().includes("youtube")) {
            this.imageUrl = element.file_location.toString();
          }
        }
      );
    }


    if (this.userRole==1){
      this.amountAlreadyInvested =this.authService.amountInvestedInInvestment(this.buybackDetails.mainCampaign.campaignDetail.id,'I');
      this.amountReturn = this.amountAlreadyInvested*(this.buybackDetails.buyback_return_percentage/100);
    }



    let myDate= new Date(this.buybackDetails.mainCampaign.campaignDetail.start_date);
    let endDate = new Date(this.buybackDetails.mainCampaign.campaignDetail.end_date);
    let diffc:number=0;
    diffc = endDate.getTime() - myDate.getTime();
    this.daysLeft = Math.round(Math.abs(diffc/(1000*60*60*24)));
  }

}
