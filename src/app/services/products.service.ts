import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { ProductProps } from '../models/products';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getAll(): Observable<ProductProps[]> {
    return (
      this.http
        // .get<ProductProps[]>('https://fakestoreapi.com/products1', { - to call error
        .get<ProductProps[]>('https://fakestoreapi.com/products', {
          params: new HttpParams({ fromObject: { limit: 5 } }),
        })
        .pipe(delay(2000), catchError(this.errorHandler.bind(this)))
    );
  }

  create(product: ProductProps): Observable<ProductProps> {
    return this.http.post<ProductProps>(
      'https://fakestoreapi.com/products',
      product
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);

    return throwError(() => error.message);
  }
}
