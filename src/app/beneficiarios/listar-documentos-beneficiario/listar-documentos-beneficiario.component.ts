import { Component } from '@angular/core';
import { BeneficiariosService } from '../beneficiarios.service';
import { Beneficiario } from '../beneficiario.interface';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BeneficiarioComDocumentos } from '../beneficiario-com-documentos.interface';

@Component({
  selector: 'app-listar-documentos-beneficiario',
  templateUrl: './listar-documentos-beneficiario.component.html',
  styleUrls: ['./listar-documentos-beneficiario.component.css']
})
export class ListarDocumentosBeneficiarioComponent {

  beneficiario: BeneficiarioComDocumentos | undefined = undefined;

  constructor(private service: BeneficiariosService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getBeneficiario();
  }

  getBeneficiario() {
    const id = this.route.snapshot.paramMap.get('id') || undefined;
    this.service.get(id).subscribe(data => this.beneficiario = data);
  }

}
