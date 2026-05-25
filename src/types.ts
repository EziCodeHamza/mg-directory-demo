export interface Therapist {
  id: string;
  slug: string;
  name: string;
  photo: string;
  city: string;
  province: string;
  country: string;
  lat: number;
  lng: number;
  specialties: string[];
  bio: string;
  email: string;
  website: string;
}
