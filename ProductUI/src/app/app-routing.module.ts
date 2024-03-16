import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { Error404Component } from './Components/error404/error404.component';

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'edit-product/:id', component: EditProductComponent},
  {path: '404', pathMatch: 'full', component: Error404Component},
  {path: '**', pathMatch: 'full', component: Error404Component} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
