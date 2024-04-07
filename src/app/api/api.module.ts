import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ApiComponent } from './views/home/api-view';
import { ApiRoutingModule } from './api-routing.module';
import { ApiHistoricoComponent } from './views/historic/api-historico';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    ApiRoutingModule,
    HttpClientModule,
  ],
  declarations: [ApiComponent,ApiHistoricoComponent]
})
export class ApiModule {}
