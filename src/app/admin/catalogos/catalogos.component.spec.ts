import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogosComponent } from './catalogos.component';
import { TEST_PROVIDERS } from '../../../test-setup';

describe('CatalogosComponent', () => {
  let component: CatalogosComponent;
  let fixture: ComponentFixture<CatalogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogosComponent],
      providers: TEST_PROVIDERS
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
