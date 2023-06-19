import { Component } from '@angular/core';
import { BeneficiariosService } from './beneficiarios.service';
import { Beneficiario } from './beneficiario.interface';

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.css']
})
export class BeneficiariosComponent {

  beneficiarios: Beneficiario[] = [];
  displayedColumns = ['nome', 'telefone', 'dataNascimento', 'dataInclusao', 'dataAtualizacao', 'acoes'];

  constructor(private service: BeneficiariosService) {}

  ngOnInit() {
    this.service.list().subscribe({
      next: data => this.beneficiarios = data,
      error: err => console.log(err)
    });
  }

  edit(id: number) {
    console.log(id);
  }

  delete(id: number) {
    console.log(id);
  }

}
