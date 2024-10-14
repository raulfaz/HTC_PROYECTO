import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosulComponent } from './carrosul.component';

describe('CarrosulComponent', () => {
  let component: CarrosulComponent;
  let fixture: ComponentFixture<CarrosulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrosulComponent]
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
