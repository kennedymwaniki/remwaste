import React, { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { useBooking } from "../../context/BookingContext";
import { ActionType } from "../../utils/reducer";

const AddressStep: React.FC<{
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}> = ({ goToNextStep, goToPreviousStep }) => {
  const { dispatch } = useBooking();
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const handleSubmit = () => {
    dispatch({
      type: ActionType.SET_POSTCODE,
      payload: postcode,
    });
    dispatch({
      type: ActionType.SET_ADDRESS,
      payload: { city, streetName, houseNumber },
    });
    goToNextStep();
  };
  return (
    <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">SKIP HIRE</h1>
      <h2 className="text-xl">With A Difference</h2>
      <div className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <Input
          label="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Start Typing Your Delivery Postcode"
        />
        {postcode.length > 0 && (
          <>
            <Input
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
            <Input
              label="Street Name"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              placeholder="Street Name"
            />
            <Input
              label="House/Flat Number"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="House/Flat Number"
            />
          </>
        )}
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="secondary" label="Back" onClick={goToPreviousStep} />
        <Button label="Continue →" onClick={handleSubmit} />
      </div>
      <div className="text-gray-400 text-sm mt-2">Version 1.1.34</div>
    </div>
  );
};

export default AddressStep;
