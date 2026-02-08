import {SelectTypesModel} from "./select-types.model";
import {LocationModel} from "./location.model";

export interface WonderObject {
  _id: string; // IDs in MongoDB are generally _id
  ownership: string; // Reference to the User object
  basic: {
    nameCtrl: string;
    imageUploadCtrl: string;
    materialCtrl: SelectTypesModel[];
    locationCtrl: [LocationModel];
    yearCtrl: number;
  };
  description: {
    descriptionCtrl: string;
  };
  emotions: {
    emotionsCtrl: SelectTypesModel[];
    usageCtrl: SelectTypesModel[];
    isIntendedUseCtrl: SelectTypesModel[];
    isRelicCtrl: SelectTypesModel[];
    isReplaceableCtrl: SelectTypesModel[];
    lostItemCtrl: string;
  };
  history: {
    acquisitionMethodCtrl: SelectTypesModel[];
    damageCtrl: string;
    damageImagesCtrl: string[];
    dreamObjectCtrl: SelectTypesModel[];
    handStatusCtrl: SelectTypesModel[];
    pastOwnersCtrl: string;
  };
  monetary: {
    isSellableCtrl: SelectTypesModel[];
    priceCtrl: string;
  };
  production: {
    creatorCtrl: string;
    editionCtrl: SelectTypesModel[];
    productionTypeCtrl: SelectTypesModel[];
  };
  publicStatus: {
    publicStatusCtrl: SelectTypesModel[];
  };
  value: {
    valueCtrl: number;
  };
  valueCheck: {
    valueCheckCtrl: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Now you need to define all other models that I assumed.
// For example: Material, Location, Emotion, Use, Relic, Replaceable, Method, DreamObject, HandStatus, Sellable, Edition, ProductionType, PublicStatus.
