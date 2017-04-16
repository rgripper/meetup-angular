import { Component, OnInit } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  constructor() { }

  public ngOnInit() {

  }

}