import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export class Complain {
  id!:number;
  mech_id!:number;
  user_id!: number;
  description!: string;
  title!: string;
}
@Injectable({
  providedIn: 'root'
})
export class ComplainService {
  user_id=0;
  baseUrl = 'https://fast-wildwood-05309.herokuapp.com/api/queja';
  constructor(private http: HttpClient) { }
  // Enviar queja
  // @ts-ignore
  crearQueja(queja: Complain, userId:number): Observable<any> {
    queja.user_id=userId;
    queja.mech_id=parseInt(String(queja.mech_id));
    console.log(queja)
    return this.http.post(this.baseUrl, queja);
  }
  complainAll(id: number): Observable<any> {
    // @ts-ignore
    return this.http.get(this.baseUrl + '/'+id, id);
  }
}
