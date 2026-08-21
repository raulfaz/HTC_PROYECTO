import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosulComponent } from './carrosul.component';
import { TEST_PROVIDERS } from '../../../test-setup';

describe('CarrosulComponent', () => {
  let component: CarrosulComponent;
  let fixture: ComponentFixture<CarrosulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrosulComponent],
      providers: TEST_PROVIDERS
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrosulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
