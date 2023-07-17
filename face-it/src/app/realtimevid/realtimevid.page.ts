import { Component, HostListener } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-realtimevid',
  templateUrl: './realtimevid.page.html',
  styleUrls: ['./realtimevid.page.scss'],
})
export class RealtimevidPage {
  isFullscreen = false;
  isNightMode = false;
  icon: string = 'expand';
  videoDevices: MediaDeviceInfo[] = []; // Array to store the available video devices
  selectedVideoDevice: string = ''; // Variable to store the selected video device

  constructor(
    private animationCtrl: AnimationController,
    private modalController: ModalController
  ) {}

  toggleNightMode() {

  }
  
  getVideoDevices() {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      this.videoDevices = devices.filter(device => device.kind === 'videoinput');
    });
  }

  // Call the getVideoDevices() method when the component initializes
  ngOnInit() {
    this.getVideoDevices();
  }
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(250)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
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
  closeModal() {
    this.modalController.dismiss();
  }
}
