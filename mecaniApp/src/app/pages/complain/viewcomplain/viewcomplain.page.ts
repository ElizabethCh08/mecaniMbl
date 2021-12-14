import { Component, OnInit } from '@angular/core';
import {PromocionService} from "../../services/promocion/promocion.service";
import {AuthService, User} from "../../services/auth.service";
import { ActivatedRoute ,Router} from '@angular/router';
import {SolicitudService} from "../../services/solicitud/solicitud.service";
import { HttpClient } from '@angular/common/http';
import {Mecanica} from "../../workshops/workshops.page";
import {Complain} from "../../services/complain/complain.service";
import {ComplainService} from "../../services/complain/complain.service";

@Component({
  selector: 'app-viewcomplain',
  templateUrl: './viewcomplain.page.html',
  styleUrls: ['./viewcomplain.page.scss'],
})
export class ViewcomplainPage implements OnInit {
  complain: Complain[]=[];
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
    public quejaService: ComplainService
  ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.user=data;
      this.quejaService.complainAll(this.user.id).subscribe((data: any) => {
        this.complain=data;
        this.x=data.length;
        console.log(this.complain)
        for (let i = 0; i < this.x; i++) {
          this.solicitudService.tallerInfo(this.complain[i].mech_id).subscribe(
            ((data: Mecanica) => {
              this.mecanica[i]=data
              this.namesMecanicas[i]=this.mecanica[i][0].name
            })
          )
          console.log(this.namesMecanicas)
        }
      })
    });
  }

  ngOnInit() {
  }

}
