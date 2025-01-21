import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';
//  import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: false,

  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
//  private router = inject(Router);
  private messageService = inject(MessageService);

  isValid: boolean = false;

  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    oggetto: new FormControl('', [Validators.required]),
    messaggio: new FormControl('', [Validators.required])
  })

  onSubmit() {
    console.log(this.form.value);
    const dati = {email: this.form.controls.email.value, oggetto: this.form.controls.oggetto.value};
    this.messageService.datiMessaggio.next(dati);
  }

}
