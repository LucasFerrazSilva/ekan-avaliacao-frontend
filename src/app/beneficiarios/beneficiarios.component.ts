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
    this.loadList();
  }

  edit(id: number) {
    console.log(id);
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.loadList());
  }

  private loadList() {
    this.service.list().subscribe({
      next: data => this.beneficiarios = data,
      error: err => console.log(err)
    });
  }

}
