import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-writer-header',
  templateUrl: './writer-header.component.html',
  styleUrls: ['./writer-header.component.css']
})
export class WriterHeaderComponent implements OnInit {

  @Input() User !: User;

  constructor(readonly router : Router) { }

  ngOnInit(): void {
  }

  websiteClicked(){
    window.open(this.User.website, '_blank');
  }

  nameClicked(){
    this.router.navigate(['/user', this.User.id]);
  }

}
