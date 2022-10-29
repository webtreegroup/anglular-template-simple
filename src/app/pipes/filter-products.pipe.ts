import { Pipe, PipeTransform } from '@angular/core';
import { ProductProps } from '../models/products';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: ProductProps[], search: string): ProductProps[] {
    return products.filter((p) =>
      p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}
