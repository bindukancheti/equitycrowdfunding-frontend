import { Component, OnInit } from '@angular/core';
import { MainCampaign } from 'src/app/core/models/samplemodel';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-my-campaignlist',
  templateUrl: './my-campaignlist.component.html',
  styleUrls: ['./my-campaignlist.component.css']
})
export class MyCampaignlistComponent implements OnInit{

  mainCampaignDetails  : MainCampaign[];
  constructor(private route: ActivatedRoute, private http : HttpService, private authService :AuthService) { }
  listSize :number = 0;
  ngOnInit(): void {
    //const resolvedData: ProductResolved =
      this.route.paramMap.subscribe(
        params => {
          const id  =  params.get('id');
          console.log(id);
          this.getAllCampaigns(2);
        }
      );
  }

  
   getAllCampaigns(campaignid : number): void {
    this.listSize=0;

    var url = "getAllMainCampaignDetailsOnFundRaiserIdApprovedAndActive/" + this.authService.currentUser.id;
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
