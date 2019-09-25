import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignDetailComponent } from './components/campaign-detail/campaign-detail.component';
import { RouterModule } from '@angular/router';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { SharedModule } from '../core/shared/shared.module';
import { FundDetailComponent } from './components/fund-detail/fund-detail.component';
import { FundListComponent } from './components/fund-list/fund-list.component';
import { CampaignCompactComponent } from './components/campaign-compact/campaign-compact.component';
import { FundCompactComponent } from './components/fund-compact/fund-compact.component';

import { MyCampaignsComponent } from './components/my-campaigns/my-campaigns.component';
import { MyCampaignlistComponent } from './components/my-campaignlist/my-campaignlist.component';
import { FundRaiserHomeComponent } from './components/fund-raiser-home/fund-raiser-home.component';
import { BuybackListComponent } from './components/buyback-list/buyback-list.component';
import { BuybackDetailComponent } from './components/buyback-detail/buyback-detail.component';
import { BuybackCompactComponent } from './components/buyback-compact/buyback-compact.component';


@NgModule({
  declarations: [CampaignDetailComponent, CampaignListComponent, FundDetailComponent, FundListComponent, CampaignCompactComponent, FundCompactComponent, MyCampaignsComponent, MyCampaignlistComponent, FundRaiserHomeComponent,BuybackListComponent, BuybackDetailComponent, BuybackCompactComponent],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { 
        path: 'campaignlist',
        component: CampaignListComponent
      },
      { 
        path: 'campaignlist/:id',
        component: CampaignDetailComponent
      },
      { 
        path: 'fundlist',
        component: FundListComponent
      },
      { 
        path: 'fundlist/:id',
        component: FundDetailComponent
      },
      { 
        path: 'buybacklist',
        component: BuybackListComponent
      },
      { 
        path: 'buybacklist/:id',
        component: BuybackDetailComponent
      }

  ]) ,

  
  HttpClientModule 
 
  
],

exports :[CampaignDetailComponent, CampaignListComponent, FundDetailComponent, FundListComponent, BuybackDetailComponent, BuybackListComponent]
})
export class ProjectModule { }
