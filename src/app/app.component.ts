import { Component } from '@angular/core';
import { NavLinks } from './core/models/nav-links';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'equitycrowdfunding';
 
  navLinks : NavLinks[] = [
    {label : "List of Active Campaigns" , path : "campaignlist"},
    {label : "List of Funds" , path : "welcome"}
  ]


}


