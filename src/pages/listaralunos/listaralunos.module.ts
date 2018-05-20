import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaralunosPage } from './listaralunos';

@NgModule({
  declarations: [
    ListaralunosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaralunosPage),
  ],
})
export class ListaralunosPageModule {}
