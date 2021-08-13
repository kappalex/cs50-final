import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  idToEdit
  post
  errorCode
  errorMessage
  currentUser
  timeToEdit

  constructor(
    private authService: AuthService,
    private store: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.idToEdit = this.authService.getEditPost();
    this.timeToEdit = this.authService.getEditPostTime();

    this.store.collection('posts').ref.doc(this.idToEdit).get()
      .then((doc) => {

        // doc.data() is never undefined for query doc snapshots
        this.post = doc.data()
        console.log(this.post)
        console.log(doc.id, " => ", doc.data());
      })
      .catch(error => {
        // Catch errors
        this.errorCode = error.code;
        this.errorMessage = error.message;
        // ..
        console.log(this.errorCode, this.errorMessage)
      });

    this.currentUser = this.authService.getCurrentUserData();

  }

  savePost() {
    this.store.collection("posts").doc(this.idToEdit).set({
      title: this.post.title,
      body: this.post.body,
      creator: this.currentUser.username,
      timestamp: this.timeToEdit
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

      this.router.navigateByUrl('');
  }

}
