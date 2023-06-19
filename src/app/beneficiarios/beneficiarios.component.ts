import { Component } from '@angular/core';
import { BeneficiariosService } from './beneficiarios.service';
import { Beneficiario } from './beneficiario.interface';

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.css']
})
export class BeneficiariosComponent {

  private beneficiarios: Beneficiario[] = [];

  constructor(private service: BeneficiariosService) {}

  ngOnInit() {
    this.service.list().subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    });
  }

}
