import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User} from "../../../../models/user.model";
import {Router} from "@angular/router";
import {WonderObject} from "../../../../models/object.model";

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.scss']
})
export class UserCollectionComponent {
  @Input() user!: User | null;
  @Input() limitItems = 6;
  @Input() wonderObjects: WonderObject[] = [];
  @Input() collectionType: 'collection' | 'peeks' = 'collection';

  constructor(private router: Router) {
  }


  routerNavigate(route: string): void {
    this.router.navigate([route]);
  }

}
