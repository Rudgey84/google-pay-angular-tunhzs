import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { InnerComponent } from "./outer.component";
@Component({
  selector: "my-app",
  standalone: true,
  template: `
    <iframe #contentFrame></iframe>
  `
})
export class AppComponent implements OnInit, AfterViewInit {
  private contentRef: ComponentRef<any> | null = null;
  private frameDoc: Document | null = null;


  @ViewChild("contentFrame") contentFrame!: ElementRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(InnerComponent);
    this.contentRef = this.viewContainerRef.createComponent(factory);
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      // get reference to loaded iframe document
      this.frameDoc =
        this.contentFrame.nativeElement.contentDocument ||
        this.contentFrame.nativeElement.contentWindow;
        if (this.frameDoc && this.frameDoc.body) {
          this.frameDoc.body.appendChild(this.contentRef?.location.nativeElement);
        }
        
    }, 1000);
  }
}
