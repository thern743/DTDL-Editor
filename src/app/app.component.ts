import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'DTDL Editor';
  public menuOpenState = true;
  public navOpenState = false;
  public treeView = false;
  private _router: Router;

  constructor(router: Router) {
    this._router = router; 
  }

  public shouldToggle(link: string): boolean {
    return this._router.url.includes(link);
  }
}
