import { Component, OnInit } from '@angular/core';
import { LoadingController  } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertService } from '@services';
import { ApiService } from '../../service/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
})
export class ApiComponent
  implements OnInit {
  tipos = [
    {id:1, tipo: "education", descricao: 'Educação'}, 
    {id:2, tipo: "recreational", descricao: "Recreativo"}, 
    {id:3, tipo: "social", descricao: "Social"}, 
    {id:4, tipo: "diy", descricao: "Faça você mesmo"}, 
    {id:5, tipo: "charity", descricao: "Caridade"}, 
    {id:6, tipo: "cooking", descricao: "Culinária"}, 
    {id:7, tipo: "relaxation", descricao: "Relaxamento"}, 
    {id:8, tipo: "music", descricao: "Música"}, 
    {id:9, tipo: "busywork", descricao: "Trabalho agitado"}
  ];

  apiForm = new FormGroup({
    tema: new FormControl('education',Validators.required),
  });
  tema: string = '';
  retornoApi: any;

  constructor(
    private loadingController: LoadingController,
    private alertService: AlertService,
    private boredApi: ApiService,
    private http: HttpClient
  ) { 
    
  }

  ngOnInit() {

  }

 traduziActivity(dados: any) {
    const url = `https://api.mymemory.translated.net/get?q=${dados.activity}&langpair=en|pt`; // Traduz de inglês para português

    return this.http.get(url).subscribe((response: any) => {
      if (response && response.responseData && response.responseData.translatedText) {
        this.retornoApi = dados;
        this.retornoApi.activity = response.responseData.translatedText;
        const tipoEncontrado = this.tipos.find(tipo => tipo.tipo === this.retornoApi.type);
        this.retornoApi.type = tipoEncontrado ? tipoEncontrado.descricao : '';
        this.salvarHistorico();
        return true;
      }
      return true;
    });
  }

  salvarHistorico() {
    this.boredApi.salvarHistorico(this.retornoApi).subscribe(
      () => console.log('HistoricoSalvo'),
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao salvar historico');
      }
    );
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    this.tema = this.apiForm.value.tema ? this.apiForm.value.tema : '';
    const observable = this.boredApi.getBoredApi(this.tema);
    observable.subscribe(
      (dados) => {
        if (this.traduziActivity(dados)){
          loading.dismiss();
        } else {
          this.alertService.error('Erro ao tentar traduzir a API');
        };
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao tentar consumir a API');
      }
    );
  }
 
}
