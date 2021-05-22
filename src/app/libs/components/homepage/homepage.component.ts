import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  images = [
    'assets/homepage/homepage1.png', 'assets/homepage/homepage2.webp', 'assets/homepage/homepage3.webp'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
