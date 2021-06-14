import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { BasketComponent } from './components/basket/basket.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'basket', component: BasketComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
