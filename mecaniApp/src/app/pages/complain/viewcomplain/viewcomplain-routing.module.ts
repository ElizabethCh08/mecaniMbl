import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewcomplainPage } from './viewcomplain.page';

const routes: Routes = [
  {
    path: '',
    component: ViewcomplainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewcomplainPageRoutingModule {}
