import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IonInput, ModalController} from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit, OnDestroy {
  @ViewChild('passwordInputRef') passwordInputRef!: IonInput;
  showPassword: boolean = true;
  errorMessage = '';
  isSubmitDisabled = false;
  loading = false;
  email = '';
  password = '';
  private errorMessageSubscription!: Subscription;
  emailSent: boolean = false;
  
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private authenticationService: AuthenticationService,
    private afAuth: AngularFireAuth,
    private modalController: ModalController
  ) {
    console.log("afAuth:", afAuth);
  }

  async resetPassword() {
    console.log("Email value:", this.email);
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      this.emailSent = true;
      console.log("Password reset email sent.");
    } catch (error) {
      // Handle any errors that occur during the password reset process
      console.log("Error resetting password:", error);
    }
  }
  
  updateSubmitButtonState() {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    this.isSubmitDisabled = !username || !password;
  }

  ngAfterViewInit(): void {
    this.togglePasswordVisibility();
    this.errorMessageSubscription = this.authenticationService.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
    });
  }

  ngOnDestroy(): void {
    this.errorMessageSubscription.unsubscribe();
  }

  async togglePasswordVisibility(): Promise<void> {
    this.showPassword = !this.showPassword;
    const passwordInput = await this.passwordInputRef.getInputElement();
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
  }

  signInWithGoogle() {
    this.authenticationService.SignInWithGoogle();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
