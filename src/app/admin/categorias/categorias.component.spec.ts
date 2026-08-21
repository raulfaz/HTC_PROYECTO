import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasComponent } from './categorias.component';
import { TEST_PROVIDERS } from '../../../test-setup';

describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasComponent],
      providers: TEST_PROVIDERS
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
