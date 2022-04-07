import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddNoteComponent } from './add-note/add-note.component';
import { HomePage } from './home/home.page';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateNoteComponent } from './update-note/update-note.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    component: RegisterComponent,
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'home',
    component: HomePage,
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  // {
  //   path: 'home',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'add-note',
    component: AddNoteComponent,
    loadChildren: () => import('./add-note/add-note.module').then(m => m.AddNoteModule)
  },
  {
    path: 'update-note/:id',
    component: UpdateNoteComponent,
    loadChildren: () => import('./update-note/update-note.module').then(m => m.UpdateNoteModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
