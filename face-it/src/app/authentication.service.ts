import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  errorMessage$ = new BehaviorSubject<string>('');
  userData: Observable<firebase.default.User | null>;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log('You are successfully signed up!', res);
      })
      .catch((error: any) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in with email and password */
  SignIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log('You\'re in!');
        this.router.navigateByUrl('/dashboard');
      })
      .catch((err: any) => {
        console.error('Login failed:', err);
        this.errorMessage$.next('Invalid username or password');
        (document.getElementById('username') as HTMLInputElement).value = '';
        (document.getElementById('password') as HTMLInputElement).value = '';
      });
  }

  /* Sign in with Google */
  SignInWithGoogle() {
    const provider = new GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(provider)
      .then((res: any) => {
        console.log('Google sign-in successful!', res);
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error: any) => {
        console.log('Google sign-in failed:', error.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut();
  }
}