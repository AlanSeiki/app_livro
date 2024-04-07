import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiComponent } from './views/home/api-view';
import { ApiHistoricoComponent } from './views/historic/api-historico';

const routes: Routes = [
  {
    path: '',
    component: ApiComponent
  },
  {
    path: 'historico',
    component: ApiHistoricoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiRoutingModule {}