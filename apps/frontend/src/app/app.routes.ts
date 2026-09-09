import { Route } from '@angular/router';
import { MainMenu } from './main-menu/main-menu';
import { RoomList } from './room-list/room-list';
import { Game } from './game/game';
import { authGuard } from './core/auth.guard';

export const appRoutes: Route[] = [
  { path: '', component: MainMenu },
  { path: 'rooms', component: RoomList, canActivate: [authGuard] },
  { path: 'game', component: Game, canActivate: [authGuard] }
];
