import {Component} from '@angular/core';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-my-peeks',
  templateUrl: './my-peeks.component.html',
  styleUrls: ['./my-peeks.component.scss']
})
export class MyPeeksComponent {
  user: User | null = null;

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
}
