// Modules
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Pipes
import { DashIfNothingPipe } from './pipes/dashifnothing.pipe';
import { CamelToTitle } from './pipes/cameltotitle.pipe';

// Component
import { ConfirmationDialogComponent } from './shared-componets/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [DashIfNothingPipe, ConfirmationDialogComponent, CamelToTitle],
  imports: [MatDialogModule, MatButtonModule],
  providers: [],
  exports: [
    DashIfNothingPipe,
    CamelToTitle,
    ConfirmationDialogComponent,
  ],
})
export class SharedModule { }
