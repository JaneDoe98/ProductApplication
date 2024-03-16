import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { EditProductComponent } from './edit-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { By } from '@angular/platform-browser';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let router: Router;
  let route: ActivatedRoute;
  let fixture: ComponentFixture<EditProductComponent>

  const serviceSpy = jasmine.createSpyObj('ProductService', ['editProduct', 'getProduct']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
    });

    router = TestBed.inject(Router)
    route = TestBed.inject(ActivatedRoute)

    const spyRoute = spyOn(route.snapshot.paramMap, 'get')
    spyRoute.and.returnValue('2')

    component = new EditProductComponent(serviceSpy, router, route)

    fixture = TestBed.createComponent(EditProductComponent);
  });

  it('should form show the data received', async () => {
    component = fixture.componentInstance;

    const dataToEdit: Product = {
      id: 1,
      name: 'Tej',
      price: 380,
    }
    let formInputs = fixture.nativeElement.querySelectorAll('input');

    let inputId = formInputs[0];
    let inputName = formInputs[1];
    let inputPrice = formInputs[2];

    component.productToEdit = dataToEdit



    await fixture.detectChanges();



    expect(formInputs.length).toBe(3);

    expect(inputId.value).toBe('1');
    expect(inputName.value).toBe('Tej');
    expect(inputPrice.value).toBe('380');
  })

  it('should execute submit function', async () => {
    component = fixture.componentInstance;
    const form = fixture.debugElement.query(By.css('#product-form'))
    const addSpy = spyOn(component, 'EditProduct')

    const editedData: Product = {
      id: 1,
      name: 'Tej',
      price: 400,
    }

    let formInputs = fixture.nativeElement.querySelectorAll('input');

    let inputId = formInputs[0];
    let inputName = formInputs[1];
    let inputPrice = formInputs[2];

    component.productToEdit = editedData



    await fixture.detectChanges();



    expect(inputId.value).toBe('1');
    expect(inputName.value).toBe('Tej');
    expect(inputPrice.value).toBe('400');

    form.triggerEventHandler('ngSubmit', component.productToEdit)
    expect(addSpy).toHaveBeenCalled()
  })
});
