import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import 'zone.js';
@Component({
  selector: 'internal-app-root',
  standalone: true,
  imports: [GooglePayButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <google-pay-button environment="TEST" [paymentRequest]="paymentRequest" 
    (loadpaymentdata)="onLoadPaymentData($event)"></google-pay-button>
  `,
})
export class AppComponent {
  @Input() name = 'Fusion';
  buttonColor = 'black';
  buttonType = 'buy';
  isCustomSize = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;

  paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  };

  onLoadPaymentData(event: any) {
    console.log('load payment data', event.detail);
  }
}
