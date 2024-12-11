import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
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
  import { CommonModule } from '@angular/common';

  @Component({
    selector: "hello-world",
 //   encapsulation: ViewEncapsulation.ShadowDom,
    standalone: true,
    imports: [CommonModule],
    template: `
<div *ngIf="isLoading" class="loading-container">
    <div class="loading"></div>
</div>

    <iframe sandbox="allow-scripts allow-same-origin" #contentFrame>Loading...</iframe>
    `
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

    isLoading: boolean = true;

    ngOnInit(): void {
      const factory = this.resolver.resolveComponentFactory(InnerComponent);
      this.contentRef = this.viewContainerRef.createComponent(factory);
  
      if (this.contentRef.instance) {
        const instance = this.contentRef.instance;
        instance.requestKey = this.data.requestKey;
        instance.sessionToken = this.data.sessionToken;
        instance.password = this.data.password;
        instance.baseUrl = this.data.baseUrl;
        instance.merchantId = this.data.merchantId;
  
        // Listen for the closeDialog event
        instance.closeDialog.subscribe(() => {
          this.CloseDialog();
        });

        instance.loadingState.subscribe((loading: boolean) => {
          this.isLoading = loading;
        });
      }
    }
  
    public ngAfterViewInit(): void {
      setTimeout(() => {
        // Get reference to loaded iframe document
        this.frameDoc =
          this.contentFrame.nativeElement.contentDocument ||
          this.contentFrame.nativeElement.contentWindow;
          if (this.frameDoc && this.frameDoc.body) {
            // Inject the component into the iframe
            this.frameDoc.body.appendChild(this.contentRef?.location.nativeElement);
    
            // Inject global styles into the iframe
            this.injectGlobalStyles();
          }
      }, 1000);
    }

    injectGlobalStyles(): void {
      if (this.frameDoc) {
        const globalStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
        globalStyles.forEach((styleElement) => {
          const clonedStyle = styleElement.cloneNode(true);
          this.frameDoc?.head.appendChild(clonedStyle);
        });
      }
    }
  
    CloseDialog() {
      this._mdr.close(false);
    }
  }
  