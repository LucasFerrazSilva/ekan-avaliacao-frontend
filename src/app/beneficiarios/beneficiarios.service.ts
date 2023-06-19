import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiario } from './beneficiario.interface';
import { environment } from 'src/environments/environment';
import { NovoBeneficiario } from './novo-beneficiario/novo-beneficiario.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BeneficiariosService {

  constructor(private http: HttpClient) { }

  list(): Observable<Beneficiario[]> {
    return this.http.get<Beneficiario[]>(`${API_URL}/beneficiarios`);
  }
  
  create(novoBeneficiario: NovoBeneficiario): Observable<Beneficiario> {
    return this.http.post<Beneficiario>(`${API_URL}/beneficiarios`, novoBeneficiario);
  }

}
