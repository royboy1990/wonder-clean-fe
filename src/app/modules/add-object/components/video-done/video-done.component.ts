import {AfterViewInit, Component, Input} from '@angular/core';
import {WonderObject} from "../../../../models/object.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-video-done',
  templateUrl: './video-done.component.html',
  styleUrls: ['./video-done.component.scss']
})
export class VideoDoneComponent implements AfterViewInit {
  @Input() object!: WonderObject;

  constructor(public router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['object']) {
        this.object = JSON.parse(params['object']);
      }
    });
  }

  ngAfterViewInit() {
    const video = document.querySelector('video');
    if (video) {
      video.play();
    }
  }
}
