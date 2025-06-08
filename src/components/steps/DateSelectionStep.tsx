import React, { useState } from "react";
import Button from "../common/Button";
import { useBooking } from "../../context/BookingContext";
import { ActionType } from "../../utils/reducer";

interface CalendarDate {
  day: number;
  isCurrentMonth: boolean;
  isSelectable: boolean;
  isSelected: boolean;
}

const DateSelectionStep: React.FC<{
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}> = ({ goToNextStep, goToPreviousStep }) => {
  const { dispatch } = useBooking();
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(
    new Date("2025-06-18")
  );
  const [collectionDate, setCollectionDate] = useState<Date | null>(
    new Date("2025-06-25")
  );
  const [isEditingCollection, setIsEditingCollection] =
    useState<boolean>(false);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState<number>(today.getMonth());
  const [displayYear, setDisplayYear] = useState<number>(today.getFullYear());

  const generateCalendar = (
    month: number,
    year: number,
    selectedDate: Date | null
  ) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar = [];
    let date = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (date > daysInMonth) {
          week.push(null);
        } else {
          // Create a date for this calendar cell
          const cellDate = new Date(year, month, date);

          // Determine if the date is selectable (not in the past)
          const isSelectable = cellDate >= today;

          // Check if this cell's date matches the selected date
          const isSelected = !!(
            selectedDate &&
            cellDate.toDateString() === selectedDate.toDateString()
          );

          week.push({
            day: date,
            isCurrentMonth: true,
            isSelectable,
            isSelected,
          });
          date++;
        }
      }
      calendar.push(week);
    }

    return calendar;
  };

  const handlePreviousMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const handleDateSelect = (dateObj: CalendarDate | null) => {
    if (!dateObj || !dateObj.isSelectable) return;

    const selectedDate = new Date(displayYear, displayMonth, dateObj.day);

    if (isEditingCollection) {
      // Make sure collection date is after delivery date
      if (deliveryDate && selectedDate < deliveryDate) {
        alert("Collection date must be after delivery date");
        return;
      }
      setCollectionDate(selectedDate);
      setIsEditingCollection(false);
    } else {
      setDeliveryDate(selectedDate);

      // Set collection date 7 days later
      const collection = new Date(selectedDate);
      collection.setDate(collection.getDate() + 7);
      setCollectionDate(collection);
    }
  };

  const toggleCollectionEdit = () => {
    setIsEditingCollection(!isEditingCollection);

    // If switching to collection editing, set the display month/year to the collection date
    if (!isEditingCollection && collectionDate) {
      setDisplayMonth(collectionDate.getMonth());
      setDisplayYear(collectionDate.getFullYear());
    } else if (deliveryDate) {
      // If switching back to delivery editing, set display to delivery date
      setDisplayMonth(deliveryDate.getMonth());
      setDisplayYear(deliveryDate.getFullYear());
    }
  };

  const handleSubmit = () => {
    dispatch({
      type: ActionType.SET_DELIVERY_DATE,
      payload: {
        delivery: deliveryDate,
        collection: collectionDate,
      },
    });
    goToNextStep();
  };

  // Generate the calendar based on whether we're editing delivery or collection date
  const calendar = generateCalendar(
    displayMonth,
    displayYear,
    isEditingCollection ? collectionDate : deliveryDate
  );

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-center">
        {isEditingCollection
          ? "Choose Your Collection Date"
          : "Choose Your Delivery Date"}
      </h1>
      <p className="text-center text-gray-400">
        {isEditingCollection
          ? "Select when you'd like us to collect your skip. The hire period is typically 7 days."
          : "Select your preferred skip delivery date. We'll aim to deliver between 7am and 6pm on your chosen day."}
      </p>
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">
          {isEditingCollection ? "Collection Date" : "Delivery Date"}
        </h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span
              className="text-gray-400 hover:text-white cursor-pointer px-2 py-1"
              onClick={handlePreviousMonth}
            >
              ←
            </span>
            <h3 className="font-medium">
              {months[displayMonth]} {displayYear}
            </h3>
            <span
              className="text-gray-400 hover:text-white cursor-pointer px-2 py-1"
              onClick={handleNextMonth}
            >
              →
            </span>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {days.map((day) => (
              <div key={day} className="text-gray-400 text-center text-sm">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendar.map((week, weekIndex) =>
              week.map((day, dayIndex) => {
                if (!day) {
                  return (
                    <div
                      key={`empty-${weekIndex}-${dayIndex}`}
                      className="h-8 w-8 mx-auto"
                    />
                  );
                }

                return (
                  <div
                    key={`day-${weekIndex}-${dayIndex}`}
                    onClick={() => handleDateSelect(day)}
                    className={`
                      h-8 w-8 flex items-center justify-center mx-auto
                      ${
                        day.isSelected
                          ? "bg-blue-600 text-white font-medium rounded-full"
                          : day.isSelectable
                          ? "text-gray-300 hover:bg-gray-700 rounded-full cursor-pointer"
                          : "text-gray-600 cursor-not-allowed"
                      }
                    `}
                  >
                    {day.day}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {!isEditingCollection && (
          <div className="mt-6">
            <h3 className="text-xl font-medium mb-2">Collection Date</h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>
                  {collectionDate
                    ? collectionDate.toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Select delivery date first"}
                </span>
                <span
                  className="text-blue-400 cursor-pointer hover:underline"
                  onClick={toggleCollectionEdit}
                >
                  Change →
                </span>
              </div>
              <p className="text-gray-400">
                We'll collect your skip on this date. Please ensure it's
                accessible.
              </p>
            </div>
          </div>
        )}

        {isEditingCollection && (
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Delivery Date</h3>
              <span
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={toggleCollectionEdit}
              >
                ← Back to delivery
              </span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg mt-2">
              <div className="flex items-center mb-2">
                <span>
                  {deliveryDate
                    ? deliveryDate.toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Not selected"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="secondary" label="Back" onClick={goToPreviousStep} />
        <Button
          label="Continue to Payment"
          onClick={handleSubmit}
          disabled={!deliveryDate || !collectionDate}
        />
      </div>
    </div>
  );
};

export default DateSelectionStep;
