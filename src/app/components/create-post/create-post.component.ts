import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(
    private store: AngularFirestore,
    private authService: AuthService,
    private router: Router,
  ) {
   }
  title
  body
  currentUser
  user_id

  submit() {
    this.store.collection('posts').add({
      title: this.title,
      body: this.body,
      creator: this.currentUser.username,
      timestamp: this.authService.getTime()
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
      this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.user_id = this.authService.getUserID();
    this.currentUser = this.authService.getCurrentUserData();
    console.log(this.currentUser)
  }

}
