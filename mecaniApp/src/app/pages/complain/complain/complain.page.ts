import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import {SolicitudService} from "../../services/solicitud/solicitud.service";
import { HttpClient } from '@angular/common/http';
import {Mecanica} from "../../workshops/workshops.page";
import {ComplainService} from "../../services/complain/complain.service";
import {
  FormArray,
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import {PromocionService} from "../../services/promocion/promocion.service";
import {AuthService, User} from "../../services/auth.service";
import {ConfirmedValidator} from "../../signup/signup.page";

@Component({
  selector: 'app-complain',
  templateUrl: './complain.page.html',
  styleUrls: ['./complain.page.scss'],
})
export class ComplainPage implements OnInit {
  user: User;
  mecanica: Mecanica[]=[];
  dataSource: any;
  complainForm: FormGroup;
  err: any;
  UserId:number;
  queja={
    "mech_id": 0,
    "user_id": 0,
    "description":'',
    "title":'',
  }

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public promocionService: PromocionService,
    public solicitudService: SolicitudService,
    public router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private quejaService: ComplainService
  ) {
    this.solicitudService.approvedA().subscribe((data) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      data.map((data: any) => {
        this.mecanica.push(data);
        this.dataSource = this.mecanica;
        console.log(this.dataSource);
      });
    });
    this.authService.profileUser().subscribe((data: any) => {
     this.user=data;
    });
    this.complainForm= this.fb.group({
      mech_id: ['',[Validators.required,]],
      user_id: [''],
      title: [' ',[Validators.required,this.noWhitespaceValidator]],
      description: [' ',[Validators.required,this.noWhitespaceValidator]]});
  }

  ngOnInit() {
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  onSubmit(userId:number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Su queja será notificada',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.quejaService.crearQueja(this.complainForm.value,this.user.id).subscribe(
          (res) => {
            Swal.fire(
              'Queja Ingresada',
              'Nos pondremos en contacto inmediatamente',
              'success'
            )
          },
          (error) => {
            this.err = error.error;
            console.log(this.err)
            Swal.fire(
              'Error de ingreso',
              'Error:'+this.err.toString(),
              'error'
            )
          },
          () => {
            this.complainForm.reset();
            this.router.navigate(['suggestions']);
          }
        )
      }
    })
  }

}
