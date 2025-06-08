import React, { useState } from "react";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import { useBooking } from "../../context/BookingContext";
import { ActionType } from "../../utils/reducer";

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  country: string;
}

const PaymentStep: React.FC<{ goToPreviousStep: () => void }> = ({
  goToPreviousStep,
}) => {
  const { dispatch } = useBooking();
  const { state } = useBooking();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "1234 1234 1234 1234",
    expiryDate: "12/25",
    securityCode: "123",
    country: "Kenya",
  });
  const [saveCard, setSaveCard] = useState(true);

  const handlePaymentDetailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentDetails({
      ...paymentDetails,
      country: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch({
      type: ActionType.SET_PAYMENT_DETAILS,
      payload: paymentDetails,
    });

    alert("Payment completed successfully!");
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>
          <div className="mb-6">
            <h3 className="text-gray-400 flex items-center mb-2">
              <span className="mr-2">📍</span> Delivery Address
            </h3>
            <p className="text-white">
              {state.address.houseNumber} {state.address.streetName},{" "}
              {state.address.city}
              <br />
              {state.postcode}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-gray-400 flex items-center mb-2">
              <span className="mr-2">📅</span> Delivery & Collection
            </h3>
            <p className="text-white">
              Delivery: {new Date(state.deliveryDate!.delivery!).toDateString()}
              <br />
              Collection:{" "}
              {new Date(state.deliveryDate!.collection!).toDateString()}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-gray-400 mb-2">5 Yard Skip</h3>
            <p className="text-blue-400 text-xl font-medium">£241.00</p>
            <p className="text-gray-400 mt-2">14 day hire period</p>
            <p className="text-gray-400 mt-2">+ VAT £48.20</p>
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal (excl. VAT)</span>
              <span>£241.00</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (20%)</span>
              <span>£48.20</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-4">
              <span className="text-xl font-medium">Total</span>
              <span className="text-blue-400 text-xl font-medium">£289.20</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Payment Details</h2>
          <Input
            label="Card number"
            value={paymentDetails.cardNumber}
            onChange={handlePaymentDetailChange}
            placeholder="1234 1234 1234 1234"
            name="cardNumber"
          />
          <Input
            label="Expiration date"
            value={paymentDetails.expiryDate}
            onChange={handlePaymentDetailChange}
            placeholder="MM / YY"
            name="expiryDate"
          />
          <Input
            label="Security code"
            value={paymentDetails.securityCode}
            onChange={handlePaymentDetailChange}
            placeholder="CVC"
            name="securityCode"
          />
          <Select
            label="Country"
            value={paymentDetails.country}
            onChange={handleCountryChange}
            options={[
              { value: "Kenya", label: "Kenya" },
              { value: "USA", label: "USA" },
              { value: "UK", label: "UK" },
            ]}
          />
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="saveCard"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="saveCard" className="text-gray-400">
              Save this card as default payment method
            </label>
          </div>
          <div className="mt-6">
            <Button label="Complete Payment" onClick={handleSubmit} />
          </div>
          <div className="mt-2">
            {" "}
            <Button
              variant="secondary"
              label="Back"
              onClick={goToPreviousStep}
              className="w-full justify-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
