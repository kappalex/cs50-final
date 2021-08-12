import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//import { auth } from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { User } from './user.model';
import firebase from "firebase/app";
import {BehaviorSubject} from 'rxjs';
import "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = null;
  errorCode
  errorMessage
  
  private signedIn$: BehaviorSubject<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    
  ) { 
     this.signedIn$ = new BehaviorSubject<boolean>(false);
   }

  switchAuthState(){
    this.signedIn$.next(!this.signedIn$.value);
  }

  getAuthState(): Observable<boolean>{
    return this.signedIn$.asObservable();
  }

  createAccount(newEmail, newPassword) {
    firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword)
      .then((userCredential) => {
        // Signed in 
        this.user = userCredential.user;
        // ...
        this.switchAuthState()
        console.log(this.user)
      })
      .catch((error) => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
        // ..
        console.log(this.errorCode, this.errorMessage)
      });
  }

  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        this.user = userCredential.user;
        // ...
        this.switchAuthState();
        console.log("Great success!", this.user)
      })
      .catch((error) => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
        console.log("Small fail.", this.errorCode, this.errorMessage)
      });

  }

  logout() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.switchAuthState()
      console.log("Great success. You're out.")
    }).catch((error) => {
      // An error happened.
      this.errorCode = error.code;
      this.errorMessage = error.message;
      console.log("Small fail.", this.errorCode, this.errorMessage)
    });
  }


}
