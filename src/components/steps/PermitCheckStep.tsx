import React, { useState } from "react";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { useBooking } from "../../context/BookingContext";
import { ActionType } from "../../utils/reducer";
import { FaHome, FaRoad } from "react-icons/fa";

interface SkipPlacement {
  id: string;
  name: string;
  description: string;
  requiresPermit: boolean;
  icon: React.ReactNode;
  isSelected: boolean;
}

const PermitCheckStep: React.FC<{
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}> = ({ goToNextStep, goToPreviousStep }) => {
  const { dispatch } = useBooking();
  const [skipPlacements, setSkipPlacements] = useState<SkipPlacement[]>([
    {
      id: "private",
      name: "Private Property",
      description: "Driveway or private land",
      requiresPermit: false,
      icon: <FaHome />,
      isSelected: true,
    },
    {
      id: "public",
      name: "Public Road",
      description: "Council or public property",
      requiresPermit: true,
      icon: <FaRoad />,
      isSelected: false,
    },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [skipPhotoStep, setSkipPhotoStep] = useState(false);

  const handlePlacementSelect = (id: string) => {
    setSkipPlacements(
      skipPlacements.map((placement) =>
        placement.id === id
          ? { ...placement, isSelected: true }
          : { ...placement, isSelected: false }
      )
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target!.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    dispatch({
      type: ActionType.SET_SKIP_PLACEMENT,
      payload: skipPlacements.find((placement) => placement.isSelected),
    });
    dispatch({
      type: ActionType.SET_SKIP_PHOTO_URL,
      payload: skipPhotoStep ? null : photoUrl,
    });
    goToNextStep();
  };

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-center">
        Where will the skip be placed?
      </h1>
      <p className="text-center text-gray-400">
        This helps us determine if you need a permit for your skip
      </p>
      <div className="grid grid-cols-2 gap-6 mt-8">
        {skipPlacements.map((placement) => (
          <div
            key={placement.id}
            onClick={() => handlePlacementSelect(placement.id)}
            className={`bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 ${
              placement.isSelected ? "border-2 border-blue-500" : ""
            }`}
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-4">{placement.icon}</span>
              <h3 className="text-xl font-medium">{placement.name}</h3>
            </div>
            <p className="text-gray-400 mb-2">{placement.description}</p>
            {placement.requiresPermit ? (
              <p className="text-blue-400 font-medium">
                Permit required for placement on public roads
              </p>
            ) : (
              <p className="text-gray-400">
                No permit required when placed on your private property
              </p>
            )}
          </div>
        ))}
      </div>
      {skipPlacements.find((placement) => placement.isSelected)
        ?.requiresPermit && (
        <div className="mt-8">
          <Button
            label="Upload Skip Placement Photo"
            onClick={() => setOpenModal(true)}
            className="w-full justify-center"
          />
        </div>
      )}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Skip Placement Photo"
      >
        <p className="mb-4">
          Please provide a photo of where you plan to place the skip. This helps
          us ensure proper placement and identify any potential access issues.
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="block w-full mb-4"
        />
        {photoUrl ? (
          <div className="mb-4">
            <img
              src={photoUrl}
              alt="Skip Placement"
              className="w-full h-64 object-cover"
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-600 p-8 flex items-center justify-center">
            <span className="text-gray-400">
              Drop a file here or click to upload
            </span>
          </div>
        )}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="skipPhoto"
            checked={skipPhotoStep}
            onChange={(e) => setSkipPhotoStep(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="skipPhoto" className="text-gray-400">
            Skip this step to upload a photo
          </label>
        </div>{" "}
        <div className="flex justify-end space-x-4">
          <Button
            variant="secondary"
            label="Cancel"
            onClick={() => setOpenModal(false)}
          />
          <Button label="Continue" onClick={handleSubmit} />
        </div>
      </Modal>{" "}
      <div className="flex justify-between mt-8">
        <Button variant="secondary" label="Back" onClick={goToPreviousStep} />
        <Button label="Continue" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default PermitCheckStep;
