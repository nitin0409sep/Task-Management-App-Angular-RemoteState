import { NgModule } from '@angular/core';
import { SharedModule } from '../utils/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CoreComponent } from './core.component';

import { AddTodoListComponent } from '../components/add-todo-list-item/add-todo-list-item.component';
import { EditTodoListComponent } from '../components/edit-todo-list-item/edit-todo-list-item.component';
import { ViewTodoListItemComponent } from '../components/view-todo-list-item/view-todo-list.componet';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    CoreComponent,
    AddTodoListComponent,
    EditTodoListComponent,
    ViewTodoListItemComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreRoutingModule,
    CommonModule,
  ],
  exports: [],
})
export class CoreModule {}
