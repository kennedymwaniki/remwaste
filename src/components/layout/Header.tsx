import React from "react";
import { useSteps } from "../../hooks/useSteps";
import { FaArrowLeft } from "react-icons/fa";

const Header: React.FC = () => {
  const { currentStep, goToPreviousStep } = useSteps();
  return (
    <header className="py-4 border-b border-gray-800 sticky top-0 z-10 bg-gray-900">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-400 mr-6">SKIP HIRE</h1>
        </div>
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
