import {WonderObject} from "./object.model";

export interface User {
  name: string;
  email: string;
  objects: WonderObject[]; // Array of Object IDs, assuming Object is another interface/model
  peeks: WonderObject[]; // Array of Object IDs, assuming Object is another interface/model
  confirmed: boolean;
  views: number;
  avatar?: string; // Assuming avatar is a URL string pointing to the image location
  createdAt?: Date; // Timestamp
  updatedAt?: Date; // Timestamp
  _id: string;
}
