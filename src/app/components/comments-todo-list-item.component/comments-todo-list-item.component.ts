import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CommentService } from "src/app/service/comment.service";
import { TodoService } from "src/app/service/todo.service";
import { DialogCommentBox } from "../add-edit-comments-dialog-box/comments-dialog-box.component";
import { BehaviorSubject } from "rxjs";
import { SnackBarService } from "src/app/utils/shared-service/snackbar.service";
import { ConfirmationDialogComponent } from "src/app/utils/shared-componets/confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-comment',
    templateUrl: './comments-todo-list-item.component.html',
    styleUrls: ['./comments-todo-list-item.component.scss'],
})

export class CommentComponent implements OnInit {
    public taskDetails: any;
    public comments$$ = new BehaviorSubject<string[]>([]);
    public deletingIndex = -1;
    public deleting$$ = new BehaviorSubject<boolean>(false);

    constructor(
        private commentService: CommentService,
        private todoService: TodoService,
        private router: Router,
        private dialog: MatDialog,
        private snackbarservice: SnackBarService,
    ) { }

    ngOnInit() {
        this.todoService.getData().subscribe((val) => {
            this.taskDetails = val;
        });

        this.commentService.getAllTaskComments().subscribe(
            {
                next: ((val) => {
                    if (val) { 
                        this.comments$$.next(val);
                    }

                }),
                error: ((err) => { })
            }
        )
    }

    public viewList() {
        this.router.navigate(['./view-list'], {
            queryParams: null
        })
    }

    // Add/Edit Comment
    public openCommentDialogBox(data?: string) {
        if (data) {
            data = data.replace(/(\r\n|\n|\r|\s{2,})/g, ' ').trim();
        }

        this.dialog.open(DialogCommentBox, {
            width: '600px',
            data: data
        });
    }

    // Delete Comment
    public deleteComment(element: any) {
        const dialog = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: `Do you want to delete comment`,
            }
        });

        dialog.afterClosed().subscribe((val) => {
            if (val) {
                if (!element?.id) {
                    this.snackbarservice.showMessage("No comment is deleted, try again.");
                } else {
                    this.deleting$$.next(true);
                    this.commentService.deleteComment(element!.id).subscribe({
                        next: (res) => {
                            this.deleting$$.next(false);
                            this.snackbarservice.showMessage(res);
                        },
                        error: (err) => {
                            this.deleting$$.next(false);
                            this.snackbarservice.showError(err.err.err);
                        },
                    });
                }
            }
        });
    }

    // Delete All Items
    public deleteAllComments() {
        const dialog = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: "Do you want to delete all items ?",
            }
        });

        dialog.afterClosed().subscribe((val) => {
            if (val) {
                this.deleting$$.next(true);
                this.commentService.deleteAllComments().subscribe({
                    next: (res) => {
                        this.deleting$$.next(false);
                        this.snackbarservice.showMessage(res);
                    },
                    error: (err) => {
                        this.deleting$$.next(false);
                        this.snackbarservice.showError(err.err.err);
                    },
                });
            }
        });
    }

}