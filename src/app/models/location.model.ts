export interface LocationModel {
  formatted_address: string;
  location: {
    lat: number;
    lng: number;
  };
  place_id: string;
  created_at: Date;
}
