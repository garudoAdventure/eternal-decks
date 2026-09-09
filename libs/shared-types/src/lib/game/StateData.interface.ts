import { ButtonData } from './ButtonData.interface'

export interface StateData {
  message: string;
  button: ButtonData;
  validField: boolean[];
  validHeart: boolean[];
  validJewel: boolean[];
  validEternal: boolean[];
  validFieldEternal: boolean[];
  selectedCard: boolean[];
  validPlayer: boolean;
  validRiverCard: boolean;
  validFieldCard: boolean;
};