import { Component, OnInit } from '@angular/core';
import {Mecanica} from '../workshops/workshops.page';
import {AuthStateService} from '../services/auth-state.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../services/token.service';
import {AuthService} from '../services/auth.service';
import {SolicitudService} from '../services/solicitud/solicitud.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  role!: string;
  approvedMech = false;
  state='';
  mecanica: Mecanica[] = [];
  dataSource: any;
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,
    public solicitudService: SolicitudService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {
    this.authService.profileUser().subscribe(
      (data: any) => {
        this.role = data.role;
        console.log(this.role)
      },
      (err) => {
        this.auth.setAuthState(false);
        this.token.removeToken();
        this.router.navigate(['login']);
      },
      () => {
      }
    );
  }

  ngOnInit() {
  }

  // Cerrar sesion
  logOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}
