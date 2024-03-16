import { Component } from '@angular/core';
import { Product } from '../../Models/product';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  
  product: Product = new Product(0, '', 0);

  errorMsgStyle = {}

  constructor(private productService: ProductService, public router: Router, private http: HttpClient) {

  }

  AddProduct() {
    this.errorMsgStyle = {
      'display': 'none'
    }
    this.productService
      .createNewProduct(this.product)
      .subscribe({
        error: err => {
          if (err.status === 409) {
            this.errorMsgStyle = {
              'display': 'block'
            }
          }
          return;
        },

        complete: () => {
          this.BackToList()
        }
      })
  }

  BackToList() {
    this.router.navigate(['/products'])
  }
}

