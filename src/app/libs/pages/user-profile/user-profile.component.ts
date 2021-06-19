import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { Person } from '../../models/person';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  activePerson: Person;

  constructor(
    private authService: AuthenticationService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.authState.subscribe(state => {
      if (state.uid) {
        this.getActivePersonCredentials(state.uid);
      }
    });
  }

  ngOnInit(): void {
  }

  getActivePersonCredentials(id: string) {
    this.authService.getActivePersonCredentialsById(id).subscribe(person => {
      this.activePerson = person;
    });
  }

}
