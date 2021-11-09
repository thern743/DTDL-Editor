import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FolderSelectComponent } from './file-select/file-select.component';
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

  openFolderSelect() {
    const dialogRef = this.dialog.open(FolderSelectComponent);

    dialogRef.afterClosed().subscribe(result => {
     //TODO: Impliment 
    });
  }
}
