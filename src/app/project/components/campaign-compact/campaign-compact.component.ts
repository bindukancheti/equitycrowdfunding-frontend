import { Component, OnInit, Input } from '@angular/core';
import { CampaignDetail } from 'src/app/core/models/campaign-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/user/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/core/services/cart.service';
import { CampaignDetailComponent } from '../campaign-detail/campaign-detail.component';
import { MainCampaign } from 'src/app/core/models/main-campaign';

@Component({
  selector: 'app-campaign-compact',
  templateUrl: './campaign-compact.component.html',
  styleUrls: ['./campaign-compact.component.css']
})
export class CampaignCompactComponent implements OnInit {
  @Input() mainCampaign: MainCampaign;
  amountAlreadyInvested:number =0;
   imageUrl : string;
  userRole:number=25;
  daysLeft: number=0;
  constructor(private router : Router, private sanitizer: DomSanitizer,private route: ActivatedRoute, private http : HttpService , private cartService : CartService,private authService :AuthService) { }
  campaignDetail : CampaignDetail;
  ngOnInit() {
    this.userRole=this.authService.getRole();
    
    this.imageUrl = "https://images.pexels.com/photos/2933265/pexels-photo-2933265.jpeg?cs=srgb&dl=action-adult-bike-2933265.jpg&fm=";
    if (this.mainCampaign.campaignMedias != null) {
      this.mainCampaign.campaignMedias.forEach(
        element => {
          if (!element.file_location.toString().includes("youtube")) {
            this.imageUrl = element.file_location.toString();
          }
        }
      );
    }

    if (this.userRole==1){
      this.campaignDetail=this.mainCampaign.campaignDetail;
      this.amountAlreadyInvested =this.authService.amountInvestedInInvestment(this.campaignDetail.id,'I');
    }
    let myDate= new Date();
    let endDate = new Date(this.mainCampaign.campaignDetail.end_date);
    let diffc:number=0;
    diffc = endDate.getTime() - myDate.getTime();
    this.daysLeft = Math.round(Math.abs(diffc/(1000*60*60*24)));
  }

}
