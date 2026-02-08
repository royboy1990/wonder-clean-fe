  import {SelectTypesModel} from "../models/select-types.model";

export const PRODUCTION_TYPES: SelectTypesModel[] = [
  {text: 'Small factory manufacturer', id: 1},
  {text: 'Personal production', id: 2},
  {text: 'Handmade', id: 3},
  {text: 'Big factory manufacturer', id: 4},
  {text: 'Other', id: 5, isOther: true}
];
