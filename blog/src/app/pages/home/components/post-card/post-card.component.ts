import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post !: any;

  constructor(readonly router : Router) { }


  ngOnInit(): void {
  }

  toggleBody(){
  }

  headerClick(){
    this.router.navigate(['/post', this.post.id]);
  }

  authorClick(){
    this.router.navigate(['/user', this.post.userId]);
  }

}
