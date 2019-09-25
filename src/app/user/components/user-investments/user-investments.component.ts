import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-investments',
  templateUrl: './user-investments.component.html',
  styleUrls: ['./user-investments.component.css']
})
export class UserInvestmentsComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }
  
  

}
