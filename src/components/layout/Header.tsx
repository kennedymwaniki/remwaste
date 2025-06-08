import React from "react";
import { useSteps } from "../../hooks/useSteps";

const Header: React.FC = () => {
  const { currentStep, goToPreviousStep } = useSteps();

  const steps = [
    { name: "Postcode", icon: "📍" },
    { name: "Waste Type", icon: "🗑️" },
    { name: "Select Skip", icon: "🚚" },
    { name: "Permit Check", icon: "🛡️" },
    { name: "Choose Date", icon: "📅" },
    { name: "Payment", icon: "💳" },
  ];

  return (
    <header className="py-6 border-b border-gray-800">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <div className="flex space-x-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index <= currentStep ? "text-blue-400" : "text-gray-400"
              }`}
            >
              <span>{step.icon}</span>
              <span className="ml-2">{step.name}</span>
            </div>
          ))}
        </div>
        {currentStep > 0 && (
          <button
            onClick={goToPreviousStep}
            className="text-blue-400 hover:text-blue-300"
          >
            Back
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
