import { Component, Input } from '@angular/core';
import { ProductProps } from 'src/app/models/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product: ProductProps;

  details = false;
}
