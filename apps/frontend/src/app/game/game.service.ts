import { Injectable } from "@angular/core";

interface CardPreview {
  isShow: boolean;
  cardImg: string;
  top: number;
  left: number;
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor() {
  }
  
  cardPreview: CardPreview = {
    isShow: false,
    cardImg: '',
    top: 0,
    left: 0
  };
}