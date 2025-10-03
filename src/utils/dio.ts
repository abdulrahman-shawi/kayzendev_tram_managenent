export interface RegisterUserDto {
    email:string;
    name:string;
    password:string
    role?:string
}

type ValueType = 
  | boolean
  | number
  | string
  | null
  | undefined
  | ValueObject
  | ValueType[];

export interface ValueObject {
  [key: string]: ValueType;
}


export interface LoginUserDto {
    email: string;
    password: string;
}

import { Prisma } from "@prisma/client";

export interface CustomerDto {
  id: string;

  customer: {
    projectName: string;
    projectOwner: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    projectScope: string;
    projectType: string;
    features: string[];
  };

  website: Prisma.JsonValue;
  apps?: Prisma.JsonValue;
  marketing?: Prisma.JsonValue;
  seo?: Prisma.JsonValue;
  ai?: Prisma.JsonValue;

  photo?: string[];

  photoSection?: {
    [key: string]: {
      urls?: string[];
      notes?: string;
    };
  };

  website_ai_complate?: boolean;
  apps_ai_complate?: boolean;
  markiting_ai_complate?: boolean;
  seo_ai_complate?: boolean;
  ai_complate?: boolean;

  notes?: string;
}

export interface CreateCustomerDto {
  id?: number;
  customer?: {
    projectName?: string;
    projectOwner?: string;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    projectScope?: string;
    projectType?: string;
    features?: string[];
  };

  website?: Prisma.JsonValue;
  apps?: Prisma.JsonValue;
  marketing?: Prisma.JsonValue;
  seo?: Prisma.JsonValue;
  ai?: Prisma.JsonValue;

  file?: File | File[];

  website_ai_complate?: boolean;
  apps_ai_complate?: boolean;
  markiting_ai_complate?: boolean;
  seo_ai_complate?: boolean;
  ai_complate?: boolean;

  notes?: string;
}

