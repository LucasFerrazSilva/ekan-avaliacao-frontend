import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiario } from './beneficiario.interface';
import { environment } from 'src/environments/environment';
import { BeneficiarioComDocumentos } from './beneficiario-com-documentos.interface';

const API_URL = environment.apiUrl + '/beneficiarios';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariosService {

  constructor(private http: HttpClient) { }

  list(): Observable<Beneficiario[]> {
    return this.http.get<Beneficiario[]>(`${API_URL}`);
  }
  
  create(beneficiario: Beneficiario): Observable<Beneficiario> {
    return this.http.post<Beneficiario>(`${API_URL}`, beneficiario);
  }

  delete(id: number) {
    return this.http.delete(`${API_URL}/${id}`);
  }

  get(id: string | undefined) {
    return this.http.get<BeneficiarioComDocumentos>(`${API_URL}/${id}`);
  }

  update(beneficiario: Beneficiario) {
    return this.http.put(`${API_URL}/${beneficiario.id}`, beneficiario);
  }

}
