import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/libs/services/authentication/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      mail: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const mail = this.resetPasswordForm.value.mail;
      this.authService.resetPassword(mail);
    } else {
      console.log('Form Valid Değil');
    }
  }

}
