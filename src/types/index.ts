// src/types/index.ts
export interface Member {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  // other fields optional
}

export interface Comment {
  _id?: string;
  rating: number;
  content: string;
  author: Member | string; // populated or id
  createdAt?: string;
}

export interface Brand {
  _id: string;
  brandName: string;
}

export interface Perfume {
  _id: string;
  perfumeName: string;
  price?: number;
  description?: string;
  ingredients?: string;
  volume?: string;
  targetAudience?: string;
  brand?: Brand | string;
  uri?: string; // image url
  comments?: Comment[];
}
