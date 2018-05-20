import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the DetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {

  estudante = { id: '', nome: '', nota: '', cursoId: '' }

  constructor(private toastCtrl : ToastController, public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.estudante.id = navParams.get("id");
    this.estudante.nome = navParams.get("nome");
    this.estudante.nota = navParams.get("nota");
    this.estudante.cursoId = navParams.get("cursoId");
    console.log(this.estudante);
  }

  editEstudante() {
    this.restProvider.editEstudante(this.estudante.id, this.estudante).then((result) => {
      let toast = this.toastCtrl.create({
        message: 'Estudante editado com sucesso',
        duration: 1500,
        position: 'bottom'
      });
      toast.present();
    }, (err) => {
      console.log(err);
    });
  }

  deleteEstudante() {
    this.restProvider.deleteEstudante(this.estudante.id)
    .then(data => {
      console.log(data);
      this.navCtrl.pop();
    });
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesPage');
  }

}
