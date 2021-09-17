import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
  animations: [
    trigger(
      'cardToggleAnimation', [
        transition(':enter', [
          style({height:0}),
          animate('300ms', style({ height:100}))
        ]),
        transition(':leave', [
          style({height:100}),
          animate('300ms', style({ height:0}))
        ])
      ],
    ),
  ]
})
export class PostCardComponent implements OnInit {

  @Input() Post !: Post;

  constructor() { }

  BodyToggle : boolean = false;

  ngOnInit(): void {
  }

  toggleBody(){
    this.BodyToggle = !this.BodyToggle;
  }

}
