import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampaignListComponent } from './project/components/campaign-list/campaign-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProjectModule } from './project/project.module';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './core/shared/shared.module';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AboutUsComponent,
    
  ],
  imports: [
    BrowserModule,
    ProjectModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
