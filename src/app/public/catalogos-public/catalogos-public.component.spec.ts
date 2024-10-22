import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogosPublicComponent } from './catalogos-public.component';

describe('CatalogosPublicComponent', () => {
  let component: CatalogosPublicComponent;
  let fixture: ComponentFixture<CatalogosPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogosPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogosPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
