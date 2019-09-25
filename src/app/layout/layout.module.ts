import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { LoginComponent } from '../user/login.component';
import { SharedModule } from '../core/shared/shared.module';
import { UserModule } from '../user/user.module';





@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserModule,
    RouterModule.forChild([
      // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: MainPageComponent },
      { path: 'login', component: LoginComponent },
      
      
    ], )
  ] ,
  exports : [HeaderComponent, FooterComponent,RouterModule]
})
export class LayoutModule { }

