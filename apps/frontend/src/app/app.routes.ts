import { Route } from '@angular/router';
import { MainMenu } from './main-menu/main-menu';
import { RoomList } from './room-list/room-list';

export const appRoutes: Route[] = [
  { path: '', component: MainMenu },
  { path: 'rooms', component: RoomList },
];
