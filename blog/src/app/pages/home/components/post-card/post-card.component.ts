import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() Post !: Post;

  constructor(readonly router : Router) { }

  BodyToggle : boolean = false;

  ngOnInit(): void {
  }

  toggleBody(){
    this.BodyToggle = !this.BodyToggle;
  }

  headerClick(){
    this.router.navigate(['/post', {postID : this.Post.id}]);
  }

}
