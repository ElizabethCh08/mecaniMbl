import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewcomplainPageRoutingModule } from './viewcomplain-routing.module';

import { ViewcomplainPage } from './viewcomplain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewcomplainPageRoutingModule
  ],
  declarations: [ViewcomplainPage]
})
export class ViewcomplainPageModule {}
