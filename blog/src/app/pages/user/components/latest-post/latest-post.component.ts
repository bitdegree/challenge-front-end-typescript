import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-latest-post',
  templateUrl: './latest-post.component.html',
  styleUrls: ['./latest-post.component.css']
})
export class LatestPostComponent implements OnInit {

  @Input() post !: Post;

  constructor(readonly router: Router) { }

  ngOnInit(): void {
  }


  headerClicked() {
    this.router.navigate(['/post', this.post.id]);
  }

}
