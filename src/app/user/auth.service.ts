import { Injectable } from '@angular/core';
import { User } from '../core/models/user';
import { HttpService } from '../core/services/http.service';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }
  setCurrentUser(user: User) {
    this.currentUser = user;
  }
  getCurrentUser(): User {
    return this.currentUser;
  }

  constructor(private http: HttpService) { }



  login(userName: string, password: string): Observable<any> {
    console.log("auth service hit")
    if (true) {
      var body = {
        "email": userName,
        "password": password
      }
      var url: string = "getUser"
      return this.http.postRestData(url, body);
    }
    // call login service.
    //check username
    // this.currentUser = {
    //   "id": 2,
    //   "email": "kumar.avinash@principal.com",
    //   "name": "Avinash Kuamr Real",
    //   "social_connect": "sdfsdcsdsd,sdvsdvsdv,sdvsdvsdv",
    //   "description": "25 din mai paisa double",
    //   "role": 1,
    //   "company_name": "PaisaDouble.com",
    //   "password": "avinashkumarreal",
    //   "annual_income": 0,
    //   "other_startup_investments": 0,
    //   "company_category": null,
    //   "userInvestOnCampaignDetails": [
    //     {
    //       "campaign_id": 2,
    //       "amount": 500,
    //       "is_active": true,
    //       "start_date": "2018-01-01",
    //       "end_date": "2020-01-01"
    //     },
    //     {
    //       "campaign_id": 3,
    //       "amount": 500,
    //       "is_active": true,
    //       "start_date": "2018-01-01",
    //       "end_date": "2019-12-12"
    //     }
    //   ],
    //   "userInvestOnFundDetails": [
    //     {
    //       "fund_id": 1,
    //       "amount": 500,
    //       "is_active": true,
    //       "start_date": "2018-01-01",
    //       "end_date": "2019-12-12"
    //     },
    //     {
    //       "fund_id": 2,
    //       "amount": 400,
    //       "is_active": true,
    //       "start_date": "2018-05-09",
    //       "end_date": "2020-01-01"
    //     }
    //   ]
    // };


  }


  updateUserInformation() {
    this.login(this.currentUser.email, this.currentUser.password).subscribe(
      userResponse => {
        let user: any = JSON.parse((userResponse.body));
        if (userResponse.status == 200) {
          console.log('login succesful');
          this.setCurrentUser(user);
          if (this.currentUser.role == 1) {
            // Navigate to the investor home page after log in as investor.
            console.log('user role 1 - investor in as investor')
          }
          else if (this.currentUser.role == 2) {
            //Navigate to the fund raiser home page after log in as Raiser.
            console.log('user role 2- fund raiser  in as Raiser ')
          }
          else if (this.currentUser.role == 0) {
            // Navigate to the fund manager home page after log in as F.m.
            console.log('user role 0 - fund manager in as F.m.')
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

  logout(): void {
    this.currentUser = null;
  }

  getRole(): number {
    return this.currentUser != null ? this.currentUser.role : 25;
  }

  isInvestmentMadeByUser(investmentId, investmentType) {
    if (investmentType == 'I') {
      var campaignInvestedByuser = false;
      this.currentUser.userInvestOnCampaignDetails.forEach(element => {
        if (investmentId == element.campaign_id) {
          campaignInvestedByuser = true;
        }
      });

      return campaignInvestedByuser;
    }
    else if (investmentType == 'F') {
      var fundInvestedByuser = false;
      this.currentUser.userInvestOnFundDetails.forEach(element => {
        if (investmentId == element.fund_id) {
          fundInvestedByuser = true;
        }
      });
      return fundInvestedByuser;
    }
    else {
      return false;
    }

  }

  amountInvestedInInvestment(investmentId, investmentType): number {
    var amount = 0;
    if (this.currentUser != null) {
      if (this.isInvestmentMadeByUser(investmentId, investmentType)) {
        if (investmentType == 'I') {
          this.currentUser.userInvestOnCampaignDetails.forEach(element => {
            if (investmentId == element.campaign_id) {
              amount = element.amount;
            }
          });
        }
        else if (investmentType == 'F') {
             this.currentUser.userInvestOnFundDetails.forEach(element => {
            if (investmentId == element.fund_id) {
              amount = element.amount;
            }
          });

        }
        else {
          amount = 0;
        }
      };
    }
    return amount;
  }
}

