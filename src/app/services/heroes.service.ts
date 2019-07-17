import { HeroeModel } from "./../models/heroe.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HeroesService {
  private url = "https://login-app-b45e0.firebaseio.com";
  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((data: any) => {
        // console.log("data ", data);
        heroe.id = data.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    // Rompemos la referencia de js, en js todo se pasa por referencia
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`).pipe(
      // map( (resp: any) => this.crearArreglo(resp))
      // se puede resumir asi
      map(this.crearArreglo)
    );
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  deleteHeroe(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArreglo(heroesObj: Object) {
    const heroes: HeroeModel[] = [];
    // console.log(heroesObj);
    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }
}
