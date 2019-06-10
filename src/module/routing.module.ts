import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslatePageComponent} from './app/page/translate/component';
import {HomePageComponent} from './app/page/home/component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'translate',
    component: TranslatePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
