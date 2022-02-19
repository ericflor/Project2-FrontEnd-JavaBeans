import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { GroupComponent } from './components/group/group.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DecisionsComponent } from './decisions/decisions.component';

const routes: Routes = [{
  path : "login",
  component : LoginComponent
},
{path: "decisions",
component: DecisionsComponent
},{
  path : "group",
  component : GroupComponent
},{
  path : "user",
  component : UserProfileComponent
},{
  path : "fav",
  component : FavoritesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
