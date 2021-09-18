import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() Post !: any;

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
