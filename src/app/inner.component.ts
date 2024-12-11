import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import 'zone.js';

import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from './material.module';

@Component({
  selector: 'internal-component',
  standalone: true,
  imports: [GooglePayButtonModule, DemoMaterialModule, CommonModule],
  template: `
  <div [ngClass]="{'hidden': isLoading}">
  <p>{{requestKey}}</p>
  <p>{{sessionToken}}</p>
  <p>{{password}}</p>
  <p>{{baseUrl}}</p>
  <p>{{merchantId}}</p>
  </div>

 <mat-horizontal-stepper [ngClass]="{'hidden': isLoading}" linear="true" selectedIndex="2" #stepper>
  <mat-step completed="true" editable="false">
    <form>
      <ng-template matStepLabel>Your order</ng-template>
    </form>
  </mat-step>

  <mat-step completed="true" editable="false">
    <form>
      <ng-template matStepLabel>Billing</ng-template>
    </form>
  </mat-step>

  <mat-step>
    <ng-template matStepLabel>Payment</ng-template>
    <mat-card>
      <mat-card-title>
        <h4 class="uxg-h4">Payment method</h4>
      </mat-card-title>
      <mat-card-content>
        <div class="payment-type-container">
          <mat-radio-group aria-label="Select an option" [selected]="visa">
            <mat-radio-button #visa value="visa"><img class="payment-logo" src="https://res.cloudinary.com/ffdc/image/upload/v1593768892/cards_logos_drnu5h.png"></mat-radio-button>
            <mat-radio-button value="paypal"><img class="payment-logo" src="https://res.cloudinary.com/ffdc/image/upload/v1593768982/paypal_logo_st1m41.png"></mat-radio-button>
          </mat-radio-group>
            <google-pay-button
  [ngClass]="{'hidden': isLoading}"
    environment="TEST"
    [paymentRequest]="paymentRequest"
  ></google-pay-button>
        </div>
        <div class="card-form-container">
          <div>
            <mat-form-field appearance="fill" dense class="example-full-width">
              <mat-icon matPrefix dense color="primary">payment</mat-icon>
              <mat-label>Card number</mat-label>
              <input matInput #input maxlength="16" placeholder="Enter card number" value="9871-5000-3456-8374" />
              <mat-hint align="end">{{ input.value?.length || 0 }}/19</mat-hint>
            </mat-form-field>
          </div>
          <div>
            <mat-form-field dense appearance="fill" class="example-full-width">
              <mat-icon color="primary" dense matPrefix>person_outline</mat-icon>
              <mat-label>Name</mat-label>
              <input type="text" matInput value="Tom Rudge"/>
            </mat-form-field>
          </div>
        </div>
        <mat-form-field class="expire-month" dense>
          <mat-label>Month</mat-label>
          <select matNativeControl>
            <option value="january">01</option>
            <option value="february">02</option>
            <option value="march">03</option>
            <option value="april">04</option>
            <option value="may">05</option>
            <option value="june">06</option>
            <option value="july">07</option>
            <option value="august">08</option>
            <option value="september">09</option>
            <option value="october">10</option>
            <option value="november">11</option>
            <option value="december">12</option>
          </select>
        </mat-form-field>
        <mat-form-field class="expire-month" dense>
          <mat-label>Year</mat-label>
          <select matNativeControl>
            <option value="january">2020</option>
            <option value="february">2021</option>
            <option value="march">2022</option>
            <option value="april">2023</option>
            <option value="april">2024</option>
          </select>
        </mat-form-field>
        <mat-form-field dense appearance="fill">
          <mat-icon color="primary" matSuffix dense>help_outline</mat-icon>
          <mat-label>CVC</mat-label>
          <input type="text" matInput />
          <mat-hint>Behind your card</mat-hint>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <span class="fill-remaining-space"></span>
    <button mat-stroked-button
      type="button"
      mat-stroked-button
      color="primary"
      (click)="cancel()"
    >
      Cancel
    </button>
        <button mat-flat-button color="primary" >
          <mat-icon>done</mat-icon>
          Pay
        </button>
      </mat-card-actions>
    </mat-card>
  </mat-step>
  
  <mat-step>
    <ng-template matStepLabel>Confirmation</ng-template>
  </mat-step>
</mat-horizontal-stepper>
  `
})
export class InnerComponent {
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
      this.loadingState.emit(this.isLoading);
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

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (
  //     this.requestKey &&
  //     this.sessionToken &&
  //     this.password &&
  //     this.baseUrl &&
  //     this.merchantId
  //   ) {
  //     this.isLoading = false;
  //   }
  // }
  

  cancel(): void {
    this.closeDialog.emit();
  }
}
