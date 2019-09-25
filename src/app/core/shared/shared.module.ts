import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { SafePipe } from './safe.pipe';



@NgModule({
  declarations: [SafePipe ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    FormsModule
  ],
  exports :[
    CommonModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    SafePipe
  ]
})
export class SharedModule { }
