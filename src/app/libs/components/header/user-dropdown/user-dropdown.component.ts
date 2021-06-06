import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit {

  @Input() isAdmin: boolean;

  @Output() logOut = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogOutClick() {
    this.logOut.emit();
  }

  onDashboardClick() {
    this.router.navigate(['/admin']);
  }

}
