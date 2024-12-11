import {Component, ViewEncapsulation, Input, OnInit} from "@angular/core";
import { IframeComponent } from "./iframe.component";
import {
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: "my-app",
  standalone: true,
 // encapsulation: ViewEncapsulation.ShadowDom,
  imports: [MatDialogModule, MatButtonModule],
  template: ``
  
})
export class AppComponent implements OnInit {
  constructor(
    private matDialog: MatDialog
  ) {}

  @Input() requestKey!: string;
  @Input() sessionToken!: string;
  @Input() password!: string;
  @Input() baseUrl!: string;
  @Input() merchantId!: string;

  matDialogRef!: MatDialogRef<IframeComponent>;
  names: string = "";

  ngOnInit() {
      this.openModal();
  }

  openModal() {
    this.matDialogRef = this.matDialog.open(IframeComponent, {
      data: {
        requestKey: this.requestKey,
        sessionToken: this.sessionToken,
        password: this.password,
        baseUrl: this.baseUrl,
        merchantId: this.merchantId
      },
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