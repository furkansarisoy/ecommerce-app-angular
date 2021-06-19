import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Gender } from '../../models/product';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FEMALE_OPTIONS, MALE_OPTIONS, PersonalizedOptions } from './personalized-filter';
import { sortedUniq } from 'lodash';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-personalized-filter',
  templateUrl: './personalized-filter.component.html',
  styleUrls: ['./personalized-filter.component.scss']
})
export class PersonalizedFilterComponent implements OnInit {

  options: PersonalizedOptions[];
  selectedOptions: PersonalizedOptions[] = [];

  activePersonId: string;
  isLoading = false;
  Gender = Gender;
  subscriptions: Subscription[];

  constructor(
    private angularFireAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private angularFireStore: AngularFirestore,
    private router: Router,
    private nzNotificationService: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscriptions = [
      this.subscribeToActivePerson(),
    ]
  }

  subscribeToActivePerson() {
    return this.angularFireAuth.authState.subscribe(state => {
      if (state) {
        this.subscribeToActivePersonCredentials(state.uid);
        this.activePersonId = state.uid;
      }
    });
  }

  subscribeToActivePersonCredentials(uid: string) {
    return this.authService.getActivePersonCredentialsById(uid).subscribe(person => {
      if (person) {
        this.setOptions(person.gender);
      }
    });
  }

  setOptions(gender: string) {
    if (gender === Gender.Male) {
      this.options = MALE_OPTIONS;
    }
    if (gender === Gender.Female) {
      this.options = FEMALE_OPTIONS;
    }
    this.isLoading = false;

  }

  onOptionSelect(option) {
    const isExist = this.isSelected(option);
    if (isExist) {
      this.selectedOptions = this.selectedOptions.filter(selectedOption => selectedOption.key !== option.key);
    } else {
      this.selectedOptions.push(option);
    }
  }

  isSelected(option): boolean {
    const isExist = this.selectedOptions.some(selectedOption => selectedOption.key === option.key);
    if (isExist) {
      return true;
    } else {
      return false;
    }
  }

  onSave() {
    const userRef = this.angularFireStore.collection('users').doc(this.activePersonId);
    const selectedTags = this.selectedOptions.map(option => option.tags);
    // remove duplicated tags
    const tags = sortedUniq(selectedTags);
    if (userRef) {
      userRef.update({
        personalizedTags: [
          ...tags.flat()
        ]
      }).then(() => {
        this.nzNotificationService.success('Kişiselleştirme başarılı!', 'Kişiselleştirme başarı ile tamamlandı.', { nzPlacement: 'bottomRight' });
        this.router.navigate(['/homepage'])
      }).catch(error => {
        this.nzNotificationService.error('Hata!', 'Bir hata oluştu: ' + error, { nzPlacement: 'bottomRight' });
      });
    }
  }

  onSkip() {
    this.router.navigate(['/homepage']);
  }

}
