import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { ViewTodoListItemComponent } from '../components/view-todo-list-item/view-todo-list.componet';
import { CommentComponent } from '../components/comments-todo-list-item.component/comments-todo-list-item.component';

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
        path: 'view-comment',
        component: CommentComponent,
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
export class CoreRoutingModule { }
