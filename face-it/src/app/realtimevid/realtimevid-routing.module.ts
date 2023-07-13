import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealtimevidPage } from './realtimevid.page';

const routes: Routes = [
  {
    path: '',
    component: RealtimevidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealtimevidPageRoutingModule {}
