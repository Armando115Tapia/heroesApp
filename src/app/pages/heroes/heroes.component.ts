import  Swal  from 'sweetalert2';
import { HeroeModel } from './../../models/heroe.model';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[];
  constructor(private heroesService: HeroesService) {
  }

  ngOnInit() {
    this.heroesService.getHeroes().subscribe( (resp) => this.heroes = resp);
  }

  borrarHeroe(heroe: HeroeModel, i: number){

    Swal.fire({
      title: "Está seguro?",
      text: `Esta seguro de eliminar a ${heroe.nombre} `,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if(resp.value){
        this.heroes.splice(i, 1);
        this.heroesService.deleteHeroe(heroe.id).subscribe();
      }

    });

  }

}
