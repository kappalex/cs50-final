import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from './post/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts = this.store.collection('posts', ref => ref.orderBy("timestamp", "desc")).valueChanges({ idField: 'id' });

  constructor(
    private store: AngularFirestore
  ) { }

  ngOnInit(): void {
  }

}
