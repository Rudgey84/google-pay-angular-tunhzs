import { Component, ViewEncapsulation, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import 'zone.js';
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'internal-app-root',
  standalone: true,
  imports: [GooglePayButtonModule, MatDialogModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <google-pay-button
      environment="TEST"
      [paymentRequest]="paymentRequest"
    ></google-pay-button>
    <p>{{requestKey}}</p>
    <p>{{sessionToken}}</p>
    <p>{{password}}</p>
    <p>{{baseUrl}}</p>
    <p>{{merchantId}}</p>
  `,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class InnerComponent {
  constructor() {}

  @Input() requestKey: string = '';
  @Input() sessionToken: string = '';
  @Input() password: string = '';
  @Input() baseUrl: string = '';
  @Input() merchantId: string = '';

  paymentRequest: google.payments.api.PaymentDataRequest = {
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
}
