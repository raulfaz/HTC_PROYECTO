import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconoWhatsappComponent } from './icono-whatsapp.component';

describe('IconoWhatsappComponent', () => {
  let component: IconoWhatsappComponent;
  let fixture: ComponentFixture<IconoWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconoWhatsappComponent]
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
