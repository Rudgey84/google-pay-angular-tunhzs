import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    Inject,
    ViewContainerRef
  } from "@angular/core";
  import { InnerComponent } from "./inner.component";

  @Component({
    selector: "hello-world", // Updated to include a hyphen
    encapsulation: ViewEncapsulation.ShadowDom,
    standalone: true,
    imports: [MatButtonModule],
    template: `
    <iframe #contentFrame></iframe>
  
    <div mat-dialog-actions align="end">
      <span>
        <button mat-stroked-button
          class="positioned-button"
          type="button"
          mat-stroked-button
          color="primary"
          (click)="CloseDialog()"
        >
          Cancel
        </button>
      </span>
    </div>
    `,
    styles: [
      `
        iframe {
          min-width: 100%;
          min-height: 100%;
          border: 0;
        }
        .positioned-button {
          position: relative;
          top: -100px;
        }
        /* If you want to disable scrolling for the modal's body */
        .mat-mdc-dialog-surface {
          overflow: hidden !important; /* Prevent scrollbars in the dialog */
        }
      `
    ]
  })
  export class IframeComponent implements OnInit, AfterViewInit {
    private contentRef: ComponentRef<any> | null = null;
    private frameDoc: Document | null = null;
  
    @ViewChild("contentFrame") contentFrame!: ElementRef;

  
    constructor(
      private _mdr: MatDialogRef<IframeComponent>,
      private resolver: ComponentFactoryResolver,
      private viewContainerRef: ViewContainerRef,
      @Inject(MAT_DIALOG_DATA) public data: {
        requestKey: string;
        sessionToken: string;
        password: string;
        baseUrl: string;
        merchantId: string;
      }
    ) {
      // You can now access these values in the component
      console.log("Received Data:", data);
    }
  
    ngOnInit(): void {
      const factory = this.resolver.resolveComponentFactory(InnerComponent);
      this.contentRef = this.viewContainerRef.createComponent(factory);
    
      this.contentRef.instance.requestKey = this.data.requestKey;
      this.contentRef.instance.sessionToken = this.data.sessionToken;
      this.contentRef.instance.password = this.data.password;
      this.contentRef.instance.baseUrl = this.data.baseUrl;
      this.contentRef.instance.merchantId = this.data.merchantId;
    }
  
    public ngAfterViewInit(): void {
      setTimeout(() => {
        // Get reference to loaded iframe document
        this.frameDoc =
          this.contentFrame.nativeElement.contentDocument ||
          this.contentFrame.nativeElement.contentWindow;
        if (this.frameDoc && this.frameDoc.body) {
          this.frameDoc.body.appendChild(this.contentRef?.location.nativeElement);
        }
      }, 1000);
    }
  
    CloseDialog() {
      this._mdr.close(false);
    }
  }
  