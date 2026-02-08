import {Component, OnDestroy} from '@angular/core';
import {User} from "../../../../models/user.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {UserService} from "../../../../services/user/user.service";
import {combineLatest, filter, startWith, Subscription} from "rxjs";
import {ObjectService} from "../../../../services/object/object.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../../dialogs/confirmation-dialog/confirmation-dialog.component";
import {WonderObject} from "../../../../models/object.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  private subscription: Subscription[] = []  // Keep track of the subscription

  showHeader: boolean = true;
  showInventoryInfo: boolean = false;
  addObjectRoute: boolean = false;
  isMyObject: boolean | undefined = false;
  user: User | null = null;
  objectId: string = '';
  loading = true; // Add loading state
  onObjectPage = false; // New property
  objectPublicStatus: string = 'Hide';
  isUpdatingObject: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private objectService: ObjectService,
              private dialog: MatDialog,
              public authService: AuthService,
              private _snackBar: MatSnackBar) {
    this.subscription.push(this.userService.user.subscribe(res => {
      this.user = res;
    }));
    this.subscription.push(this.userService.loading.subscribe(state => { // Subscribe to loading state
      this.loading = state;
    }));

    this.subscription.push(this.router.events.subscribe(event => {
      combineLatest([
        this.userService.user.pipe(startWith(null)),
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      ]).subscribe(([user, event]) => {
        this.user = user;
        this.loading = this.userService.loading.getValue(); // Get the current value of loading

        // clear old values
        this.isMyObject = false;
        this.onObjectPage = false;
        this.objectId = '';
        this.addObjectRoute = false;
        this.showInventoryInfo = false;
        this.showHeader = true;

        // split the URL into segments
        // @ts-ignore
        let urlSegments = event.urlAfterRedirects.split('/');
        if (urlSegments.includes('add-object')) {
          this.addObjectRoute = true;
        }
        if (urlSegments.includes('home')) {
          this.showInventoryInfo = true;
        }
        if (urlSegments.includes('auth')) {
          this.showHeader = false;
        }

        // find the index of the segment 'objectId'
        let objectIndex = urlSegments.indexOf('object');
        // if 'objectId' exists in the URL
        if (objectIndex > -1) {
          // get the value after 'objectId'
          this.objectId = urlSegments[objectIndex + 1];
          // update properties
          this.isMyObject = this.user?.objects?.some(object => object._id === this.objectId);
          this.objectPublicStatus = this.user?.objects?.find(object => object._id === this.objectId)?.publicStatus.publicStatusCtrl[0].text.toLowerCase() === 'show' ? 'Hide' : 'Show';
          this.onObjectPage = true;
        }
      });
    }));
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    for (let sub of this.subscription) {
      sub.unsubscribe();
    }
  }

  routerNavigate(path: string) {
    this.router.navigate([path]);
  }

  deleteObject() {
    // Object deletion logic here
    this.dialog.open(ConfirmationDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      maxWidth: '100vw',
      data: {
        questionText: 'Do you want to remove this object from your collection?',
        rightButtonText: 'Remove',
        leftButtonText: 'Cancel',
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.objectService.deleteObject(this.objectId).subscribe(() => {
          this.router.navigate([`user/collection/${this.user?._id}`]);
        });
      }
    });

  }

  showHideObject(): void {
    const wonderObject = this.user?.objects?.find(object => object._id === this.objectId);
    const publicStatus = wonderObject?.publicStatus.publicStatusCtrl[0].text.toLowerCase();
    this.dialog.open(ConfirmationDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      maxWidth: '100vw',
      data: {
        questionText: `Do you want to ${publicStatus === 'show' ? 'hide' : 'show'} this object for other users?`,
        rightButtonText: `${publicStatus === 'show' ? 'hide' : 'show'}`,
        leftButtonText: 'Cancel',
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        if (wonderObject) {
          this.isUpdatingObject = true; // set isUpdatingObject to true when the update starts
          // Toggle the hidden property
          wonderObject.publicStatus.publicStatusCtrl[0].text.toLowerCase() === 'show' ? (wonderObject.publicStatus.publicStatusCtrl[0].text = 'hide') : (wonderObject.publicStatus.publicStatusCtrl[0].text = 'show');
          // Update the object
          this.objectService.updateObject(wonderObject).subscribe((updatedObject: WonderObject) => {
            this.objectPublicStatus = this.user?.objects?.find(object => object._id === this.objectId)?.publicStatus.publicStatusCtrl[0].text.toLowerCase() === 'show' ? 'Hide' : 'Show';
            this.isUpdatingObject = false; // set isUpdatingObject to false when the update is done
            // Object updated, you can handle the updated object here
          }, error => {
            // Error occurred, you can handle the error here
            console.log(error);
            this.isUpdatingObject = false;
          });
        }
      }
    });
  }

  addToPeeks(): void {
    if (this.user) {
      this.userService.addToPeeks(this.user._id, this.objectId).subscribe(res => {
        this._snackBar.open('Added to My Peeks', 'Ok');
      })
    }
  }


}
