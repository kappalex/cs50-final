import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  authSub
  signedIn

  @Input() post: Post;
  @Output() edit = new EventEmitter();
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authSub = this.authService.getAuthState().subscribe((res) => {
      this.signedIn = res;
    })
  }

  editPost(post_id){
    console.log("Edit me please.")
    this.authService.setEditPost(post_id);
    this.router.navigateByUrl('edit-post');
  }

}
