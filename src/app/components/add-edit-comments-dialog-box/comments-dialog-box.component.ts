import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { CommentService } from "src/app/service/comment.service";
import { ConfirmationDialogComponent } from "src/app/utils/shared-componets/confirmation-dialog/confirmation-dialog.component";
import { SnackBarService } from "src/app/utils/shared-service/snackbar.service";

@Component({
    selector: 'app-dialog-comment',
    templateUrl: './comments-dialog-box.component.html',
    styleUrls: [],
})

export class DialogCommentBox implements OnInit {
    public commentsForm!: FormGroup;
    public submitting$$ = new BehaviorSubject<boolean>(false);
    public saveButton = 'Save Comment';
    public add_edit_title = 'Add Comment';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public fb: FormBuilder,
        public dialogReference: MatDialogRef<DialogCommentBox>,
        public dialog: MatDialog,
        public snackbarservice: SnackBarService,
        private commentsservice: CommentService,
    ) { }

    ngOnInit(): void {
        this.createForm();

        if (this.data) {
            this.commentsForm?.get('comment')?.patchValue(this.data.trim());
            this.saveButton = 'Update Comment';
            this.add_edit_title = 'Edit Comment';
        }
    }

    public createForm() {
        this.commentsForm = this.fb.group({
            comment: ['', Validators.required]
        })
    }

    public saveComments() {
        if (!this.commentsForm.valid) {
            this.snackbarservice.showError("Comments Form is Invalid");
        }

        const comment = this.commentsForm.get('comment')?.value;

        // Add or Update
        const request$ = this.saveButton === 'Update'
            ? this.commentsservice.updateComment(1, comment)
            : this.commentsservice.addComment({ comment });

        request$.subscribe({
            next: (val) => {
                this.snackbarservice.showError(val
                    ? 'Comment Updated Successfully.'
                    : 'Comment is not updated, please try again.');

                this.dialogReference.close();
            },
            error: (err) => {
                this.snackbarservice.showError(err.error || 'An unexpected error occurred.');
            }
        });

    }

    public close() {
        if (this.commentsForm.get('comment')?.value) {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                data: {
                    message: `Do you want to close add comment dialog box ?`,
                }
            });

            dialogRef.afterClosed().subscribe((val) => {
                if (val)
                    this.dialogReference.close();
            })
        } else {
            this.dialogReference.close();
        }
    }
}