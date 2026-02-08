import {Component, HostListener, ViewChild} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('appLayout') appLayout: any;
  maxScrollPosition = 0;
  showScrollbar = false;

  constructor(private router: Router) {
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.appLayout.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.maxScrollPosition = Math.max(this.maxScrollPosition, this.appLayout.scrollPosition);
  }
}
