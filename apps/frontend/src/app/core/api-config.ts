import { isDevMode } from '@angular/core';

const BACKEND_URL = isDevMode()
  ? 'http://localhost:3000'
  : 'https://eternal-decks-production.up.railway.app';

export const API_BASE_URL = `${BACKEND_URL}/api`;
export const SOCKET_URL = BACKEND_URL;