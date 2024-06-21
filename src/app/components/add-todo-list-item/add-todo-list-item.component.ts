import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, map } from 'rxjs';
import { TodoService } from 'src/app/service/todo.service';
import { SnackBarService } from 'src/app/utils/shared-service/snackbar.service';

@Component({
  selector: 'app-add',
  templateUrl: './add-todo-list-item.component.html',
  styleUrls: [],
})
export class AddTodoListComponent implements OnInit {
  public itemList$$ = new BehaviorSubject<string[]>([]);

  public itemValue = '';

  public submitting$$ = new BehaviorSubject<boolean>(false);

  public constructor(
    private todoservice: TodoService,
    private snackbarservice: SnackBarService,
    private diaog: MatDialogRef<AddTodoListComponent>
  ) {}

  public ngOnInit(): void {}

  public remove(idx: number) {
    const currentValue = this.itemList$$.value.slice(); // Make a copy of the current array
    currentValue.splice(idx, 1); // Remove the item at index `idx`
    this.itemList$$.next(currentValue);
  }

  public addItemInArray() {
    if (!this.itemValue) {
      this.snackbarservice.showError("Item can't be an empty string");
      return;
    }

    this.itemList$$.next([...this.itemList$$.value, this.itemValue]);
    this.itemValue = '';
  }

  public saveList() {
    if (!this.itemList$$.value.length) {
      this.snackbarservice.showError('Add atleast one item before saving');
      return;
    }

    const reqbody = {
      value: this.itemList$$.value,
    };

    this.todoservice.addItems(reqbody).subscribe({
      next: (val) => {
        console.log(val);
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
