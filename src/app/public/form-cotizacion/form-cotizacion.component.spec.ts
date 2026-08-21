import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCotizacionComponent } from './form-cotizacion.component';
import { TEST_PROVIDERS } from '../../../test-setup';

describe('FormCotizacionComponent', () => {
  let component: FormCotizacionComponent;
  let fixture: ComponentFixture<FormCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCotizacionComponent],
      providers: TEST_PROVIDERS
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
