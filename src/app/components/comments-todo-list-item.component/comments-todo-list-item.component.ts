import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CommentService } from "src/app/service/comment.service";
import { TodoService } from "src/app/service/todo.service";
import { DialogCommentBox } from "../comments-dialog-box/comments-dialog-box.component";

@Component({
    selector: 'app-comment',
    templateUrl: './comments-todo-list-item.component.html',
    styleUrls: []
})

export class CommentComponent implements OnInit {
    public taskDetails: any;

    constructor(
        private commentService: CommentService,
        private todoService: TodoService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.todoService.getData().subscribe((val) => {
            this.taskDetails = val;
        });
    }

    public viewList() {
        this.router.navigate(['./view-list'], {
            queryParams: null
        })
    }

    public openCommentDialogBox() {
        this.dialog.open(DialogCommentBox);
    }

}