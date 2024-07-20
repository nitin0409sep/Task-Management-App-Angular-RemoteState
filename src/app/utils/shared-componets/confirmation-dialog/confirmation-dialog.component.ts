import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'warehouse-app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() message!: string;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  public ngOnInit(): void { }
}
