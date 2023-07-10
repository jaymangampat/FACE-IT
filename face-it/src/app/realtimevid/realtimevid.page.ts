import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-realtimevid',
  templateUrl: './realtimevid.page.html',
  styleUrls: ['./realtimevid.page.scss'],
})
export class RealtimevidPage {
  isFullscreen = false;
  icon: string = 'expand';

  constructor() {}

  toggleFullscreen() {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => console.log("Document exited from full-screen mode"))
        .catch((err) => console.error(err));
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  @HostListener('fullscreenchange', ['$event'])
  handleFullscreenChange(event: Event) {
    this.isFullscreen = !!document.fullscreenElement;
    this.updateIcon();
  }

  updateIcon() {
    this.icon = this.isFullscreen ? 'contract' : 'expand';
  }
}
