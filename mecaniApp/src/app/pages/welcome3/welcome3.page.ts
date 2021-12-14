import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import {SolicitudService} from '../services/solicitud/solicitud.service';
import { HttpClient } from '@angular/common/http';
import {Mecanica} from '../workshops/workshops.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-welcome3',
  templateUrl: './welcome3.page.html',
  styleUrls: ['./welcome3.page.scss'],
})
export class Welcome3Page implements OnInit {
  labelOptions = {
    color: '#ee4646',
    fontFamily: '',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing:'0.5px',
    text: 'Plan Pagado/No pagado'
  };
  mecanica: Mecanica[]=[];
  mecanicaName: Mecanica[]=[];
  dataSource: any;
  servicios: string[] = [];
  image!: string;
  certificate!: string;
  err: any;
  lat= 5;
  long=7.7;
  zoom = 13;
  icon='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
   constructor(
    private geolocation: Geolocation,
    public solicitudService: SolicitudService,
    public router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.long=resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.solicitudService.approvedM().subscribe((data) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      data.map((data: any) => {
        // @ts-ignore
        this.mecanica.push(JSON.parse(data.location));
        this.mecanicaName.push(data.name);
        this.dataSource = this.mecanica;
        console.log(this.dataSource);
        console.log(this.mecanicaName)
      });
    });
  }

  ngOnInit() {
  }

}
