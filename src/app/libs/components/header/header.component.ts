import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

export enum HeaderType {
  User = 'user',
  Admin = 'admin'
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() type: HeaderType;

  menuItems = [
    {
      label: 'Ana Sayfa',
      url: 'homepage'
    },
    {
      label: 'Kadın',
      url: 'categories/female'
    },
    {
      label: 'Erkek',
      url: 'categories/male'
    }
  ];

  HeaderType = HeaderType;

  activePerson;
  isAdmin: boolean;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthenticationService
  ) {
    this.angularFireAuth.authState.subscribe(person => {
      if (person) {
        this.activePerson = person;
        this.checkUserRole();
      } else {
        this.activePerson = person;
      }
    });
  }

  ngOnInit(): void {
  }

  onMenuItemClick(url) {
    if (url) {
      this.router.navigate([url]);
    }
  }

  checkUserRole() {
    this.authService.getActivePersonCredentialsById(this.activePerson.uid).subscribe(person => {
      if (person?.isAdmin) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  logOut() {
    this.authService.logOut();
  }

}
