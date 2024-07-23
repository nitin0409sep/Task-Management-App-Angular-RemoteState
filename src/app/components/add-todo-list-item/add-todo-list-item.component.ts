import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, map } from 'rxjs';
import { TodoService } from 'src/app/service/todo.service';
import { SnackBarService } from 'src/app/utils/shared-service/snackbar.service';

@Component({
  selector: 'app-add',
  templateUrl: './add-todo-list-item.component.html',
  styleUrls: ['add-todo-list-item.component.scss'],
})
export class AddTodoListComponent implements OnInit {
  public itemList$$ = new BehaviorSubject<string[]>([]);

  public itemsForm!: FormGroup;

  public itemValue = '';

  public submitting$$ = new BehaviorSubject<boolean>(false);

  public priority: string[] = ['High', 'Medium', 'Low'];

  public constructor(
    private todoservice: TodoService,
    private snackbarservice: SnackBarService,
    private diaog: MatDialogRef<AddTodoListComponent>,
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
      deadline: [Date, [Validators.required]],
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
    console.log(this.itemsArray.value);

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

    // const dialog = this.dialog.open(ConfirmationDialogComponent, {
    //   data: {
    //     message: `Do you want to delete ${element?.value} ?`,
    //   }
    // });

  }
}
