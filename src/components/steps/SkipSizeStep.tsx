import React, { useState } from "react";

import { useBooking } from "../../context/BookingContext";
import Button from "../common/Button";
import { ActionType } from "../../utils/reducer";

interface SkipSize {
  id: string;
  name: string;
  description: string;
  price: number;
  isSelected: boolean;
  image: string;
}

const SkipSizeStep: React.FC<{
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}> = ({ goToNextStep, goToPreviousStep }) => {
  const { dispatch } = useBooking();
  const [skipSizes, setSkipSizes] = useState<SkipSize[]>([
    {
      id: "4y",
      name: "4 Yard Skip",
      description: "14 day hire period",
      price: 211,
      isSelected: false,
      image: "https://placeholder.com/skip4y",
    },
    {
      id: "5y",
      name: "5 Yard Skip",
      description: "14 day hire period",
      price: 241,
      isSelected: true,
      image: "https://placeholder.com/skip5y",
    },
    {
      id: "6y",
      name: "6 Yard Skip",
      description: "14 day hire period",
      price: 264,
      isSelected: false,
      image: "https://placeholder.com/skip6y",
    },
  ]);

  const handleSkipSizeSelect = (id: string) => {
    setSkipSizes(
      skipSizes.map((size) =>
        size.id === id
          ? { ...size, isSelected: true }
          : { ...size, isSelected: false }
      )
    );
  };

  const handleSubmit = () => {
    dispatch({
      type: ActionType.SET_SKIP_SIZE,
      payload: skipSizes.find((size) => size.isSelected),
    });
    goToNextStep();
  };

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-center">Choose Your Skip Size</h1>
      <p className="text-center">
        Select the skip size that best suits your needs
      </p>
      <div className="grid grid-cols-3 gap-6 mt-8">
        {skipSizes.map((size) => (
          <div
            key={size.id}
            className={`bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 ${
              size.isSelected ? "border-2 border-blue-500" : ""
            }`}
          >
            <div className="flex justify-end mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                {size.name.split(" ")[0]} Yards
              </span>
            </div>
            <div className="w-full h-48 bg-gray-700 rounded-lg mb-4">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Skip Image Placeholder
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">{size.name}</h3>
            <p className="text-gray-400 mb-4">{size.description}</p>
            <div className="flex justify-between items-center">
              <p
                className={`text-${
                  size.isSelected ? "blue-400" : "gray-400"
                } font-medium`}
              >
                £{size.price}
              </p>
              <button
                onClick={() => handleSkipSizeSelect(size.id)}
                className={`${
                  size.isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                } px-4 py-2 rounded-lg`}
              >
                {size.isSelected ? "Selected" : "Select This Skip →"}
              </button>
            </div>
          </div>
        ))}
      </div>{" "}
      <div className="flex justify-between mt-8">
        <Button variant="secondary" label="Back" onClick={goToPreviousStep} />
        <Button label="Continue →" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default SkipSizeStep;
