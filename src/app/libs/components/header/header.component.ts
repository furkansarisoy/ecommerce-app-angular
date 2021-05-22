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
    },
    {
      label: 'Kategoriler',
    },
    {
      label: 'Yeni Sezon',
    },
    {
      label: 'İndirim',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
