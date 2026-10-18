import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { PanelPrivado } from './components/panel-privado/panel-privado';
import { Tareas } from './components/tareas/tareas';
import { ArbolNumeros } from './components/arbol-numeros/arbol-numeros';
import { PaginaMenu } from './components/pagina-menu/pagina-menu';
import { ArbolMenu } from './models/arbol-menu';
import { NodoMenu } from './models/nodo-menu';
import { authGuard } from './auth.guard';

const rutasMenu: Routes = [
  {
    path: '',
    redirectTo: 'perfil',
    pathMatch: 'full'
  }
];

const arbol = new ArbolMenu();

function agregarRutas(nodo: NodoMenu): void {
  if (nodo.enlace !== '') {
    rutasMenu.push({
      path: nodo.enlace,
      pathMatch: 'full',
      component: nodo.componente,
      canActivate: [authGuard],
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

rutasMenu.push({
  path: '**',
  redirectTo: 'perfil'
});

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tareas',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'registro',
    component: Registro
  },
  {
    path: '',
    component: PanelPrivado,
    canActivate: [authGuard],
    children: [
      {
        path: 'tareas',
        component: Tareas,
        canActivate: [authGuard]
      },
      {
        path: 'arbol',
        component: ArbolNumeros,
        canActivate: [authGuard]
      },
      {
        path: 'menu',
        component: PaginaMenu,
        canActivate: [authGuard],
        children: rutasMenu
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'tareas'
  }
];