import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

// Importem els components de cada pàgina
import { AboutComponent }    from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DetailComponent }   from './components/detail/detail.component';
import { CreateComponent }   from './components/create/create.component';
import { EditComponent }     from './components/edit/edit.component';
import { ContactComponent }  from './components/contact/contact.component';
import { LoginComponent }    from './components/login/login.component';
import { ErrorComponent }    from './components/error/error.component';

export const routes: Routes = [
  // Ruta arrel: redirigeix a /about
  { path: '',        redirectTo: 'about', pathMatch: 'full' },

  // Pàgines públiques (visibles sense autenticació)
  { path: 'about',    component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'contact',  component: ContactComponent },
  { path: 'login',    component: LoginComponent },

  // Pàgines protegides (cal estar autenticat)
  // El guard authGuard comprova si hi ha sessió activa
  { path: 'create',   component: CreateComponent,  canActivate: [authGuard] },
  { path: 'edit/:id', component: EditComponent,    canActivate: [authGuard] },

  // Ruta wildcard: qualsevol URL no reconeguda va a la pàgina d'error
  { path: '**',       component: ErrorComponent }
];