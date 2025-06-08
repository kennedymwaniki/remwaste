import React, { useState } from "react";
import Button from "../../components/common/Button";
import { useBooking } from "../../context/BookingContext";
import { ActionType } from "../../utils/reducer";

interface WasteType {
  id: string;
  name: string;
  description: string;
  icon: string;
  isSelected: boolean;
}

const WasteTypeStep: React.FC<{ goToNextStep: () => void }> = ({
  goToNextStep,
}) => {
  const { dispatch } = useBooking();
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([
    {
      id: "construction",
      name: "Construction Waste",
      description: "Building materials and renovation debris.",
      icon: "🧱",
      isSelected: false,
    },
    {
      id: "household",
      name: "Household Waste",
      description: "General household items and furniture.",
      icon: "🏠",
      isSelected: false,
    },
    {
      id: "garden",
      name: "Garden Waste",
      description: "Green waste and landscaping materials",
      icon: "🪴",
      isSelected: true,
    },
    {
      id: "commercial",
      name: "Commercial Waste",
      description: "Business and office clearance",
      icon: "💼",
      isSelected: false,
    },
  ]);

  const handleWasteTypeToggle = (id: string) => {
    setWasteTypes(
      wasteTypes.map((type) =>
        type.id === id ? { ...type, isSelected: !type.isSelected } : type
      )
    );
  };

  const handleSubmit = () => {
    dispatch({
      type: ActionType.SET_WASTE_TYPES,
      payload: wasteTypes.filter((type) => type.isSelected),
    });
    goToNextStep();
  };

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-center">
        What type of waste are you disposing of?
      </h1>
      <div className="bg-gray-800 p-4 rounded-lg flex items-center mb-8">
        <span className="mr-2 text-blue-400">ℹ️</span>
        <span>Select all that apply</span>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {wasteTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handleWasteTypeToggle(type.id)}
            className={`bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 ${
              type.isSelected ? "border-2 border-blue-500" : ""
            }`}
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-4">{type.icon}</span>
              <h3 className="text-xl font-medium">{type.name}</h3>
            </div>
            <p className="text-gray-400">{type.description}</p>
            {type.isSelected && (
              <div className="mt-4 float-right bg-blue-600 w-5 h-5 rounded-full text-white flex items-center justify-center">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Selected Waste Types</h3>
        <div className="text-gray-400">
          {wasteTypes
            .filter((type) => type.isSelected)
            .map((type) => type.name)
            .join(", ") || "None selected"}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="secondary" label="Back" onClick={() => {}} />
        <Button label="Continue →" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default WasteTypeStep;
