import { Component } from '@angular/core';
import { BeneficiariosService } from '../beneficiarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BeneficiarioComDocumentos } from '../beneficiario-com-documentos.interface';

@Component({
  selector: 'app-formulario-beneficiario',
  templateUrl: './formulario-beneficiario.component.html',
  styleUrls: ['./formulario-beneficiario.component.css']
})
export class FormularioBeneficiarioComponent {

  beneficiario: BeneficiarioComDocumentos | undefined;
  errors: string[] = [];
  form: FormGroup = this.formBuilder.group({
    id: [''],
    nome: ['', Validators.required],
    telefone: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    documentosDTOs: this.formBuilder.array([])
  });

  constructor(
    private service: BeneficiariosService, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBeneficiario();
  }

  getBeneficiario() {
    const id = this.route.snapshot.paramMap.get('id') || undefined;

    if (id)
      this.service.get(id).subscribe(data => this.updateBeneficiario(data));
    else
      this.addDocumento();
  }

  updateBeneficiario(data: BeneficiarioComDocumentos) {
    this.beneficiario = data;
    this.form = this.formBuilder.group({
      id: [this.beneficiario.id, Validators.required],
      nome: [this.beneficiario.nome, Validators.required],
      telefone: [this.beneficiario.telefone, Validators.required],
      dataNascimento: [this.beneficiario.dataNascimento + 'T00:00:00', Validators.required],
      documentosDTOs: this.formBuilder.array([])
    });
    this.beneficiario.documentos.forEach(documento => {
      const documentoForm = this.formBuilder.group({
        id: [documento.id],
        tipoDocumento: [documento.tipoDocumento, Validators.required],
        descricao: [documento.descricao, Validators.required]
      });
  
      this.documentos.push(documentoForm);
    });
  }

  onSubmit() {
    const beneficiarioForm: BeneficiarioComDocumentos = this.form.value;

    if (this.beneficiario) {
      this.service.update(beneficiarioForm).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => this.handleError(err)
      });
    } else {
      this.service.create(beneficiarioForm).subscribe({
        next: data => this.router.navigate(['/']),
        error: err => this.handleError(err)
      });
    }

  }

  get documentos(): FormArray {
    return this.form.controls['documentosDTOs'] as FormArray;
  }

  get documentosFormArrayControls(): FormGroup[] {
    return this.documentos.controls as FormGroup[];
  }

  addDocumento() {
    const documentoForm = this.formBuilder.group({
      id: [''],
      tipoDocumento: ['', Validators.required],
      descricao: ['', Validators.required]
    });

    this.documentos.push(documentoForm);
  }

  deleteDocumento(index: number) {
    this.documentos.removeAt(index);

    if (this.documentos.length == 0)
      this.addDocumento();
  }

  private handleError(err: HttpErrorResponse) {
    this.errors = [];
    if (Array.isArray(err.error)) {
      err.error.forEach(error => this.errors.push(`${error.field}: ${error.message}`));
    } else if (err.error) {
      this.errors.push(err.error as string);
    } else {
      this.errors.push('Erro ao atualizar.');
    }
  }

}
