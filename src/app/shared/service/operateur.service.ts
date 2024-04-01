import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperateurService {

  constructor(private https: HttpClient) { }

  private apiGetOperateurById = environment.APIGETOPERATEURBYID;

  public GetOperateurById(operateurId:number){
    return this.https.get<any>(this.apiGetOperateurById + operateurId)
  }
}
