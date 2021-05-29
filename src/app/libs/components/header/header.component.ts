import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMenuItemClick(url) {
    if (url) {
      this.router.navigate([url]);
    }
  }

}
