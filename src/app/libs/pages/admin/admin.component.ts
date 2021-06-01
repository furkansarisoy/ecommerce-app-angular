import { Component, OnInit } from '@angular/core';
import { HeaderType } from '../../components/header/header.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  headerType = HeaderType.Admin;

  constructor() { }

  ngOnInit(): void {
  }

}
