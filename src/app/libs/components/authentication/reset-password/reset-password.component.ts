import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/libs/services/authentication/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  resetPasswordForm: FormGroup;
  isLoading = false;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
  ) {
    this.subscribeToLoadingState();
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      mail: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeToLoadingState() {
    this.subscription = this.authService.isLoading.subscribe(loadingState => {
      this.isLoading = loadingState;
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
