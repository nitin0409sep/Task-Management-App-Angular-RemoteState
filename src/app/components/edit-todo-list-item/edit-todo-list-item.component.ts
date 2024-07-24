import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
// import { Todo } from 'src/app/modals/tododata.interface';
import { TodoService } from 'src/app/service/todo.service';
import { SnackBarService } from 'src/app/utils/shared-service/snackbar.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-todo-list-item.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditTodoListComponent implements OnInit {
  public submitting$$ = new BehaviorSubject<boolean>(false);
  public updateTaskForm!: FormGroup;

  public priority: string[] = ['High', 'Medium', 'Low'];
  public status: string[] = ['Started', 'Pending', 'Completed'];

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoservice: TodoService,
    private snackbarservice: SnackBarService,
    private diaog: MatDialogRef<EditTodoListComponent>,
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    // console.log(this.data);
    this.createForm();
  }

  public createForm() {
    this.updateTaskForm = this.fb.group({
      name: [this.data?.value, [Validators.required]],
      priority: [this.data?.priority, [Validators.required]],
      deadline: [this.data.dead_line_date, [Validators.required]],
      progress: [this.data.progress, [Validators.required]],
      status: [this.data.status, [Validators.required]],
    })
  }

  public updateList() {
    if (!this.updateTaskForm.valid) {
      this.snackbarservice.showError("Form is invalid");
      return;
    }

    const reqbody = {
      ...this.updateTaskForm.value,
      value: this.updateTaskForm.get('name')?.value,
      dead_line_date: this.updateTaskForm.get('deadline')?.value,
    }

    delete reqbody.deadline;
    delete reqbody.name;

    this.submitting$$.next(true);
    this.todoservice.updateItems(this.data.id, reqbody).subscribe({
      next: (val) => {
        this.snackbarservice.showMessage(val);
        this.close();
        this.submitting$$.next(false);
      },
      error: (err) => {
        this.submitting$$.next(false);
        this.snackbarservice.showError(err.err.err);
      },
    });
  }

  public close() {
    this.diaog.close();
  }
}
