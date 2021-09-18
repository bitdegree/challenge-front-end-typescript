import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.css']
})
export class UserScreenComponent implements OnInit {

  constructor(readonly activatedRoute : ActivatedRoute,
              readonly userService : UserService) { }

  User !: User;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(i => {
      this.findUser(i.userID);
    });
  }

  findUser(userID: number) {
    if (this.userService.Users && this.userService.Users.filter(i => i.id == userID).length > 0) {
      this.User = this.userService.Users.filter(i => i.id == userID)[0];
    }
    else {
      this.userService.getUser(userID).subscribe(data => {
        this.User = data;
    })
    }
  }

}
