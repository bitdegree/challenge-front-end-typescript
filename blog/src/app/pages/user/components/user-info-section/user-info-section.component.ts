import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-info-section',
  templateUrl: './user-info-section.component.html',
  styleUrls: ['./user-info-section.component.css']
})
export class UserInfoSectionComponent implements OnInit {

  @Input() User !: User;

  constructor() { }

  ngOnInit(): void {
  }

}
