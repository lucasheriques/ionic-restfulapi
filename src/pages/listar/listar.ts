import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ListaralunosPage } from '../listaralunos/listaralunos';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ListarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-listar',
  templateUrl: 'listar.html',
})
export class ListarPage {

  cursos: any;
  curso = { nome: '' };

  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public restProvider: RestProvider) {
    this.getCursos();
  }

  getCursos() {
    this.restProvider.getCursos()
    .then(data => {
      this.cursos = data;
    });
  }

  addCurso() {
    this.restProvider.addCurso(this.curso).then((result) => {
      console.log(result);
      this.getCursos();
      let toast = this.toastCtrl.create({
        message: 'Curso criado com sucesso',
        duration: 1500,
        position: 'bottom'
      });
      toast.present();
    }, (err) => {
      console.log(err);
    });
  }

  verAlunos(id, nome) {
    this.navCtrl.push(ListaralunosPage, {
      cursoId: id,
      cursoNome: nome
    });
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.getCursos();
  }

}
