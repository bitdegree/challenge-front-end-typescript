import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-down-arrow-bouncer',
  templateUrl: './down-arrow-bouncer.component.html',
  styleUrls: ['./down-arrow-bouncer.component.css']
})
export class DownArrowBouncerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }

}
