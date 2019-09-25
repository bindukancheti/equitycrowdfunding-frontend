import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SharedModule } from '../core/shared/shared.module';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { CartComponent } from './components/cart/cart.component';
import { UserInvestmentsComponent } from './components/user-investments/user-investments.component';
import { ProjectModule } from '../project/project.module';
import { MyCampaignsComponent } from '../project/components/my-campaigns/my-campaigns.component';
import { FundRaiserHomeComponent } from '../project/components/fund-raiser-home/fund-raiser-home.component';
import { SellComponent } from './components/sell/sell.component';



@NgModule({
  imports: [
    SharedModule,
    ProjectModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: UserhomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'myinvestments', component: UserInvestmentsComponent },
      { path: 'fundRaiserHome', component: FundRaiserHomeComponent }
      
    ])
  ],
  declarations: [
    
    LoginComponent,
    UserhomeComponent,
    CartComponent,
    UserInvestmentsComponent,
    SellComponent
  ]
})

export class UserModule { }
