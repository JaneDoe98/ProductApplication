import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AddProductComponent } from './add-product.component';
import { Product } from 'src/app/Models/product';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let router: Router;
  let http: HttpClient

  const serviceSpy = jasmine.createSpyObj('ProductService', ['createNewProduct']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule]
    })

    router = TestBed.inject(Router)

    component = new AddProductComponent(serviceSpy, router, http)

    fixture = TestBed.createComponent(AddProductComponent);

    spyOn(router, 'navigate')
  });

  it('should form show base values', async () => {
    component = fixture.componentInstance;

    let formInputs = fixture.nativeElement.querySelectorAll('input');

    let inputId = formInputs[0];
    let inputName = formInputs[1];
    let inputPrice = formInputs[2];



    await fixture.detectChanges();



    expect(formInputs.length).toBe(3);

    expect(inputId.value).toBe('0');
    expect(inputName.value).toBe('');
    expect(inputPrice.value).toBe('0');
  })

  it('should execute submit function', async () => {
    component = fixture.componentInstance;
    const form = fixture.debugElement.query(By.css('#product-form'))
    const addSpy = spyOn(component, 'AddProduct')

    const dataToCreate: Product = {
      id: 2,
      name: 'Banán',
      price: 230,
    }

    let formInputs = fixture.nativeElement.querySelectorAll('input');

    let inputId = formInputs[0];
    let inputName = formInputs[1];
    let inputPrice = formInputs[2];

    component.product = dataToCreate



    await fixture.detectChanges();



    expect(inputId.value).toBe('2');
    expect(inputName.value).toBe('Banán');
    expect(inputPrice.value).toBe('230');

    form.triggerEventHandler('ngSubmit', component.product)
    expect(addSpy).toHaveBeenCalled()
  })
});
