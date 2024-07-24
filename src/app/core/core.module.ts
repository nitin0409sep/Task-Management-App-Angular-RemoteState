import { NgModule } from '@angular/core';
import { SharedModule } from '../utils/shared.module';
import { MaterialModule } from '../utils/material-ui/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';

import { CoreComponent } from './core.component';
import { HeaderComponent } from '../components/header-todo-list/header.component';
import { AddTodoListComponent } from '../components/add-todo-list-item/add-todo-list-item.component';
import { EditTodoListComponent } from '../components/edit-todo-list-item/edit-todo-list-item.component';
import { ViewTodoListItemComponent } from '../components/view-todo-list-item/view-todo-list.componet';
import { CommentComponent } from '../components/comments-todo-list-item.component/comments-todo-list-item.component';
import { DialogCommentBox } from '../components/comments-dialog-box/comments-dialog-box.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    AddTodoListComponent,
    EditTodoListComponent,
    ViewTodoListItemComponent,
    CommentComponent,
    DialogCommentBox
  ],
  imports: [
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CoreRoutingModule,
  ],
  exports: [],
})
export class CoreModule { }
