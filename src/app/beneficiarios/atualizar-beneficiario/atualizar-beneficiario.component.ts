import { Component } from '@angular/core';
import { BeneficiariosService } from '../beneficiarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiario } from '../beneficiario.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-atualizar-beneficiario',
  templateUrl: './atualizar-beneficiario.component.html',
  styleUrls: ['./atualizar-beneficiario.component.css']
})
export class AtualizarBeneficiarioComponent {

  beneficiario: Beneficiario | undefined;
  errors: string[] = [];
  form: FormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    nome: ['', Validators.required],
    telefone: ['', Validators.required],
    dataNascimento: ['', Validators.required],
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

  updateBeneficiario(data: Beneficiario) {
    this.beneficiario = data;
    this.form = this.formBuilder.group({
      id: [this.beneficiario.id, Validators.required],
      nome: [this.beneficiario.nome, Validators.required],
      telefone: [this.beneficiario.telefone, Validators.required],
      dataNascimento: [this.beneficiario.dataNascimento + 'T00:00:00', Validators.required],
    });
  }

  onSubmit() {
    const beneficiarioAtualizado: Beneficiario = this.form.value;
    this.service.update(beneficiarioAtualizado).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.handleError(err)
    });
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
