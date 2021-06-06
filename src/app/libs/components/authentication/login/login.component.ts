import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/libs/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
  ) {
    this.subscribeToLoadingState();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.required],
      password: ['', Validators.required]
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
    if (this.loginForm.valid) {
      const mail = this.loginForm.value.mail;
      const password = this.loginForm.value.password;
      this.authService.login(mail, password);
    } else {
      console.log('Form Valid Değil');
    }
  }

}
