import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';
import { TokenService} from '../services/token.service';
import Swal from 'sweetalert2';
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  err = null;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    private token: TokenService
  ) {
    this.signupForm= this.fb.group({
      name: [' ',[Validators.required, this.noWhitespaceValidator]],
      role: ['ciudadano',[Validators.required]],
      last_name: [' ',[Validators.required,this.noWhitespaceValidator]],
      email: [' ',[Validators.required,Validators.email,]],
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required)
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  onSubmit() {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Su registro será aprobado automáticamente',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.authService.register(this.signupForm.value).subscribe(
          (res) => {
            Swal.fire(
              'Usuario registrado',
              'Por favor puede iniciar sesión, con las credenciales registradas',
              'success'
            )
          },
          (error) => {
            this.err = error.error;
            console.log(this.err)
            Swal.fire(
              'Error de registro',
              'Error:'+this.err.toString(),
              'error'
            )
          },
          () => {
            this.signupForm.reset();
            this.router.navigate(['login']);
          }
        );
      }
    })

  }
  ngOnInit() {
  }

}
