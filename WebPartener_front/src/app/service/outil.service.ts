import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Objectif, OutilSemestre, RequestObjectif, RequestUser, Response, User } from '../interface/indiacteur';

@Injectable({
  providedIn: 'root'
})
export class OutilService {

  constructor() { }
  _http = inject(HttpClient)
  allOutil():Observable<Response<OutilSemestre>>
  {
    return this._http.get<Response<OutilSemestre>>(`${environment.api}index/outil`);
  }
  store(data:RequestObjectif):Observable<Response<Objectif>>
  {
    return this._http.post<Response<Objectif>>(`${environment.api}create/objectif`,data)
  }
  delete(id:number,annee:string):Observable<Response<Objectif>>
  {
    return this._http.delete<Response<Objectif>>(`${environment.api}delete/objectif/${id}/${annee}`)
  }
  storeUser(data:RequestUser):Observable<Response<User>>
  {
    return this._http.post<Response<User>>(`${environment.api}create/user`,data)
  }
}
