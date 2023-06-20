import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDocumentosBeneficiarioComponent } from './listar-documentos-beneficiario.component';

describe('ListarDocumentosBeneficiarioComponent', () => {
  let component: ListarDocumentosBeneficiarioComponent;
  let fixture: ComponentFixture<ListarDocumentosBeneficiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarDocumentosBeneficiarioComponent]
    });
    fixture = TestBed.createComponent(ListarDocumentosBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
