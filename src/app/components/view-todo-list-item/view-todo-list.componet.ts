import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { TodoService } from 'src/app/service/todo.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/utils/shared-componets/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/utils/shared-service/snackbar.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddTodoListComponent } from '../add-todo-list-item/add-todo-list-item.component';
import { EditTodoListComponent } from '../edit-todo-list-item/edit-todo-list-item.component';
import { Todo } from 'src/app/models/tododata.interface';

@Component({
  selector: 'view-todo-list-item',
  templateUrl: './view-todo-list-item.component.html',
  styleUrls: [],
})
export class ViewTodoListItemComponent implements OnInit {
  title = 'todo-angular';

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  public searchForm!: FormGroup;

  public displayedColumns = [
    'sno',
    'id',
    'value',
    'status',
    'progress',
    'priority',
    'action',
  ];
  public dataSource = new BehaviorSubject<any>([]);
  public newDataSource = new MatTableDataSource(this.dataSource.value);
  public search = new FormControl('', []);
  public loading$$ = new BehaviorSubject<boolean>(false);
  public totalItems = 0;
  public deletingIndex = -1;

  public constructor(
    private dialog: MatDialog,
    private todoservice: TodoService,
    private router: Router,
    private snackbarservice: SnackBarService,
    private fb: FormBuilder
  ) {}

  public deleting$$ = new BehaviorSubject<boolean>(false);

  public ngOnInit(): void {
    this.todoservice.setRefreshLoader(this.loading$$);

    this.createForm();

    // Get Todo Items
    this.getItems();

    // Filter Value
    this.searchForm.get('filter')?.valueChanges.subscribe(() => {
      this.searchForm.get('search')?.patchValue('', { emitEvent: false });
      this.updateQueryParams({ search: null, id: null });
    });

    // Search Value
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((val) => {
        this.searchForm.get('filter')?.value === 'Item Id'
          ? this.updateQueryParams({ search: null, id: val })
          : val.search.length
          ? this.updateQueryParams({ search: val.trim(), id: null })
          : this.updateQueryParams({ search: null, id: null });
      });

    // on hard refresh or initallay it should be null
    this.updateQueryParams({});
  }

  // Create Form
  public createForm() {
    this.searchForm = this.fb.group({
      search: new FormControl('', []),
      filter: new FormControl('Item Value', []),
    });
  }

  // Get Items
  public getItems() {
    this.loading$$.next(true);
    this.todoservice.getData().subscribe({
      next: (data) => {
        this.totalItems = +data.count ?? 0;
        this.dataSource.next(data.items);
        this.newDataSource.data = this.dataSource.value;
        this.newDataSource.paginator = this.paginator;

        this.newDataSource.paginator.length = this.totalItems;
        this.loading$$.next(false);
      },
      error: (err) => {
        this.totalItems = 0;
        console.error(err.error);
        this.loading$$.next(false);
      },
    });
  }

  // Add Items
  public addItems() {
    this.dialog.open(AddTodoListComponent, {
      width: '500px',
    });
  }

  // Update Items
  public updateItem(element: Todo) {
    this.dialog.open(EditTodoListComponent, {
      width: '500px',
      data: element,
    });
  }

  // Delete Items
  public deleteItem(element: Todo) {
    const dialog = this.dialog.open(ConfirmationDialogComponent);
    dialog.afterClosed().subscribe((val) => {
      if (val) {
        this.todoservice.delteItems(element.id).subscribe({
          next: (res) => {
            this.snackbarservice.showMessage(res);
          },
          error: (err) => {
            this.snackbarservice.showError(err.err.err);
          },
        });
      }
    });
  }

  // Update Query Params
  public updateQueryParams(search?: Params, page?: number, limit?: number) {
    const params = {
      search: search?.['search'] ?? null,
      id: search?.['id'] ?? null,
      page: page ?? 0,
      limit: limit ?? 10,
    };

    console.log(params);

    this.router.navigate([], {
      queryParams: params,
    });

    // params['search'] === ''
    //   ? null
    //   : this.router.navigate([], {
    //       queryParams: params,
    //     });
  }

  // // Page Events
  // public pageEvents(event: PageEvent) {
  //   event.length = this.totalItems;
  //   const limit = event.pageSize;
  //   const pageIndex = event.pageIndex;
  //   this.updateQueryParams({ limit, page: pageIndex });
  // }
}
