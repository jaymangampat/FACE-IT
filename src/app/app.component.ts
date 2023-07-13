import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'analytics' },
    { title: 'Real-Time Video', url: '/realtimevid', icon: 'videocam' },
  ];

  constructor(private router: Router, private menuController: MenuController) {}

  logout() {
    this.menuController.close();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
