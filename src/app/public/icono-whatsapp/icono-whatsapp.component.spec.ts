import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconoWhatsappComponent } from './icono-whatsapp.component';
import { TEST_PROVIDERS } from '../../../test-setup';

describe('IconoWhatsappComponent', () => {
  let component: IconoWhatsappComponent;
  let fixture: ComponentFixture<IconoWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconoWhatsappComponent],
      providers: TEST_PROVIDERS
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconoWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
