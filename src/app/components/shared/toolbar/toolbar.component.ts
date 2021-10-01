import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/assets/constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  logo = CONSTANTS.bitDegreeLogoBlack;
  @Input() isEdit = false;
  @Input() isPost = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  scrollToTop(): void {
    var element = document.querySelector('#top') as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  goToHome(): void {
    this.router.navigate(['/']);
    setTimeout(() => this.scrollToTop(), 333);
  }

  goToEdit(): void {
    this.router.navigate([this.router.url + '/edit']);
    setTimeout(() => this.scrollToTop(), 333);
  }

  goToPost(): void {
    this.router.navigate(['blog/post']);
    setTimeout(() => this.scrollToTop(), 333);
  }
}
