import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  
})
export class DirectivaComponent {
  listCurso : String[] = ['TypeScrip','JavaScrip','Java SE','C#',"php"]; //atributo
  habilitar: boolean = true;//atributo

  setHabilitar(): void {// metodo para cambir a oculta o  mostrar
    this.habilitar = (this.habilitar == true)? false: true; 
  }

}
