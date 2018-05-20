import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = "http://trabalholabsd20180520122300.azurewebsites.net/api";

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getCursos() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/cursos').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addCurso(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/cursos', JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  deleteCurso(id) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+'/cursos/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  editCurso(id,data) {
    return new Promise(resolve => {
      this.http.put(this.apiUrl+'/cursos/'+id, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getEstudantesCurso(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/cursos/'+id+'/estudantes').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addEstudante(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/estudantes', JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  editEstudante(id,data) {
    return new Promise(resolve => {
      this.http.put(this.apiUrl+'/estudantes/'+id, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteEstudante(id) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+'/estudantes/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
