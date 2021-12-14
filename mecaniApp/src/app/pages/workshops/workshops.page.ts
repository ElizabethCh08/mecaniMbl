import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import {SolicitudService} from '../services/solicitud/solicitud.service';
import { HttpClient } from '@angular/common/http';

export interface Mecanica {
  id:number;
  name: string;
  address: string;
  phone: string;
  location:string;
  open_hour: string;
  close_hour: string;
  services: string;
  facebook: string;
  instagram: string;
  certificate: string;
  state: string;
}

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.page.html',
  styleUrls: ['./workshops.page.scss'],
})
export class WorkshopsPage implements OnInit {
  mecanica: Mecanica[]=[];
  dataSource: any;
  servicios: string[] = [];
  image!: string;
  certificate!: string;
  err: any;
  constructor(
    public solicitudService: SolicitudService,
    public router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient

  ) {
    this.solicitudService.approvedA().subscribe((data) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      data.map((data: any) => {
        this.mecanica.push(data);
        this.dataSource = this.mecanica;
        console.log(this.dataSource);
      });
    });
  }
  view(e: any): void {
    this.solicitudService.viewRequest(e.id).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.err = error.error;
      },
      () => {
        this.router.navigate([`taller/${e.id}`]);
      }
    );
  }

  ngOnInit() {
  }

}
