import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faMedium,
  faReddit,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { CONSTANTS } from 'src/assets/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  facebook = faFacebook;
  twitter = faTwitter;
  linkedIn = faLinkedin;
  youtube = faYoutube;
  medium = faMedium;
  instagram = faInstagram;
  reddit = faReddit;
  github = faGithub;

  logo = CONSTANTS.bitDegreeLogoBlack;

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

  goToPost(): void {
    this.router.navigate(['/blog/post']);
    setTimeout(() => this.scrollToTop(), 333);
  }
}
