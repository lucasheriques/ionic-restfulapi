import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DetalhesPage } from '../detalhes/detalhes';

/**
 * Generated class for the ListaralunosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaralunos',
  templateUrl: 'listaralunos.html',
})
export class ListaralunosPage {

  alunos: any;
  aluno = { nome: '', nota: '', cursoId: '' }
  curso = { id: '', nome: '' };

  constructor(private toastCtrl : ToastController, public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.curso.id = navParams.get('cursoId');
    this.curso.nome = navParams.get('cursoNome');
    console.log(this.curso);
    this.getEstudantesCurso();
  }

  getEstudantesCurso() {
    this.restProvider.getEstudantesCurso(this.curso.id)
    .then(data => {
      this.alunos = data;
    });
  }

  deleteCurso() {
    this.restProvider.deleteCurso(this.curso.id)
    .then(data => {
      console.log(data);
      this.navCtrl.pop();
    });
  }

  addEstudante() {
    this.aluno.cursoId = this.curso.id;
    this.restProvider.addEstudante(this.aluno).then((result) => {
      console.log(result);
      this.getEstudantesCurso();
    }, (err) => {
      console.log(err);
    });
  }

  editCurso() {
    this.restProvider.editCurso(this.curso.id, this.curso).then((result) => {
      let toast = this.toastCtrl.create({
        message: 'Curso editado com sucesso',
        duration: 1500,
        position: 'bottom'
      });
      toast.present();
    }, (err) => {
      console.log(err);
    });
  }

  detalhesEstudante(id, nome, nota, cursoId) {
    this.navCtrl.push(DetalhesPage, {
      id: id,
      nome: nome,
      nota: nota,
      cursoId: cursoId
    });
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.getEstudantesCurso();
  }

}
