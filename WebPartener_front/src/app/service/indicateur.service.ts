import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Indicateur, Response } from '../interface/indiacteur';

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
}
