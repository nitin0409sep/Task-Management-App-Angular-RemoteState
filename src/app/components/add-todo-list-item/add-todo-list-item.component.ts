import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, map } from 'rxjs';
import { TodoService } from 'src/app/service/todo.service';
import { ConfirmationDialogComponent } from 'src/app/utils/shared-componets/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/utils/shared-service/snackbar.service';

@Component({
  selector: 'app-add',
  templateUrl: './add-todo-list-item.component.html',
  styleUrls: ['add-todo-list-item.component.scss'],
})
export class AddTodoListComponent implements OnInit {
  public itemsForm!: FormGroup;

  public submitting$$ = new BehaviorSubject<boolean>(false);

  public priority: string[] = ['High', 'Medium', 'Low'];
  public status: string[] = ['Started', 'Pending', 'Completed'];

  public constructor(
    private todoservice: TodoService,
    private snackbarservice: SnackBarService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddTodoListComponent>,
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.itemsForm = this.fb.group({
      itemsArray: new FormArray([]),
    })

    this.addFormControl();
  }

  public addFormControls() {
    const fg = this.fb.group({
      name: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      progress: [null, [Validators.required]],
      status: ['', [Validators.required]],
    })

    return fg;
  }

  get itemsArray(): FormArray {
    return this.itemsForm.get('itemsArray') as FormArray;
  }

  public addFormControl() {
    (this.itemsArray as FormArray).push(this.addFormControls());
  }

  public deleteFormControl(idx: number) {
    (this.itemsArray as FormArray).removeAt(idx);
  }

  public saveList() {
    if (!this.itemsForm.value.itemsArray.length) {
      this.snackbarservice.showError('Add atleast one item before saving');
      return;
    }

    const reqbody = this.itemsForm.value.itemsArray.map((task: any) => {
      const { name, deadline, ...rest } = task;

      return {
        ...rest,
        value: name,
        dead_line_date: deadline
      }
    })

    this.submitting$$.next(true);
    this.todoservice.addItems(reqbody).subscribe({
      next: (val) => {
        this.snackbarservice.showMessage(val);
        this.submitting$$.next(false);
        this.close(1);
      },
      error: (err) => {
        this.submitting$$.next(false);
        this.snackbarservice.showError(err.err.err);
      },
    });
  }

  // Close Dialog
  public close(isAdded = 0) {
    if (!isAdded) {
      const dialog = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: `Do you want to close add tasks dialog box ?`,
        }
      });

      dialog.afterClosed().subscribe((val) => {
        if (val) {
          this.dialogRef.close();
        }
      })
    }
    else {
      this.dialogRef.close();
    }
  }

}
