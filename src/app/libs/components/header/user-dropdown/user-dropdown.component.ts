import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit {

  @Output() logOut = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onLogOutClick() {
    this.logOut.emit();
  }

}
