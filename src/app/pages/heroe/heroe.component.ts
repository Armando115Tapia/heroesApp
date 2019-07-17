import { HeroesService } from "./../../services/heroes.service";
import { HeroeModel } from "./../../models/heroe.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import  Swal  from 'sweetalert2'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styleUrls: ["./heroe.component.css"]
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor( private heroeService: HeroesService, private router: ActivatedRoute) {}

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
       this.heroeService.getHeroe(id).subscribe( (data: HeroeModel) => {
         this.heroe = data;
         this.heroe.id = id;
        } )
    } else{

    }
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log("Formulario no valido");
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información !',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

let peticion: Observable<any>;

    if (this.heroe.id) {
         peticion = this.heroeService
        .actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroeService
      .crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        type: "success"
      })
    });
  }
}
