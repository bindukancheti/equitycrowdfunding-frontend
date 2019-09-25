import { Component, OnInit } from '@angular/core';
import { MainCampaign } from 'src/app/core/models/main-campaign';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  mainCampaignDetails : MainCampaign[];
  constructor(private router : Router, private sanitizer: DomSanitizer,private route: ActivatedRoute, private http : HttpService , private cartService : CartService,private authService :AuthService) { }
  listSize :number = 0;
  ngOnInit(): void {
    this.getAllCampaigns();
  }

   getAllCampaigns(): void {
    this.listSize=0;

    var url = "getAllMainCampaignDetailsApprovedAndActive";
    this.http.getRestData(url).subscribe(
      data=> {
        if(data.status == 200)
        {
          let responseJson: any = JSON.parse((data.body));
          this.mainCampaignDetails = responseJson;
          this.mainCampaignDetails.forEach(element => {
            this.listSize++;
          });
         
          console.log(this.mainCampaignDetails);
        }  else {
          console.log("error in get rest data")
          this.mainCampaignDetails = null;
        }
      },
      error => {
        console.log("error in get rest data")
      }
    );

  }

  // getCampaignsForFundRaiser(fundRaiserId : number): void {
  //   var url = "http://localhost:4200/assets/sampleCampaigns.json";
  //   this.http.getRestData(url).subscribe(
  //     data=> {
  //       if(data.status == 200)
  //       {
  //         let responseJson: any = JSON.parse((data.body));
  //         this.mainCampaignDetail = responseJson;
  //         console.log(this.mainCampaignDetail);
  //       }  else {
  //         console.log("error in get rest data")
  //         this.mainCampaignDetail = null;
  //       }
  //     },
  //     error => {
  //       console.log("error in get rest data")
  //     }
  //   );

  // }




}
