import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiInterface } from '../type/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://www.boredapi.com/api/activity?type=';

  constructor(
    private httpClient: HttpClient
  ) {}

  getBoredApi(tipo:string): Observable<ApiInterface[]> {
    return this.httpClient.get<ApiInterface[]>(this.url+tipo);
  }

  salvarHistorico(retorno:ApiInterface) {
    return this.httpClient.post('http://localhost:3000/api',retorno);
  }

  getHistorico(): Observable<ApiInterface[]> {
    return this.httpClient.get<ApiInterface[]>('http://localhost:3000/api');
  }
}
