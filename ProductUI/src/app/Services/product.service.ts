import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "https://localhost:7088/product"

  constructor(private httpClient: HttpClient) { }

  getListOfProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url)
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + '/' + id)
  }

  createNewProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, product)

  }

  editProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.url, product)
  }

  deleteProduct(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.url + '/' + id)
  }
}
