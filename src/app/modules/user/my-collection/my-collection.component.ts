import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit {
  user: User | null = null;
  @ViewChild('appLayout') appLayout: any;
  maxScrollPosition = 0;
  showScrollbar = false;

  constructor(private userService: UserService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
          this.userService.getUserById(params['id']).subscribe(res => {
            this.user = res;
          })
        }
      );
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.appLayout.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.maxScrollPosition = Math.max(this.maxScrollPosition, this.appLayout.scrollPosition);
  }
}
