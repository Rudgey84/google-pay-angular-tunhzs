import {Component, Input, OnInit} from "@angular/core";
import { IframeComponent } from "./iframe.component";
import {
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
@Component({
  selector: "my-app",
  standalone: true,
  imports: [MatDialogModule],
  template: ``
  
})
export class AppComponent implements OnInit {
  constructor(
    private matDialog: MatDialog
  ) {}
  @Input() autoOpen: boolean | undefined;
  matDialogRef!: MatDialogRef<IframeComponent>;
  names: string = "";

  ngOnInit() {
      this.openModal();
  }

  openModal() {
    this.matDialogRef = this.matDialog.open(IframeComponent, {
      data: { name: this.names },
      width: '80vw',
      height: '80vh',
      disableClose: true,
      autoFocus: false,
      panelClass: 'custom-dialog-container'
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.names = "";
      }
    });
  }
}