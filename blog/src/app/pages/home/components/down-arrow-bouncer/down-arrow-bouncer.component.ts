import { Component, OnInit } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-down-arrow-bouncer',
  templateUrl: './down-arrow-bouncer.component.html',
  styleUrls: ['./down-arrow-bouncer.component.css'],
  animations:[    
    trigger('move', [
      transition(':enter', [
        style({height:0}),
        animate('300ms', style({ height:500}))
      ]),
    ]),
    ]
})
export class DownArrowBouncerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  state = 'in';
  ngAfterViewInit() {
    setTimeout(() => {
      this.state = 'out';
    }, 0);
  }

  onEnd(event : any) {
    this.state = 'in';
    if (event.toState === 'in') {
      setTimeout(() => {
        this.state = 'out';
      }, 0);
    }
  }

}
