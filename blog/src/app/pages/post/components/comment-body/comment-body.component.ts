import { Component, Input, OnInit } from '@angular/core';
import { PostComment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-body',
  templateUrl: './comment-body.component.html',
  styleUrls: ['./comment-body.component.css']
})
export class CommentBodyComponent implements OnInit {

  @Input() Comments !: PostComment[];

  constructor() { }

  ngOnInit(): void {
  }

}
