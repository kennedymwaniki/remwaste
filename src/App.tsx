/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { BookingProvider } from "./context/BookingContext";
import StepProgressBar from "./components/layout/StepProgressBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AddressStep from "./components/steps/AddressStep";
import WasteTypeStep from "./components/steps/WasteTypeStep";
import SkipSizeStep from "./components/steps/SkipSizeStep";
import PermitCheckStep from "./components/steps/PermitCheckStep";
import DateSelectionStep from "./components/steps/DateSelectionStep";

import { useSteps } from "./hooks/useSteps";
import PaymentStep from "./components/steps/Paymentstep";

const App: React.FC = () => {
  const { currentStep, goToNextStep, goToPreviousStep } = useSteps();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <AddressStep
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 1:
        return (
          <WasteTypeStep
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 2:
        return (
          <SkipSizeStep
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 3:
        return (
          <PermitCheckStep
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 4:
        return (
          <DateSelectionStep
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 5:
        return <PaymentStep goToPreviousStep={goToPreviousStep} />;
      default:
        return null;
    }
  };

  return (
    <BookingProvider>
      <div className="bg-gray-900 text-white min-h-screen">
        <Header />
        <div className="flex max-w-7xl mx-auto px-4">
          {/* Left Sidebar with Steps */}
          <div className="w-80 py-6 pr-8 sticky top-0 h-[calc(100vh-73px)]">
            <StepProgressBar currentStep={currentStep} />
          </div>

          {/* Main Content */}
          <div className="flex-1 py-6 flex flex-col min-h-[calc(100vh-73px)]">
            <div className="flex-grow">{renderStep()}</div>
            <Footer />
          </div>
        </div>
      </div>
    </BookingProvider>
  );
};

export default App;
