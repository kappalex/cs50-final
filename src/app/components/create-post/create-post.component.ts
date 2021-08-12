import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { timeStamp } from 'console';
import { Post } from '../home/post/post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(
    private store: AngularFirestore
  ) { }
  title
  body

  submit() {
    this.store.collection('posts').add({
      title: this.title,
      body: this.body
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  }

  ngOnInit(): void {
  }

}
