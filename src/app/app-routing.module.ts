import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './logged-in.guard';
import { userRoleGuard } from './user-role.guard';

import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { DetailComponent } from './components/recipes/detail/detail.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CreateRecipeComponent } from './components/recipes/create-recipe/create-recipe.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'ricette', component: RecipesComponent, children: [
    {path: '', component: RecipesListComponent, pathMatch: 'full'},
    {path: 'dettaglio/:title/:_id', component: DetailComponent},
//  {path: 'dettaglio/:_id', component: DetailComponent}
    {path: 'crea-ricetta', component: CreateRecipeComponent, canActivate:[userRoleGuard]},
  ]},
  {path: 'contatti', component: ContactsComponent},
  {path: 'registrazione', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profilo', component: ProfileComponent, canActivate:[authGuard]},
// {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
