import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostComment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input() postID !: number;
  @Output() commentSubmitted = new EventEmitter<PostComment>();

  constructor() { }


  Email !: string;
  Name !: string;
  Body !: string;

  sumbitClicked : boolean = false;

  ngOnInit(): void {
  }

  //checking if any value is empty
  sumbit(){
    if(this.Email == undefined || this.Name == undefined ||this.Body == undefined || this.Email == '' || this.Name == '' || this.Email == '' )
    {
      this.sumbitClicked = true;
      return;
    }
    this.confirm();
  }

  //sending form values to parent component
  confirm(){
    this.commentSubmitted.emit({
      body : this.Body,
      email : this.Email,
      name : this.Name,
      postId : this.postID
    })
    this.Body = '';
    this.Email = '';
    this.Name = '';
    this.sumbitClicked = false;
  }
}
