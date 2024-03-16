import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {

  products: Array<Product> = new Array<Product>

  errorMsgStyle = {}

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    this.productService
      .getListOfProducts()
      .subscribe((result) => { this.products = result })
  }

  Delete(id: number) {
    this.productService
      .deleteProduct(id)
      .subscribe({
        error: err => {
          if (err.status === 404) {
            this.errorMsgStyle = {
              'display': 'block'
            }
          }
          return;
        },

        complete: () => {
          window.location.reload()
        }
      })
  }
}
