import { Component, OnInit } from '@angular/core';
import { MainCampaign } from 'src/app/core/models/samplemodel';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { FundDetail } from 'src/app/core/models/fund-detail';


@Component({
  selector: 'app-fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css']
})
export class FundListComponent implements OnInit {
  mainCampaignDetails : MainCampaign[];
  fundList : FundDetail[];
  constructor(private route: ActivatedRoute, private http : HttpService) { }
  listSize :number = 0;
  ngOnInit() {
    this.getAllActiveFunds();
  }
  getAllActiveFunds(): void {
    this.listSize=0;
    var url = "getAllFundListActive";
    this.http.getRestData(url).subscribe(
      data=> {
        if(data.status == 200)
        {
          let responseJson: any = JSON.parse((data.body));
          this.fundList = responseJson;
          this.fundList.forEach(element => {
            this.listSize++;
          });
        

          console.log(this.fundList);
        }  else {
          console.log("error in get rest data")
          this.fundList = null;
        }
      },
      error => {
        console.log("error in get rest data")
      }
    );}
}
