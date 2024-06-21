import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'warehouse-app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent implements OnInit {
  public constructor() {}

  public ngOnInit(): void {}
}
