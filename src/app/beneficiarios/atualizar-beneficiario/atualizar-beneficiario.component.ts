import { Component } from '@angular/core';
import { BeneficiariosService } from '../beneficiarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiario } from '../beneficiario.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BeneficiarioComDocumentos } from '../beneficiario-com-documentos.interface';

@Component({
  selector: 'app-atualizar-beneficiario',
  templateUrl: './atualizar-beneficiario.component.html',
  styleUrls: ['./atualizar-beneficiario.component.css']
})
export class AtualizarBeneficiarioComponent {

  beneficiario: BeneficiarioComDocumentos | undefined;
  errors: string[] = [];
  form: FormGroup = this.formBuilder.group({
    id: ['', Validators.required],
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
    this.service.get(id).subscribe(data => this.updateBeneficiario(data));
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
    const beneficiarioAtualizado: BeneficiarioComDocumentos = this.form.value;
    console.log(beneficiarioAtualizado);
    console.log(JSON.stringify(beneficiarioAtualizado));
    this.service.update(beneficiarioAtualizado).subscribe({
      next: () => this.router.navigate(['/']),
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
      id: [''],
      tipoDocumento: ['', Validators.required],
      descricao: ['', Validators.required]
    });

    this.documentos.push(documentoForm);
  }

  deleteDocumento(index: number) {
    this.documentos.removeAt(index);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
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
