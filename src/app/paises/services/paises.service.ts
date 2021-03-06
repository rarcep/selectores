import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisSmall, Pais } from '../interfaces/paises.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUrl: string ='https://restcountries.eu/rest/v2';

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  paisEmpty: PaisSmall[] = [{
    name: 'NA',
    alpha3Code: 'NA'
  }];
  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    const url: string = `${this._baseUrl}/region/${region}?fields=name;alpha3Code`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(paisCode: string): Observable<Pais | null> {
    if(!paisCode) {
      return of(null);
    }
    const url: string = `${this._baseUrl}/alpha/${paisCode}`;
    return this.http.get<Pais>(url);
  }

  getPaisPorCodigoSmall(paisCode: string): Observable<PaisSmall> {
    const url: string = `${this._baseUrl}/alpha/${paisCode}?fields=name;alpha3Code`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigos( borders: string[]): Observable<PaisSmall[]> {
    if(!borders || borders.length === 0 || borders === undefined) {
      return of([]);
    }
    const peticiones: Observable<PaisSmall>[] = [];
    borders.forEach( codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });
    return combineLatest( peticiones);
  }
}
