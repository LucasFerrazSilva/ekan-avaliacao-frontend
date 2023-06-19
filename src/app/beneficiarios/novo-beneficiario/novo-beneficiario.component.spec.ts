import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoBeneficiarioComponent } from './novo-beneficiario.component';

describe('NovoBeneficiarioComponent', () => {
  let component: NovoBeneficiarioComponent;
  let fixture: ComponentFixture<NovoBeneficiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoBeneficiarioComponent]
    });
    fixture = TestBed.createComponent(NovoBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
