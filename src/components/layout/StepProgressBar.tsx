import React from "react";

const StepProgressBar: React.FC<{ currentStep: number }> = ({
  currentStep,
}) => {
  const steps = [
    { name: "Postcode", icon: "📍" },
    { name: "Waste Type", icon: "🗑️" },
    { name: "Select Skip", icon: "🚚" },
    { name: "Permit Check", icon: "🛡️" },
    { name: "Choose Date", icon: "📅" },
    { name: "Payment", icon: "💳" },
  ];

  return (
    <div className="flex justify-between items-center mb-10">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`flex flex-col items-center ${
              index <= currentStep ? "text-blue-400" : "text-gray-400"
            }`}
          >
            <span className="text-2xl">{step.icon}</span>
            <span className="text-sm">{step.name}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-10 ${
                index < currentStep ? "bg-blue-400" : "bg-gray-400"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;
