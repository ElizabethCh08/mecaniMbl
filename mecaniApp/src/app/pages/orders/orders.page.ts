import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {PromocionService} from "../services/promocion/promocion.service";
import {AuthService, User} from "../services/auth.service";
import { ActivatedRoute ,Router} from '@angular/router';
import {SolicitudService} from "../services/solicitud/solicitud.service";
import { HttpClient } from '@angular/common/http';
import {Mecanica} from "../workshops/workshops.page";
import {FormBuilder} from "@angular/forms";

export class Order {
  mech_id!: number;
  user_id!: number;
  id!: number;
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orden:Order[]=[];
  user: User;
  mecanica: Mecanica[]=[];
  namesMecanicas: string[]=[];
  x=0;

  constructor(
    public authService: AuthService,
    public promocionService: PromocionService,
    public solicitudService: SolicitudService,
    public router: Router,
    private http: HttpClient,
  ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.user=data;
      this.promocionService.orderAll(this.user.id).subscribe((data: any) => {
        this.orden=data;
        if(data.length===0){

        }
        this.x=data.length;
        for (let i = 0; i < this.x; i++) {
          this.solicitudService.tallerInfo(this.orden[i].mech_id).subscribe(
            ((data: Mecanica) => {
              this.mecanica[i]=data
              this.namesMecanicas[i]=this.mecanica[i][0].name
            })
          )
        }
      })
    });
  }
  ngOnInit() {
  }

}
