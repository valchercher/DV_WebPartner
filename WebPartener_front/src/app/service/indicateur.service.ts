import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Indicateur, Pallier, Quali, Quanti, Response } from '../interface/indiacteur';

@Injectable({
  providedIn: 'root'
})
export class IndicateurService {

  constructor(private _http:HttpClient) { }
  all():Observable<Response<Indicateur>>
  {
    return this._http.get<Response<Indicateur>>(`${environment.api}index/indicateur`);
  }
  // .pipe(
  //   map((response:any )=>response.data)
  // )
  storePallier(data:Pallier):Observable<Response<Pallier>>{
    return this._http.post<Response<Pallier>>(`${environment.api}create/pallier`,data)
  }
  storeQuanti(data:Quanti):Observable<Response<Quanti>>{
    return this._http.post<Response<Quanti>>(`${environment.api}create/quanti`,data)
  }
  storeQuali(data:Quanti):Observable<Response<Quali>>{
    return this._http.post<Response<Quali>>(`${environment.api}create/quali`,data)
  }
  updateQuanti(data:Quanti,id:number):Observable<Response<Indicateur>>{
    return this._http.put<Response<Indicateur>>(`${environment.api}update/quanti/${id}`,data)
  }
  updateQuali(data:Quali,id:number):Observable<Response<Quali>>{
    return this._http.put<Response<Quali>>(`${environment.api}update/quali/${id}`,data)
  }
  updatePallier(data:Pallier,id:number):Observable<Response<Pallier>>{
    return this._http.put<Response<Pallier>>(`${environment.api}update/pallier/${id}`,data)
  }
}
