import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogosPublicComponent } from './catalogos-public.component';
import { TEST_PROVIDERS } from '../../../test-setup';

describe('CatalogosPublicComponent', () => {
  let component: CatalogosPublicComponent;
  let fixture: ComponentFixture<CatalogosPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogosPublicComponent],
      providers: TEST_PROVIDERS
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
