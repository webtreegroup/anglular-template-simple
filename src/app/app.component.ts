import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProductProps } from './models/products';
import { ModalService } from './services/modal.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular app';

  loading = false;

  term = '';

  // products: ProductProps[] = [];

  products$: Observable<ProductProps[]>;

  constructor(
    private productService: ProductsService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    // this.productService.getAll().subscribe((products) => {
    //   this.products = products;
    //   this.loading = false;
    // });

    this.products$ = this.productService
      .getAll()
      .pipe(tap(() => (this.loading = false)));
  }
}
