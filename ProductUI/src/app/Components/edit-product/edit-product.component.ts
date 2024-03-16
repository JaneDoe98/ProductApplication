import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  productToEdit: Product = new Product(0, '', 0);
  id?: number;

  constructor(private productService: ProductService, public router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.productService
      .getProduct(this.id)
      .subscribe({
        next: result => {
          this.productToEdit = result
        },

        error: err => {
          if (err.status === 404) {
            this.router.navigate(['/404'])
          }
          return;
        }
      })
  }

  EditProduct() {
    this.productService
      .editProduct(this.productToEdit)
      .subscribe()

    this.router.navigate(['/products'])
  }
}
