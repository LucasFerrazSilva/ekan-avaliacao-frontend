import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioBeneficiarioComponent } from './formulario-beneficiario.component';

describe('FormularioBeneficiarioComponent', () => {
  let component: FormularioBeneficiarioComponent;
  let fixture: ComponentFixture<FormularioBeneficiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioBeneficiarioComponent]
    });
    fixture = TestBed.createComponent(FormularioBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
