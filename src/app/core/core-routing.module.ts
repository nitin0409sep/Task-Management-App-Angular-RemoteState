import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTodoListItemComponent } from '../components/view-todo-list-item/view-todo-list.componet';
import { CoreComponent } from './core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'view-list',
        component: ViewTodoListItemComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view-list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
