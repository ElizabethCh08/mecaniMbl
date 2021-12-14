import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SolicitudService} from '../services/solicitud/solicitud.service';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Mecanica} from '../workshops/workshops.page';
import {PromocionService} from "../services/promocion/promocion.service";
import {AuthService} from '../services/auth.service';
interface Solicitud {
  name: string;
  address: string;
  phone: string;
  image:string;
  location:string
  open_hour: string;
  close_hour: string;
  services: string;
  facebook: string;
  instagram: string;
  certificate: any;
}
export class Promocion {
  mech_id!:number;
  title!: string;
  description!: string;
  image!: any;
  state!:any;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Servicios {
  name: string;
}

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HirePage implements OnInit {
  mecanica: Solicitud;
  mecanicaForm: FormGroup;
  image='';
  mechNane='';
  certificate='';
  servicios: Servicios[]=[];
  promocion: Promocion[] = [];
  orden={
    "mech_id": 0,
    "user_id": 0,
  }
  dataSource: any;
  err: any;
  idM='';

  constructor(
    public authService: AuthService,
    public promocionService: PromocionService,
    public solicitudService: SolicitudService,
    private fb: FormBuilder,
    public router: Router,
    private activeRoute: ActivatedRoute
  )
  {
    this.authService.profileUser().subscribe((data: any) => {
      this.orden.user_id=data.id;
      this.orden.mech_id=parseInt(this.activeRoute.snapshot.params.id,10);
      console.log(this.orden)
    });
    this.solicitudService
      .tallerInfo(this.activeRoute.snapshot.params.id)

      .subscribe(data => {
        const result = JSON.parse(data[0].services);
        Object.values(result);
        this.mechNane=data[0].name;
        this.image=data[0].image;
        this.servicios = Object.values(result);
      });
    //Llama a las promociones activas
    this.promocionService.activedPromocion(this.activeRoute.snapshot.params.id).subscribe((data) => {
      data.map((data: any) => {
        this.promocion.push(data);
        this.dataSource = this.promocion;
      });
    });


    //this.mecanica = data;

    /* this.mecanica=data[0];
     this.servicios=JSON.parse(this.mecanica.services);
     this.mechNane=this.mecanica.name;
     this.image=this.mecanica.image;
     console.log(this.mecanica);
     // @ts-ignore
     console.log(this.servicios.length());*/
  }


  ngOnInit()
  {
  }
  async createOrder(){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Su solicitud de orden será enviada al taller mecánico",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.promocionService.orderCreate(this.orden).subscribe(
          (res) => {
            Swal.fire(
              'Solicitud recibida',
              'El taller mecánico se pondrá en contacto contigo',
              'success'
            )
            console.log(res);
          },
          (error) => {
            console.log(error);
            this.err = error.error;
          },
          () => {
            this.router.navigate(['workshops']);
          }
        );
      }else { window.location.reload();}

    })

  }

}
