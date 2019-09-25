import { Component, OnInit, Input } from '@angular/core';
import { FundDetail } from 'src/app/core/models/fund-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/user/auth.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/core/services/cart.service';
@Component({
  selector: 'app-fund-compact',
  templateUrl: './fund-compact.component.html',
  styleUrls: ['./fund-compact.component.css']
})
export class FundCompactComponent implements OnInit {
  @Input() fundDetail: FundDetail;
  amountAlreadyInvested:number =0;
  userRole:number=25;
  daysLeft: number=0;
  constructor(private router : Router, private sanitizer: DomSanitizer,private route: ActivatedRoute, private http : HttpService , private cartService : CartService,private authService :AuthService) { }
  trustedUrl : SafeUrl;
  tempurl="";
  ngOnInit() {
    this.userRole=this.authService.getRole();
    this.tempurl="https://images.pexels.com/photos/2933265/pexels-photo-2933265.jpeg?cs=srgb&dl=action-adult-bike-2933265.jpg&fm=jpg";
    if(this.fundDetail.fundMedias!=null){
      this.fundDetail.fundMedias.forEach(
        element => {
          if (!element.file_location.toString().includes("youtube")) {
             this.tempurl = element.file_location.toString();
          }
        }
      );
    }
   
    
    if (this.userRole==1){
      this.amountAlreadyInvested =this.authService.amountInvestedInInvestment(this.fundDetail.id,'F');

     
     
      
      //this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(tempurl);
      //console.log(this.trustedUrl.toString);
      console.log(this.fundDetail)
    }
    let myDate= new Date();
    let endDate = new Date(this.fundDetail.end_date);
    let diffc:number=0;
    diffc = endDate.getTime() - myDate.getTime();
    this.daysLeft = Math.round(Math.abs(diffc/(1000*60*60*24)));  
  }

}
