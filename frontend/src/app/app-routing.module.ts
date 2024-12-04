import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {GameBoardComponent} from "./game-board/game-board.component";

const routes: Routes = [
  {path: 'adminPanel', component: AdminPanelComponent},
  {path: '**', component: GameBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
