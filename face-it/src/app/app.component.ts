import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isNightMode = false;

  toggleNightMode() {
    this.isNightMode = !this.isNightMode;
    const appElement = document.querySelector('ion-app');
    if (appElement) {
      if (this.isNightMode) {
        appElement.classList.add('night-mode');
      } else {
        appElement.classList.remove('night-mode');
      }
    }
  }
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
