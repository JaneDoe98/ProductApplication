import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProductListComponent } from './product-list.component';
import { Product } from 'src/app/Models/product';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;


  const serviceSpy = jasmine.createSpyObj('ProductService', ['getListOfProducts']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });

    component = new ProductListComponent(serviceSpy)

  });

  it('should get products', () => {

    const response: Product[] = [
      {
        id: 1,
        name: 'Tej',
        price: 380,
      },
      {
        id: 2,
        name: 'Banán',
        price: 230,
      }
    ];
    serviceSpy.getListOfProducts.and.returnValue(of(response));


    component.ngOnInit();


    expect(component.products).toEqual(response);
  });

  it('should display correct data in table', () => {

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    const productList: Product[] = [
      {
        id: 1,
        name: 'Tej',
        price: 380,
      },
      {
        id: 2,
        name: 'Banán',
        price: 230,
      },
      {
        id: 3,
        name: 'Eper',
        price: 600,
      }
    ];
    component.products = productList


    fixture.detectChanges();


    let tableRows = fixture.nativeElement.querySelectorAll('tr');

    let row1 = tableRows[1];
    let row2 = tableRows[2];
    let row3 = tableRows[3];

    expect(tableRows.length).toBe(4);

    expect(row1.cells[0].innerHTML).toBe('Tej');
    expect(row1.cells[1].innerHTML).toBe('380');

    expect(row2.cells[0].innerHTML).toBe('Banán');
    expect(row2.cells[1].innerHTML).toBe('230');

    expect(row3.cells[0].innerHTML).toBe('Eper');
    expect(row3.cells[1].innerHTML).toBe('600');
  })

  it('should execute delete function', async () => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    const productList: Product[] = [
      {
        id: 1,
        name: 'Tej',
        price: 380,
      },
      {
        id: 2,
        name: 'Banán',
        price: 230,
      },
      {
        id: 3,
        name: 'Eper',
        price: 600,
      }
    ];
    component.products = productList

    const deleteSpy = spyOn(component, 'Delete').withArgs(2).and.callThrough()


    fixture.detectChanges();


    let buttons = fixture.debugElement.nativeElement.querySelectorAll("button[class='btn btn-danger']");

    buttons[1].click();

    expect(deleteSpy).toHaveBeenCalled()
  })
})

