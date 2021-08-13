import { Injectable } from '@angular/core';

//import { auth } from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import firebase from "firebase/app";
import {BehaviorSubject} from 'rxjs';
import "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {ng 
  user = null;
  user_id;
  errorCode
  errorMessage
  
  private signedIn$: BehaviorSubject<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    
  ) { 
     this.signedIn$ = new BehaviorSubject<boolean>(false);

     firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
         this.user_id = user.uid;
         console.log(this.user_id)
        // ...
      } else {
        // User is signed out
        // ...
        console.log("User is signed out.")
      }
    });
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
        console.log("UID", this.user.uid)
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
        console.log("User ID", this.user_id)

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
