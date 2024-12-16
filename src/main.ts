import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

async function initializeWebComponentApp() {
  try {
    const app = await createApplication({
      providers: [provideAnimations()],
    });
    const MyComponent = createCustomElement(AppComponent, {
      injector: app.injector,
    });

    if (!customElements.get('my-app')) {
      customElements.define('my-app', MyComponent);
    }
  } catch (error) {
    console.error('Error initializing web component app:', error);
  }
}

(async function () {
  await initializeWebComponentApp();
})();
