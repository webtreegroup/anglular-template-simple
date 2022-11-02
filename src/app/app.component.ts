import { Component, OnInit } from '@angular/core';
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

  constructor(
    public productService: ProductsService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.productService.getAll().subscribe(() => {
      this.loading = false;
    });
  }
}
