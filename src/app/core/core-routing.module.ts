import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTodoListItemComponent } from '../components/view-todo-list-item/view-todo-list.componet';

const routes: Routes = [
  {
    path: 'view-list',
    component: ViewTodoListItemComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'view-list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
