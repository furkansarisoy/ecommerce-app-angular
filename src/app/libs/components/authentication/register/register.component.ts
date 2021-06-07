import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selectedGender: string;

  genderOptions = [
    {
      key: 'Erkek',
      value: 'male'
    },
    {
      key: 'Kadın',
      value: 'female'
    }
  ];

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

  onGenderSelect(value) {
    this.registerForm.removeControl('gender');
    this.registerForm.addControl('gender', new FormControl(value, Validators.required));
    this.selectedGender = value;
  }

  onSubmit() {
    if (this.registerForm.valid && !(this.selectedGender == null)) {
      const password = this.registerForm.value.password;
      delete this.registerForm.value.password;
      const credential = this.registerForm.value;
      this.authService.register(credential, password)
    } else {
      console.log('Form Valid Değil');
      console.log(this.selectedGender);
    }
  }

}
