import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaDialogComponent } from './categoria-dialog.component';
import { TEST_PROVIDERS } from '../../../../test-setup';

describe('CategoriaDialogComponent', () => {
  let component: CategoriaDialogComponent;
  let fixture: ComponentFixture<CategoriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaDialogComponent],
      providers: TEST_PROVIDERS
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
