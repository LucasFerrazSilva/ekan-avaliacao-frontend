import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NovoBeneficiario } from './novo-beneficiario.interface';
import { BeneficiariosService } from '../beneficiarios.service';
import { Router } from '@angular/router';
import { ValidationError } from 'src/app/auth/login/validation-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-novo-beneficiario',
  templateUrl: './novo-beneficiario.component.html',
  styleUrls: ['./novo-beneficiario.component.css']
})
export class NovoBeneficiarioComponent {

  errors: string[] = [];

  form = this.formBuilder.group({
    nome: ['', Validators.required],
    telefone: ['', Validators.required],
    dataNascimento: new FormControl<Date | null>(null, Validators.required),
    documentosDTOs: this.formBuilder.array([])
  });

  constructor(
    private formBuilder: FormBuilder, 
    private service: BeneficiariosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addDocumento();
  }

  onSubmit() {
    const novoBeneficiario: NovoBeneficiario = this.form.value as NovoBeneficiario;
    this.service.create(novoBeneficiario).subscribe({
      next: data => this.router.navigate(['/']),
      error: err => this.handleError(err)
    });
  }

  get documentos(): FormArray {
    return this.form.controls['documentosDTOs'] as FormArray;
  }

  get documentosFormArrayControls(): FormGroup[] {
    return this.documentos.controls as FormGroup[];
  }

  addDocumento() {
    const documentoForm = this.formBuilder.group({
      tipoDocumento: ['', Validators.required],
      descricao: ['', Validators.required]
    });

    this.documentos.push(documentoForm);
  }

  deleteDocumento(index: number) {
    this.documentos.removeAt(index);
  }

  private handleError(err: HttpErrorResponse) {
    this.errors = [];
    if (Array.isArray(err.error)) {
      err.error.forEach(error => this.errors.push(`${error.field}: ${error.message}`));
    } else {
      this.errors.push(err.error as string);
    }
  }

}
