import {SelectTypesModel} from "../models/select-types.model";

export const ACQUISITION_TYPES: SelectTypesModel[] = [
  {text: 'I bought it', id: 1},
  {text: 'I received it as a present', id: 2},
  {text: 'I found it', id: 3},
  {text: 'I inherited it', id: 4},
  {text: 'I got it in exchange', id: 5},
  {text: 'I stole it', id: 6},
  {text: 'Other', id: 7, isOther: true},
];
