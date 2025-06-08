import React from "react";
import { FaMapMarkerAlt, FaTruck, FaCreditCard } from "react-icons/fa";
import { BsTrash, BsCalendar2Date } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";

const StepProgressBar: React.FC<{ currentStep: number }> = ({
  currentStep,
}) => {
  const steps = [
    { name: "Postcode", icon: <FaMapMarkerAlt /> },
    { name: "Waste Type", icon: <BsTrash /> },
    { name: "Select Skip", icon: <FaTruck /> },
    { name: "Permit Check", icon: <MdSecurity /> },
    { name: "Choose Date", icon: <BsCalendar2Date /> },
    { name: "Payment", icon: <FaCreditCard /> },
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
            <span className="text-2xl mb-1">{step.icon}</span>
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
