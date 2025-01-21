import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,

  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  private router = inject(Router);
  private userService = inject(UserService);

  isEqual: boolean = false;

  // Reactive Form:
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/)]),
    ripetiPassword: new FormControl('', [Validators.required]),
    accetto: new FormControl(false, [Validators.requiredTrue])
  })

  onSubmit() {
    console.log(this.form.value);
    const dati = {name: this.form.controls.name.value, email: this.form.controls.email.value};
    this.userService.datiUtente.next(dati);
    this.userService.saveUser(this.form.value).subscribe({
      next: (response) => {
        console.log("utente aggiunto", response),
        this.router.navigateByUrl('home');
      },
      error: (e) => console.log(e)
    });
    // Rimandiamo l'utente alla pagina principale
    // this.router.navigate(['home]);
  }

  comparaPassword(e) {
    if (this.form.value.password === e){
      this.isEqual = true;
    } else {
      this.isEqual = false;
    }
  }

  /* Password matching preso da LabTV:
  matchPassword(controlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const confirmPassword = control.root.get(controlName)?.value;

      return password === confirmPassword ? null : { mismatch: true };
    };
  }
  */

  /*  Template Driven:
  onSubmit(form) {
    console.log(form);
  }
  */

}
