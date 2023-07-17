import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isNightMode = false;

  toggleNightMode() {
    // Implement the logic for toggling between night mode and light mode
    // based on the value of `isNightMode` here
  }
  constructor() { }

  ngOnInit() {
  }

}
