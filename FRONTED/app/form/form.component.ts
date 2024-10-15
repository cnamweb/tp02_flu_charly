import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  // Current form values
  lastname: string = "";
  firstname: string = "";
  adress: string = ""; 
  zip: string = "";
  city: string = "";
  phone: string = "";
  email: string = "";
  civility: string = "";
  login: string = "";
  password: string = "";
  confirmPassword: string = "";

  // Store the last successful submission
  submittedData: any = null;

  passwordSame: boolean = true;
  inscriptionDone: boolean = false;

  keyupConfirmPassword() {
    this.passwordSame = this.password === this.confirmPassword || this.confirmPassword === "";
  }

  submit(form: NgForm) {
    if (form.valid) {
      if (this.password !== this.confirmPassword) {
        this.passwordSame = false;
        return;
      }
      
      // Store the submitted data
      this.submittedData = {
        lastname: this.lastname,
        firstname: this.firstname,
        civility: this.civility,
        email: this.email,
        phone: this.phone,
        adress: this.adress,
        zip: this.zip,
        city: this.city,
        login: this.login
      };

      // Show confirmation
      this.inscriptionDone = true;

      // Reset form fields
      form.resetForm(); 
      
      // Reset the password validation flag
      this.passwordSame = true;
    } else {
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.log('Form is invalid');
    }
  }
}
