import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cs50-final';
  authSub
  signedIn

  posts = this.store.collection('posts').valueChanges({ idField: 'id' });

  constructor(
    private store: AngularFirestore,
    private authService: AuthService
  ){}

  ngOnInit(){
    this.authSub = this.authService.getAuthState().subscribe((res) => {
      this.signedIn = res;
    })
  }
}
