import { useState } from "react";

export const useSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  return { currentStep, goToNextStep, goToPreviousStep, goToStep };
};
