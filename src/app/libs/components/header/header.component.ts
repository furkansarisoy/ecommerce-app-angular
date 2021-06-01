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
      url: 'categories'
    },
    {
      label: 'Erkek',
      url: 'categories'
    },
    {
      label: 'Saat & Aksesuar',
      url: 'categories'
    },
  ];

  HeaderType = HeaderType;

  activePerson;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthenticationService
  ) {
    this.angularFireAuth.authState.subscribe(person => {
      if (person) {
        this.activePerson = person;
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

  logOut() {
    this.authService.logOut();
  }

}
