import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/theme/theme.service';
import { CONSTANTS } from '../../../../../assets/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logo = CONSTANTS.bitDegreeLogo;
  toolbar = false;

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {}

  scroll() {
    var elements = document.querySelector('.blog-1') as HTMLElement;
    elements.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop(): void {
    var element = document.querySelector('#top') as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  goToHome(): void {
    this.router.navigate(['/']);
    setTimeout(() => this.scrollToTop(), 333);
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }

  private scrollChangeCallback: () => void;
  currentPosition: any;
  startPosition: number;

  ngAfterViewInit() {
    this.scrollChangeCallback = () => this.onContentScrolled(event);
    window.addEventListener('scroll', this.scrollChangeCallback, true);
  }

  onContentScrolled(e: any) {
    this.startPosition = e.srcElement.scrollTop;
    let scroll = e.srcElement.scrollTop;
    if (scroll > this.currentPosition || scroll < 100) {
      this.toolbar = false;
    } else {
      this.toolbar = true;
    }
    this.currentPosition = scroll;
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollChangeCallback, true);
  }
}
