import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/pages/services/auth.service';
import {AuthStateService} from '../services/auth-state.service';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordTypeInput  =  'password';
  loginForm: FormGroup;
  errors = null;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private jwtService: AuthService,
    public authService: AuthStateService,
    private token: TokenService,

  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.jwtService.login(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
      },
      (error) => {
        this.errors = error.error;
        console.log(error);
        Swal.fire(
          'Login rechazado',
          'Usuario y/o contraseña incorretos',
          'error'
        );
      },
      () => {
        this.authService.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['home']);
      }
    );
  }
  // Handle response
  responseHandler(jwt: { access_token: string }) {
    console.log(jwt.access_token);
    this.token.handleData(jwt.access_token);
  }
  ngOnInit() {

  }

}
