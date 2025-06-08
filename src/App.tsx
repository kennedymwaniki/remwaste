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
        return <AddressStep goToNextStep={goToNextStep} />;
      case 1:
        return <WasteTypeStep goToNextStep={goToNextStep} />;
      case 2:
        return <SkipSizeStep goToNextStep={goToNextStep} />;
      case 3:
        return <PermitCheckStep goToNextStep={goToNextStep} />;
      case 4:
        return <DateSelectionStep goToNextStep={goToNextStep} />;
      case 5:
        return <PaymentStep />;
      default:
        return null;
    }
  };

  return (
    <BookingProvider>
      <div className="bg-gray-900 text-white min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <StepProgressBar currentStep={currentStep} />
          <div className="mt-12">{renderStep()}</div>
        </div>
        <Footer />
      </div>
    </BookingProvider>
  );
};

export default App;
