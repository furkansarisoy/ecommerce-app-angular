import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/libs/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  isLoading = false;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
  ) {
    this.subscribeToLoadingState();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
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
    if (this.registerForm.valid) {
      const password = this.registerForm.value.password;
      delete this.registerForm.value.password;
      const credential = this.registerForm.value;
      this.authService.register(credential, password)
    } else {
      console.log('Form Valid Değil');
    }
  }

}
