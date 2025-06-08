/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  WasteType,
  SkipSize,
  SkipPlacement,
  SkipDeliveryDate,
} from "../../src/types";

export interface initialStateType {
  postcode: string;
  address: {
    city: string;
    streetName: string;
    houseNumber: string;
  };
  wasteTypes: WasteType[];
  heavyWasteTypes: string[];
  hasPlasterboard: boolean;
  skipSize: SkipSize | null;
  skipPlacement: SkipPlacement | null;
  skipPhotoUrl: string | null;
  deliveryDate: SkipDeliveryDate | null;
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    securityCode: string;
    country: string;
  };
}

export const initialState: initialStateType = {
  postcode: "",
  address: {
    city: "",
    streetName: "",
    houseNumber: "",
  },
  wasteTypes: [],
  heavyWasteTypes: [],
  hasPlasterboard: false,
  skipSize: null,
  skipPlacement: null,
  skipPhotoUrl: null,
  deliveryDate: null,
  paymentDetails: {
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
    country: "",
  },
};

export const ActionType = {
  SET_POSTCODE: "SET_POSTCODE",
  SET_ADDRESS: "SET_ADDRESS",
  SET_WASTE_TYPES: "SET_WASTE_TYPES",
  SET_HEAVY_WASTE_TYPES: "SET_HEAVY_WASTE_TYPES",
  SET_HAS_PLASTERBOARD: "SET_HAS_PLASTERBOARD",
  SET_SKIP_SIZE: "SET_SKIP_SIZE",
  SET_SKIP_PLACEMENT: "SET_SKIP_PLACEMENT",
  SET_SKIP_PHOTO_URL: "SET_SKIP_PHOTO_URL",
  SET_DELIVERY_DATE: "SET_DELIVERY_DATE",
  SET_PAYMENT_DETAILS: "SET_PAYMENT_DETAILS",
} as const;

export interface Action {
  type: keyof typeof ActionType;
  payload: any;
}

export const reducer = (
  state: initialStateType,
  action: Action
): initialStateType => {
  switch (action.type) {
    case ActionType.SET_POSTCODE:
      return { ...state, postcode: action.payload };
    case ActionType.SET_ADDRESS:
      return { ...state, address: action.payload };
    case ActionType.SET_WASTE_TYPES:
      return { ...state, wasteTypes: action.payload };
    case ActionType.SET_HEAVY_WASTE_TYPES:
      return { ...state, heavyWasteTypes: action.payload };
    case ActionType.SET_HAS_PLASTERBOARD:
      return { ...state, hasPlasterboard: action.payload };
    case ActionType.SET_SKIP_SIZE:
      return { ...state, skipSize: action.payload };
    case ActionType.SET_SKIP_PLACEMENT:
      return { ...state, skipPlacement: action.payload };
    case ActionType.SET_SKIP_PHOTO_URL:
      return { ...state, skipPhotoUrl: action.payload };
    case ActionType.SET_DELIVERY_DATE:
      return { ...state, deliveryDate: action.payload };
    case ActionType.SET_PAYMENT_DETAILS:
      return { ...state, paymentDetails: action.payload };
    default:
      return state;
  }
};
