import { Component, OnInit } from '@angular/core';
import { AlertService } from '@services';
import { ApiService } from '../../service/api.service';
import { ApiInterface } from '../../type/api.interface';

@Component({
    selector: 'app-api',
    templateUrl: './api-historico.html',
})
export class ApiHistoricoComponent
    implements OnInit {

    historicos: ApiInterface[] = [];

    constructor(
        private alertService: AlertService,
        private boredApi: ApiService,
    ) {

    }

    ngOnInit() {
        const observable = this.boredApi.getHistorico();
        observable.subscribe(
            (dados) => {
                this.historicos = dados;
            },
            (erro) => {
                console.error(erro);
                this.alertService.error('Erro ao tentar acessar o Histórico');
            }
        );
    }

}
