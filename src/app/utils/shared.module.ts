import { NgModule } from '@angular/core';

// Pipes
import { DashIfNothingPipe } from './pipes/dashifnothing.pipe';

// Mat Modules
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select'

import { ConfirmationDialogComponent } from './shared-componets/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [DashIfNothingPipe, ConfirmationDialogComponent],
  imports: [MatDialogModule, MatButtonModule],
  providers: [],
  exports: [
    DashIfNothingPipe,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatChipsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    ConfirmationDialogComponent,
  ],
})
export class SharedModule { }
