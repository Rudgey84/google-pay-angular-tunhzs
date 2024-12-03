import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';

async function webComponentApp() {
  const app = await createApplication({
    providers: [],
  });
  const MyComponent = createCustomElement(AppComponent, {
    injector: app.injector,
  });
  customElements.define('my-app', MyComponent);
}

(async function () {
  await webComponentApp();
})();
