import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import {SolicitudService} from '../services/solicitud/solicitud.service';
import { HttpClient } from '@angular/common/http';
import {Mecanica} from '../workshops/workshops.page';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  options: GeolocationOptions;
  currentPos: Geoposition;
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
    this.solicitudService.approvedA().subscribe((data) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      data.map((data: any) => {
        this.mecanica.push(JSON.parse(data.location));
        this.mecanicaName.push(data.name);
        this.dataSource = this.mecanica;
        console.log(this.mecanicaName);
      });
    });
  }

  getUserPosition() {
    return new Promise((resolve, reject) => {
    this.options = {
      maximumAge: 3000,
      enableHighAccuracy: true
    };
   
    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
    this.currentPos = pos;
    const location = {
       lat: pos.coords.latitude,
       lng: pos.coords.longitude,
       time: new Date(),
     };
    console.log('loc', location);
    resolve(pos);
   }, (err: PositionError) => {
     console.log("error : " + err.message);
     reject(err.message);
    });
   });
  }

  ngOnInit() {
  }

}
