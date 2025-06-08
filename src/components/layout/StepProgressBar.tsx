import React from "react";
import { FaMapMarkerAlt, FaTruck, FaCreditCard } from "react-icons/fa";
import { BsTrash, BsCalendar2Date } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";
import { useSteps } from "../../hooks/useSteps";

const StepProgressBar: React.FC<{ currentStep: number }> = ({
  currentStep,
}) => {
  const { goToStep } = useSteps();
  const steps = [
    { name: "Postcode", icon: <FaMapMarkerAlt /> },
    { name: "Waste Type", icon: <BsTrash /> },
    { name: "Select Skip", icon: <FaTruck /> },
    { name: "Permit Check", icon: <MdSecurity /> },
    { name: "Choose Date", icon: <BsCalendar2Date /> },
    { name: "Payment", icon: <FaCreditCard /> },
  ];
  return (
    <div className="flex flex-col space-y-4 h-full py-4 px-2 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-blue-400 px-4 pb-2 border-b border-gray-700">
        Steps
      </h2>
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col">
          {" "}
          <div
            onClick={() => index <= currentStep && goToStep(index)}
            className={`flex items-center p-4 rounded-lg ${
              index <= currentStep ? "cursor-pointer hover:bg-gray-700" : ""
            } transition-all duration-200 ${
              index === currentStep ? "bg-blue-900 bg-opacity-30" : ""
            } ${index <= currentStep ? "text-blue-400" : "text-gray-400"}`}
          >
            <span className="text-2xl mr-3">{step.icon}</span>
            <span className="text-sm font-medium">{step.name}</span>
            {index === currentStep && (
              <span className="ml-auto text-blue-400">•</span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-1 h-8 ml-6 ${
                index < currentStep ? "bg-blue-400" : "bg-gray-600"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;
