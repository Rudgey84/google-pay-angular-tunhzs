import { Component, ViewEncapsulation, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import 'zone.js';
import { ModalComponent } from "./modal.component";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
  } from "@angular/material/dialog";
  import { MatDialogModule } from "@angular/material/dialog";
@Component({
  selector: 'internal-app-root',
  standalone: true,
  imports: [GooglePayButtonModule, MatDialogModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <google-pay-button environment="TEST" [paymentRequest]="paymentRequest" 
    (loadpaymentdata)="onLoadPaymentData($event)"></google-pay-button>
    <button mat-flat-button [disabled]="!name.length" color="primary" type="button" (click)="OpenModal()" style="margin:0px 20px;">Open Modal</button>
  `,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class InnerComponent {

    constructor(
        private matDialog: MatDialog
      ) {}

      matDialogRef!: MatDialogRef<ModalComponent>;
      names: string = "";


  @Input() name = 'Fusion';
  buttonColor = 'black';
  buttonType = 'buy';
  isCustomSize = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;

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

  onLoadPaymentData(event: any) {
    console.log('load payment data', event.detail);
  }

  OpenModal() {
    this.matDialogRef = this.matDialog.open(ModalComponent, {
      data: { name: this.name },
      disableClose: true
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.name = "";
      }
    });
  }
}