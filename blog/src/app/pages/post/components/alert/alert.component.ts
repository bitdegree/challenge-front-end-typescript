import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger(
      'enterAnimationHorizontal', [
        transition(':enter', [
          style({transform: 'translateX(100%)'}),
          animate('300ms', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0%)'}),
          animate('300ms', style({transform: 'translateX(100%)'}))
        ])
      ]),
  ]
})
export class AlertComponent implements OnInit {

  @Input() AlertType !: number; // 1 = Success 2 = Danger 
  @Input() AlertMessage !: string;

  Show : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set DisplayTime(DisplayTime : number){
    const _this = this;
    this.Show = true;
    setTimeout(function () {
      _this.Show = false;
    }, DisplayTime);
  }

}
