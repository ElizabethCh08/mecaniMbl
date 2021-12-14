import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export class User {
  id!: number;
  name!: String;
  last_name!: String;
  email!: String;
  role!: String;
  password = null;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  UserProfile!: User;
  userName:string;
  isLoading: boolean = true;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  profileForm: FormGroup;

  err = null;
  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    public router: Router
  ) {
    this.profileForm = this.fb.group({
      name: [' ',[Validators.required,Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator]],
      last_name: [' ',[Validators.required,Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator]],
      email: [' ',[Validators.required,Validators.email,]],
      password: new FormControl('', Validators.required),
    });
    this.authService.profileUser().subscribe((data: any) => {
      this.profileForm.controls['name'].setValue(data.name);
      this.profileForm.controls['last_name'].setValue(data.last_name);
      this.profileForm.controls['email'].setValue(data.email);
      this.UserProfile = data;
      // @ts-ignore
      this.userName=this.UserProfile.name
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  ngOnInit() {
  }
  onSubmit() {
    this.isLoading = true;
    Swal.fire({
      title: 'Esta seguro?',
      text: "Su información será actualizada",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.authService.updateUser(this.profileForm.value).subscribe(
          (res) => {
            console.log(res);
            Swal.fire(
              'Información actualizada',
              'Esta solicitud fue aceptada',
              'success'
            )
          },
          (error) => {
            console.log(error);
            this.err = error.error;
          },
          () => {
            window.location.reload();
          }
        );
      }else { window.location.reload();}

    })

  }

}
