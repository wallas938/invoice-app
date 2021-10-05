import { animate, state, style, transition, trigger } from '@angular/animations';
import { formatNumber } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/core/services/store/store.service';
import { InvoiceCreateDto, Item } from 'src/app/models/invoice';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import Utils from 'src/app/shared/utils';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  animations: [
    trigger("formState", [
      state('close', style({
        opacity: '0',
        display: 'none'
        //transform: 'translateX(-500px)'
      })),
      state('open', style({
        opacity: '1',
        display: 'unset'

      })),
      transition('close <=> open', animate(350)),
    ])
  ],
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  displayStatus: string = 'close';
  formGlobalError: string = 'All fields must be completed!';
  itemsErrorMessage: string = 'An item must be completed!';
  errors: string[] = [];
  hasError: boolean = false;
  invoiceForm: FormGroup = this.fb.group({
    fromStreet: ['', [
      Validators.required,
      Validators.minLength(10)
    ]],
    fromCity: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    fromPostCode: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    fromCountry: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    clientName: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    email: ['', [
      Validators.required,
      Validators.pattern(Utils.Regex.emailRegex)
    ]],
    toStreet: ['', [
      Validators.required,
      Validators.minLength(10)
    ]],
    toCity: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    toPostCode: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    toCountry: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    invoiceDate: ['', [
      Validators.required
    ]],
    term: ['1', [
      Validators.required
    ]],
    desc: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    items: this.fb.array([this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['1', Validators.required],
      price: ['0', Validators.required],
      total: ['0', Validators.required]
    })])
  });

  constructor(private storeService: StoreService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private alertService: AlertService,
              private invoiceService: InvoiceService,
              private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getFormsItems()?.valueChanges
      .subscribe((_) => {
        //** Display errors when one or more fields of an item is missing */
        if (this.getFormsItems().valid) {
          this.errors = this.errors.filter((message) => message !== this.itemsErrorMessage);
        } else {
          !this.errors.includes(this.itemsErrorMessage) &&
            this.errors.push(this.itemsErrorMessage);
        }
        //** Compute total for each individual item */
        this.getFormsItems().controls.forEach((itemControl: AbstractControl) => {
          const total = +itemControl.get('price')?.value * +itemControl.get('quantity')?.value;
          if (!Number.isNaN(total) && +itemControl.get('total')?.value != total) {
            itemControl.get('total')?.setValue(total.toFixed(2).toString());
          }
        })
      });

    this.storeService.isInvoiceFormIsDisplayed$
      .subscribe((displayStatus) => {
        this.displayStatus = displayStatus ? 'open' : 'close';
      });
  };

  submit() {
    //** For inputs validation */
    if (this.invoiceForm.invalid) {
      !this.errors.includes(this.formGlobalError) && this.errors.push(this.formGlobalError)
      return;
    }
    //** For inputs validation */
    const newInvoice: InvoiceCreateDto = {
      fromStreet: this.invoiceForm.get('fromStreet')?.value.trim(),
      fromCity: this.invoiceForm.get('fromCity')?.value.trim(),
      fromPostCode: this.invoiceForm.get('fromPostCode')?.value.trim(),
      fromCountry: this.invoiceForm.get('fromCountry')?.value.trim(),
      clientName: this.invoiceForm.get('clientName')?.value.trim(),
      email: this.invoiceForm.get('email')?.value.trim(),
      toStreet: this.invoiceForm.get('toStreet')?.value.trim(),
      toCity: this.invoiceForm.get('toCity')?.value.trim(),
      toPostCode: this.invoiceForm.get('toPostCode')?.value.trim(),
      toCountry: this.invoiceForm.get('toCountry')?.value.trim(),
      invoiceDate: this.invoiceForm.get('invoiceDate')?.value.trim(),
      term: this.invoiceForm.get('term')?.value.trim(),
      desc: this.invoiceForm.get('desc')?.value.trim(),
      items: this.invoiceForm.get('items')?.value.map(
        (item: Item) => {
          item.price = formatNumber(+item.price, 'en-US', '1.2')
          console.log(item.price);
          return item;
        }
      ),
      totalAmount: this.computeTotalAmount(),
    };
    this.verifyInput(newInvoice);

    if (!this.hasError) {
      this.loadingService.setLoadingStatus(true);
      this.invoiceService.saveInvoice(newInvoice)
        .subscribe((result: any) => {
          this.alertService.setMessage(result.message, "success");
          this.invoiceService.setNewInvoiceCreatedStatus(true);
          this.closeInvoiceForm();
          this.loadingService.setLoadingStatus(false);
          this.openSnackBar();
        },
          ({ error }: HttpErrorResponse) => {
            if (!error.message) {
              this.alertService.setMessage("An server error occurs...", "error");
              this.invoiceService.setNewInvoiceCreatedStatus(false);
              this.loadingService.setLoadingStatus(false);
              this.openSnackBar();
              return;
            }
            this.alertService.setMessage(error.message, "error");
            this.invoiceService.setNewInvoiceCreatedStatus(false);
            this.loadingService.setLoadingStatus(false);
            this.openSnackBar();
          });
    } else {
      this.alertService.setMessage('One or many of the entered inputs is wrong!', 'error');
      this.openSnackBar();
    };
  };

  onAddList() {
    if (this.getFormsItems().invalid) {
      !this.errors.includes(this.itemsErrorMessage) && this.errors.push(this.itemsErrorMessage);
      return;
    }
    (<FormArray>this.invoiceForm.get('items')).push(this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['1', Validators.required],
      price: ['0', Validators.required],
      total: ['0', Validators.required]
    }));

    this.errors = this.errors.filter((message) => message !== this.itemsErrorMessage);
  };

  getFormsItems() {
    return (<FormArray>this.invoiceForm.get('items'));
  };

  closeInvoiceForm() {
    this.invoiceService.setInvoiceFormDisplayStatus(false);
    this.invoiceForm.reset();
  };

  deleteItem(itemIndex: number) {
    this.getFormsItems().removeAt(itemIndex);
  };

  verifyInput(inputs: any) {
    this.hasError = false;
    const specialFields = ['totalAmount', 'items', 'invoiceDate', 'term'];
    const itemNumericFields = ['price', 'quantity'];
    for (const input in inputs) {
      if (!specialFields.includes(input)) {
        if (inputs[input].trim() === "") {
          this.hasError = true;
        }
      }
    };

    for (const input in inputs) {
      if (input === 'items') {
        for (const item of inputs[input]) {
          for (const prop in item) {
            if (item[prop].trim() === "") {
              this.hasError = true;
            }
            if (itemNumericFields.includes(prop) && isNaN(+item[prop])) {
              this.hasError = true;
            }
          }
        }
      }
    };
  };

  computeTotalAmount(): string {
    let totalAmount = 0;
    (this.getFormsItems().value as Array<any>)
      .forEach((item: Item) => {
        totalAmount += +item.quantity * +item.price
      });
    return formatNumber(totalAmount, 'en-US', '1.2');
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000
    });
  };
}
