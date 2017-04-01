import { Routes } from '@angular/router';

import { LandscapeComponent } from './home/landscape.component';
import { SunMoonComponent } from "./home/sun-moon.component";

import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: LandscapeComponent },
  { path: 'about', component: AboutComponent },
];
