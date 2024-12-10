import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GenresComponent } from './pages/genres/genres.component'
import { HomeComponent } from './pages/home/home.component'
import { ShowDetailComponent } from './pages/show-detail/show-detail.component'
import { ShowListComponent } from './pages/show-list/show-list.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list/:type', component: ShowListComponent },
  { path: 'detail/:type/:id', component: ShowDetailComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/:genreId', component: GenresComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
