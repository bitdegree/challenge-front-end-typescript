import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-writer-info-box',
  templateUrl: './writer-info-box.component.html',
  styleUrls: ['./writer-info-box.component.css']
})
export class WriterInfoBoxComponent implements OnInit {


  @Input() User !: User;

  constructor(readonly router : Router) { }

  BoxShow : boolean = true;

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if(window.innerWidth < 900)
      this.BoxShow = false;
    else 
      this.BoxShow = true;
      
  }

  websiteClicked(){
    window.open(this.User.website, '_blank');
  }

  nameClicked(){
    this.router.navigate(['/user', {postID : this.User.id}]);
  }


}
