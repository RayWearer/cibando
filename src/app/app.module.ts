import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

// Routes
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { RecipeCardComponent } from './components/shared/recipe-card/recipe-card.component';
import { DetailComponent } from './components/recipes/detail/detail.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    HomeComponent,
    RecipesComponent,
    HeaderComponent,
    RecipeCardComponent,
    DetailComponent,
    RecipesListComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbCarouselModule,
    AppRoutingModule,
    NgbModule,
    NgbCollapseModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
