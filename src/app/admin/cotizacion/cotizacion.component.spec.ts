import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionComponent } from './cotizacion.component';
import { TEST_PROVIDERS } from '../../../test-setup';

describe('CotizacionComponent', () => {
  let component: CotizacionComponent;
  let fixture: ComponentFixture<CotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizacionComponent],
      providers: TEST_PROVIDERS
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
