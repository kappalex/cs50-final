import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  ) { }
  title
  body
  currentUser
  user_id

  submit() {
    this.store.collection('posts').add({
      title: this.title,
      body: this.body,
      creator: this.currentUser.username
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  }

  ngOnInit(): void {
    this.user_id = this.authService.getUserID();
    this.currentUser = this.authService.getCurrentUserData();
    console.log(this.currentUser)
  }

}
