import { Component, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "hello",
  template: `
    <div style="width:300px">
      <h2 mat-dialog-title>Show Names</h2>
      <div mat-dialog-content>Hello {{ names }}</div>
      <div mat-dialog-actions align="end">
        <span>
          <button
            type="button"
            mat-flat-button
            color="primary"
          >
            Clear
          </button>
          <button
            type="button"
            mat-stroked-button
            color="primary"
            (click)="CloseDialog()"
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  `
})
export class ModalComponent {
  names: string;
  constructor(
    private _mdr: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: { names: string }
  ) {
    this.names = data.names;
  }
  CloseDialog() {
    this._mdr.close(false)
  }
}
