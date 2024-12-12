import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

async function webComponentApp() {
  const app = await createApplication({
    providers: [provideAnimations()],
  });
  const MyComponent = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('my-app', MyComponent);
  
}

(async function () {
  await webComponentApp();
})();
