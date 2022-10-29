import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private productService: ProductsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  get title() {
    return this.form.controls.title as FormControl;
  }

  submit() {
    if (this.title.errors) {
      return;
    }

    this.productService
      .create({
        title: this.form.value.title!,
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.9, count: 120 },
      })
      .subscribe(() => {
        this.modalService.close();
      });
  }
}
