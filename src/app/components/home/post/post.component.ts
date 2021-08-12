import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Output() edit = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

}
