import {Component, ViewEncapsulation, Input, OnInit} from "@angular/core";
import { IframeComponent } from "./iframe.component";
import {
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
@Component({
  selector: "my-app",
  standalone: true,
 // encapsulation: ViewEncapsulation.ShadowDom,
  imports: [MatDialogModule],
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
  @Input() theme!: string;

  matDialogRef!: MatDialogRef<IframeComponent> | null;

  ngOnInit() {
      this.applyTheme();
      this.openModal();
  }

  applyTheme() {
    if (this.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  openModal() {
    if (!this.matDialogRef) {
      this.matDialogRef = this.matDialog.open(IframeComponent, {
        data: {
          requestKey: this.requestKey,
          sessionToken: this.sessionToken,
          baseUrl: this.baseUrl,
          merchantId: this.merchantId
        },
        minWidth: '40vw',
        height: '80vh',
        disableClose: true,
        autoFocus: false,
        panelClass: 'custom-dialog-container'
      });
    
      this.matDialogRef.afterClosed().subscribe(res => {
        if ((res == true)) {
          this.requestKey,
          this.sessionToken,
          this.baseUrl,
          this.merchantId
        }
        this.matDialogRef = null;
      });
    }
  }
}