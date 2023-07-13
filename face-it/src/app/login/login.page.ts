import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  @ViewChild('passwordInputRef') passwordInputRef!: IonInput;
  showPassword: boolean = true;
  errorMessage!: string;
  isSubmitDisabled = false;

  signIn() {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    if (enteredUsername === 'username' && enteredPassword === 'password') {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.errorMessage = 'Invalid username or password';

      usernameInput.value = '';
      passwordInput.value = '';
    }
  }
  updateSubmitButtonState() {
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    this.isSubmitDisabled = !username || !password;
  }
  ngAfterViewInit(): void {
    this.togglePasswordVisibility();
  }

  async togglePasswordVisibility(): Promise<void> {
    this.showPassword = !this.showPassword;
    const passwordInput = await this.passwordInputRef.getInputElement();
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  
  constructor(private router: Router) {}

}
