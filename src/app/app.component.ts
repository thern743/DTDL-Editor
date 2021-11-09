import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FolderSelectComponent } from './file-select/file-select.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'DTDL Editor';
  public menuOpenState = true;
  public navOpenState = false;
  public treeView = false;
  public dialog: MatDialog;

  constructor(dialog: MatDialog) {
    this.dialog = dialog;
  }

  public openFolderSelect(): void {
    const dialogRef = this.dialog.open(FolderSelectComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public openSettings(): void {
    console.log("Open settings...");
    const dialogRef = this.dialog.open(SettingsComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
