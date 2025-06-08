/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useReducer,
  useContext,
  type PropsWithChildren,
} from "react";
import { reducer, initialState } from "../utils/reducer";

interface BookingContextType {
  state: any;
  dispatch: React.Dispatch<any>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Fix: Properly type the BookingProvider component to accept children
export const BookingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
