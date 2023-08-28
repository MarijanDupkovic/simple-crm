import { Component } from '@angular/core';
import { WebsiteComponent } from '../website.component';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent {
  public test: any;

  constructor(private website: WebsiteComponent) {
    this.test = this.website.test;
  }

}

