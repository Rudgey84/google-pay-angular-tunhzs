import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import 'zone.js';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'internal-component',
  standalone: true,
  imports: [GooglePayButtonModule, MatButtonModule, CommonModule],
  template: `
  <google-pay-button
  [ngClass]="{'hidden': isLoading}"
    environment="TEST"
    [paymentRequest]="paymentRequest"
  ></google-pay-button>
  <p>{{requestKey}}</p>
  <p>{{sessionToken}}</p>
  <p>{{password}}</p>
  <p>{{baseUrl}}</p>
  <p>{{merchantId}}</p>
  <div mat-dialog-actions align="end">
    <button mat-stroked-button
      type="button"
      mat-stroked-button
      color="primary"
      (click)="cancel()"
    >
      Cancel
    </button>
  </div>
  `
})
export class InnerComponent implements OnChanges {
  @Input() requestKey: string = '';
  @Input() sessionToken: string = '';
  @Input() password: string = '';
  @Input() baseUrl: string = '';
  @Input() merchantId: string = '';

  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();

  isLoading: boolean = true;

  @Output() loadingState: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.loadingState.emit(this.isLoading); // Notify parent
    }, 1000);
  }

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

  ngOnChanges(changes: SimpleChanges): void {
    // Check if all inputs are set
    if (
      this.requestKey &&
      this.sessionToken &&
      this.password &&
      this.baseUrl &&
      this.merchantId
    ) {
      this.isLoading = false; // Stop loading when all data is ready
    }
  }
  

  cancel(): void {
    this.closeDialog.emit();
  }
}
