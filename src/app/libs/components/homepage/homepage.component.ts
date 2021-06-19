import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  images = [
    {
      url: 'assets/homepage/homepage1.png',
      title: '',
      subtitle: ''
    },
    {
      url: 'assets/homepage/homepage2.png',
      title: '',
      subtitle: ''
    },
    {
      url: 'assets/homepage/homepage3.png',
      title: '',
      subtitle: ''
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
