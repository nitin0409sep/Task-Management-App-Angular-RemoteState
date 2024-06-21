import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Todo } from 'src/app/models/tododata.interface';
import { TodoService } from 'src/app/service/todo.service';
import { SnackBarService } from 'src/app/utils/shared-service/snackbar.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-todo-list-item.component.html',
  styleUrls: [],
})
export class EditTodoListComponent implements OnInit {
  public submitting$$ = new BehaviorSubject<boolean>(false);

  public updatedValue!: string;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private todoservice: TodoService,
    private snackbarservice: SnackBarService,
    private diaog: MatDialogRef<EditTodoListComponent>
  ) {}

  public ngOnInit(): void {
    this.updatedValue = this.data.value;
  }

  public updateList() {
    if (!this.updatedValue.length) {
      this.snackbarservice.showError("Item can't be an empty string");
      return;
    }

    if (this.updatedValue === this.data.value) {
      this.snackbarservice.showMessage('There is no change in value');
      return;
    }

    const reqbody = {
      value: this.updatedValue,
    };

    this.todoservice.updateItems(this.data.id, reqbody).subscribe({
      next: (val) => {
        this.snackbarservice.showMessage(val);
        this.close();
      },
      error: (err) => {
        this.snackbarservice.showError(err.err.err);
      },
    });
  }

  public close() {
    this.diaog.close();
  }
}
