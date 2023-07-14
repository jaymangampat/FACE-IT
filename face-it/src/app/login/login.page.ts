import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';


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
  
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private authenticationService: AuthenticationService,
  ) {}

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
}
