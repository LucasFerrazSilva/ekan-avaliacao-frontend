import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarBeneficiarioComponent } from './atualizar-beneficiario.component';

describe('AtualizarBeneficiarioComponent', () => {
  let component: AtualizarBeneficiarioComponent;
  let fixture: ComponentFixture<AtualizarBeneficiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtualizarBeneficiarioComponent]
    });
    fixture = TestBed.createComponent(AtualizarBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
