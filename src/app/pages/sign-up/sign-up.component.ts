import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  generi: string[] = ['uomo', 'donna', 'altro'];

  form!: FormGroup;
  constructor(private formB: FormBuilder) {}

  ngOnInit() {
    this.form = this.formB.group({
      nome: this.formB.control('', [Validators.required]),
      cognome: this.formB.control('', [Validators.required]),
      username: this.formB.control(''),
      authData: this.formB.group({
        password: this.formB.control('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confermaPassword: this.formB.control('', [
          Validators.required,
          this.confermaPass,
        ]),
      }),
      genere: this.formB.control(''),
      image: this.formB.control(''),
      biografia: this.formB.control(''),
    });
  }
  confermaPass = () => {
    if (this.form) {
      if (
        this.form.get('authData.password')?.value ===
        this.form.get('authData.confermaPassword')?.value
      ) {
        return null;
      } else {
        console.log('Le password non coincidono');
        return { message: 'Le password non coincidono' };
      }
    }
    return null;
  };
  getMessage(fieldName: string) {
    return this.form.get(fieldName)?.errors!['message'];
  }
}
