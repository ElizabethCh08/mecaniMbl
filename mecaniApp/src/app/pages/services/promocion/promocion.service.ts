import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Promocion {
  mech_id:number;
  title: string;
  description: string;
  image: string;
  state:string;

}

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  user_id:number=0;
  baseUrl = 'https://fast-wildwood-05309.herokuapp.com/api/promocion';
  baseUrl2 = 'https://fast-wildwood-05309.herokuapp.com/api';
  constructor(private http: HttpClient) { }
  // Activar promocion
  activePromocion(promocion: any): Observable<any> {
    return this.http.put(this.baseUrl + '/active/' + promocion, promocion);
  }

  activedPromocion(id:number): Observable<any> {
    return this.http.get(this.baseUrl + 's/actived/'+id);
  }
  // Inactivar promocion
  inactivePromocion(promocion: any): Observable<any> {
    return this.http.put(this.baseUrl + '/inactive/' + promocion, promocion);
  }
  // Inactivos
  inactivedPromocion(id:number): Observable<any> {
    return this.http.get(this.baseUrl + 's/inactived/'+id);
  }

  //Ordenes
  orderCreate(orden: any): Observable<any> {
    console.log(orden)
    return this.http.post(this.baseUrl2 + '/orden', orden);
  }
  orderAll(id: number): Observable<any> {
    // @ts-ignore
    return this.http.get(this.baseUrl2 + '/orden/'+id, id);
  }
}
