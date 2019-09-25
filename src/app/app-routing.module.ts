import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { AboutUsComponent } from './about-us/about-us.component';



const routes: Routes = [

  
];

@NgModule({
  imports: [
    RouterModule.forRoot([
       { path: '', redirectTo: 'welcome', pathMatch: 'full' },
       { path: 'welcome', component: MainPageComponent },
       { path: 'aboutUs', component: AboutUsComponent },
    ], )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
