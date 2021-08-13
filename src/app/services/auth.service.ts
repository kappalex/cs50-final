import { Injectable } from '@angular/core';

//import { auth } from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import firebase from "firebase/app";
import {BehaviorSubject} from 'rxjs';
import "firebase/auth";
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = null;
  user_id = null;
  errorCode
  errorMessage
  usersRef
  currentUserQuery
  currentUser = null;
  postToEdit

  private signedIn$: BehaviorSubject<boolean>;

  constructor(
    private store: AngularFirestore,
  ) { 
     this.signedIn$ = new BehaviorSubject<boolean>(false);

     firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
         this.user_id = user.uid;
         console.log(this.user_id)
         this.getCurrentUser();
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

  getUserID() {
    return this.user_id;
  }

  setEditPost(post_id){
    this.postToEdit = post_id;
  }

  getEditPost(){
    return this.postToEdit;
  }

  getCurrentUserData() {
    return this.currentUser;
  }

  getCurrentUser(){
  //this.currentUser = this.store.collection('users', ref => ref.where('uid', '==', this.user_id)).get()
    //this.currentUser =  this.store.collection('users').ref.where('uid', '==', this.user_id).get()
    //console.log(this.currentUser)
     this.store.collection('users').ref.where('uid', '==', 'sd4d7j5kaGfYoSkiGrObLlRko4m2').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.currentUser = doc.data() 
        console.log(this.currentUser)
        console.log(doc.id, " => ", doc.data()); 
    })
    })
    .catch(error => {
      // Catch errors
      this.errorCode = error.code;
      this.errorMessage = error.message;
      // ..
      console.log(this.errorCode, this.errorMessage)
  });
  }

  async createAccount(newEmail, newPassword, username) {
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
      await this.user_id != null
      this.store.collection('users').add({
        uid: this.user_id,
        username: username
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
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
