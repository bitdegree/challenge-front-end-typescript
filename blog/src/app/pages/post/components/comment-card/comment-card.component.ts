import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { PostComment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
  animations: [
    trigger(
      'commentBodyToggle', [
        transition(':enter', [
          style({height:0}),
          animate('300ms', style({ height:100}))
        ]),
        transition(':leave', [
          style({height:100}),
          animate('300ms', style({height:0}))
        ])
      ],
    ),
  ]
})
export class CommentCardComponent implements OnInit {


  @Input() Comment !: PostComment;

  constructor() { }

  BodyToggle : boolean = false;

  BodyToggleOff : string = "bi bi-arrow-down-circle-fill toggle"
  BodyToggleOn : string = "bi bi-arrow-up-circle-fill toggle"

  ngOnInit(): void {
    console.log(this.Comment)
  }

  BodyToggleClick(){
    this.BodyToggle = !this.BodyToggle;
  }

}
