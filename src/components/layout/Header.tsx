import React from "react";
import { useSteps } from "../../hooks/useSteps";
import {
  FaMapMarkerAlt,
  FaTruck,
  FaCreditCard,
  FaArrowLeft,
} from "react-icons/fa";
import { BsTrash, BsCalendar2Date } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";

const Header: React.FC = () => {
  const { currentStep, goToPreviousStep } = useSteps();

  const steps = [
    { name: "Postcode", icon: <FaMapMarkerAlt /> },
    { name: "Waste Type", icon: <BsTrash /> },
    { name: "Select Skip", icon: <FaTruck /> },
    { name: "Permit Check", icon: <MdSecurity /> },
    { name: "Choose Date", icon: <BsCalendar2Date /> },
    { name: "Payment", icon: <FaCreditCard /> },
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
              <span className="text-lg">{step.icon}</span>
              <span className="ml-2">{step.name}</span>
            </div>
          ))}
        </div>{" "}
        {currentStep > 0 && (
          <button
            onClick={goToPreviousStep}
            className="text-blue-400 hover:text-blue-300 flex items-center"
          >
            <FaArrowLeft className="mr-1" /> Back
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
