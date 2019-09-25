import { Component, OnInit } from '@angular/core';
import { BuybackDetails } from 'src/app/core/models/buyback-details';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-buyback-list',
  templateUrl: './buyback-list.component.html',
  styleUrls: ['./buyback-list.component.css']
})
export class BuybackListComponent implements OnInit {
  buybackList: BuybackDetails[];
  user: User;
  constructor(private route: ActivatedRoute, private http : HttpService, private authService :AuthService) { }
  listSize :number = 0;
  ngOnInit() {
    
    
    if(this.authService.currentUser!=null){
      this.user =this.authService.getCurrentUser();
      console.log(this.user);
      this.getActiveInvestedBuybacks(this.user.id);
    }
       
  }
   
  get isInvestorLoggedIn(){
    return this.authService.getRole()==1;
  }

  getActiveInvestedBuybacks(userid : number): void {
    this.listSize=0;

    var url = "getBuyBackMainCampaignDetails/" + userid;
    this.http.getRestData(url).subscribe(
      data=> {
        if(data.status == 200)
        {
          let responseJson: any = JSON.parse((data.body));
          this.buybackList = responseJson;
          console.log(this.buybackList);
          this.buybackList.forEach(element => {
            this.listSize++;
          });
          console.log(this.buybackList);
        }  else {
          console.log("error in get rest data")
          this.buybackList = null;
        }
      },
      error => {
        console.log("error in get rest data")
      }
    );
  }
}
