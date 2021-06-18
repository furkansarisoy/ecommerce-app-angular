import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/libs/models/person';
import { AuthenticationService } from 'src/app/libs/services/authentication/authentication.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  profileSettingsForm: FormGroup;
  activePerson: Person;
  activePersonId: string;
  profileImageModalVisible = false;
  profileImage: string;

  constructor(
    private formBuilder: FormBuilder,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private angularFireStore: AngularFirestore
  ) {
    this.angularFireAuth.authState.subscribe(state => {
      if (state?.uid) {
        this.getPersonCredentials(state.uid);
        this.activePersonId = state.uid;
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  getPersonCredentials(id: string) {
    this.authService.getActivePersonCredentialsById(id).subscribe(person => {
      if (person) {
        this.activePerson = person;
        this.buildForm();
      }
    });
  }

  buildForm() {
    this.profileSettingsForm = this.formBuilder.group({
      'name': [this.activePerson?.name, Validators.required],
      'surname': [this.activePerson?.surname, Validators.required],
    });
  }

  formSubmit() {
    const userRef = this.angularFireStore.collection('users').doc(this.activePersonId);
    if (this.profileSettingsForm.valid) {
      userRef.update({
        ...this.profileSettingsForm.value
      }).then(() => console.log('success'));
    }
  }

  showProfileImageModal() {
    this.profileImageModalVisible = true;
    this.profileImage = this.activePerson.profileImage;
  }

  handleProfileImageModalCancel() {
    this.profileImageModalVisible = false;
  }

  onProfileImageChange() {
    const userRef = this.angularFireStore.collection('users').doc(this.activePersonId);
    userRef.update({
      profileImage: this.profileImage
    }).then(() => console.log('success'));
    this.handleProfileImageModalCancel();
  }

}
