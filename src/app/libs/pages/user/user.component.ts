import { Component, OnInit } from '@angular/core';
import { HeaderType } from '../../components/header/header.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  headerType = HeaderType.User;

  constructor() { }

  ngOnInit(): void {
  }

}
