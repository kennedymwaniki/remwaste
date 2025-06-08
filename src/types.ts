import React from "react";

export interface WasteType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
}

export interface SkipSize {
  id: string;
  name: string;
  description: string;
  price: number;
  isSelected: boolean;
  image: string;
}

export interface SkipPlacement {
  id: string;
  name: string;
  description: string;
  requiresPermit: boolean;
  icon: React.ReactNode;
  isSelected: boolean;
}

export interface SkipDeliveryDate {
  delivery: Date | null;
  collection: Date | null;
}
