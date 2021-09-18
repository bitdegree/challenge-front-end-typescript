import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostComment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input() PostID !: number;
  @Output() CommentSubmitted = new EventEmitter<PostComment>();

  constructor() { }


  Email !: string;
  Name !: string;
  Body !: string;

  SumbitClicked : boolean = false;

  ngOnInit(): void {
  }

  sumbit(){
    if(this.Email == undefined || this.Name == undefined ||this.Body == undefined || this.Email == '' || this.Name == '' || this.Email == '' )
    {
      this.SumbitClicked = true;
      return;
    }
    this.confirm();
  }

  confirm(){
    this.CommentSubmitted.emit({
      body : this.Body,
      email : this.Email,
      name : this.Name,
      postId : this.PostID
    })
    this.Body = '';
    this.Email = '';
    this.Name = '';
    this.SumbitClicked = false;



  }




}
