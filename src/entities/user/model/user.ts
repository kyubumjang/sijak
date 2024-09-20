import { Class } from "@/entities/class/model/class";

export interface User {
  id: number;
  account_email: string;
  profile_image: string;
  name: string;
  gender: string;
  age_range: string;
  applied_class: Class[];
  latitude: number;
  longitude: number;
  city: string;
}
