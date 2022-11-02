import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { ProductProps } from '../models/products';
import { catchError, delay, Observable, retry, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  products: ProductProps[] = [];

  getAll(): Observable<ProductProps[]> {
    return this.http
      .get<ProductProps[]>('https://fakestoreapi.com/products', {
        params: new HttpParams({ fromObject: { limit: 10 } }),
      })
      .pipe(
        delay(200),
        retry(2),
        tap((products) => (this.products = products)),
        catchError(this.errorHandler.bind(this))
      );
  }

  create(product: ProductProps): Observable<ProductProps> {
    return this.http
      .post<ProductProps>('https://fakestoreapi.com/products', product)
      .pipe(tap((product) => this.products.push(product)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);

    return throwError(() => error.message);
  }
}
