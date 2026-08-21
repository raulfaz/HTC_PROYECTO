import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaComponent } from './empresa.component';
import { TEST_PROVIDERS } from '../../../test-setup';

describe('EmpresaComponent', () => {
  let component: EmpresaComponent;
  let fixture: ComponentFixture<EmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaComponent],
      providers: TEST_PROVIDERS
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
