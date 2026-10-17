import { Routes } from '@angular/router';
import { ArbolMenu } from './models/arbol-menu';
import { NodoMenu } from './models/nodo-menu';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'perfil',
    pathMatch: 'full'
  }
];

const arbol = new ArbolMenu();

function agregarRutas(nodo: NodoMenu): void {
  if (nodo.enlace !== '') {
    routes.push({
      path: nodo.enlace,
      component: nodo.componente,
      data: {
        titulo: nodo.titulo
      }
    });
  }

  for (let i = 0; i < nodo.hijos.length; i++) {
    agregarRutas(nodo.hijos[i]);
  }
}

agregarRutas(arbol.raiz);

routes.push({
  path: '**',
  redirectTo: 'perfil'
});