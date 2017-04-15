import { BattlefieldComponent } from './game/battlefield.component';
import { Routes } from '@angular/router';

import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: BattlefieldComponent },
  { path: 'about', component: AboutComponent },
];
