import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    //animation for good looking, it slidesssss
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

  @Input() alertType !: number; // 1 = Success 2 = Danger 
  @Input() alertMessage !: string;

  show : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set displayTime(displayTime : number){
    const _this = this;
    this.show = true;
    setTimeout(function () {
      _this.show = false;
    }, displayTime);
  }

}
