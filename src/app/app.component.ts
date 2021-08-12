import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cs50-final';

  posts = this.store.collection('posts').valueChanges({ idField: 'id' });

  constructor(
    private store: AngularFirestore
  ){}
}
