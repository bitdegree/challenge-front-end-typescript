import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-screen',
  templateUrl: './post-screen.component.html',
  styleUrls: ['./post-screen.component.css']
})
export class PostScreenComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              readonly router : Router,
              readonly postService: PostService) { }

  Post !: Post;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(i => {
      this.findPost(i.postID)
    });
  }

  findPost(postID: number) {
    if (this.postService.Posts.filter(i => i.id == postID).length > 0) {
      this.Post =  this.postService.Posts.filter(i => i.id == postID)[0];
    }
    else{
      this.postService.getPost(postID).subscribe(data => {
        if(data == undefined)
          this.router.navigateByUrl('');
        else 
          this.Post = data;
      })
    }
  }


}
