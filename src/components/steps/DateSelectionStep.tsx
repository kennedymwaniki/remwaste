import React, { useState } from "react";
import Button from "../../components/common/Button";
import { useBooking } from "../../context/BookingContext";
import { ActionType } from "../../utils/reducer";

interface CalendarDate {
  day: number;
  isCurrentMonth: boolean;
  isSelectable: boolean;
  isSelected: boolean;
}

const DateSelectionStep: React.FC<{ goToNextStep: () => void }> = ({
  goToNextStep,
}) => {
  const { dispatch } = useBooking();
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(
    new Date("2025-06-18")
  );
  const [collectionDate, setCollectionDate] = useState<Date | null>(
    new Date("2025-06-25")
  );

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const generateCalendar = (month: number, year: number) => {
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
          week.push({
            day: date,
            isCurrentMonth: month === currentMonth,
            isSelectable: true,
            isSelected: !!(
              deliveryDate &&
              new Date(year, month, date).toDateString() ===
                deliveryDate.toDateString()
            ),
          });
          date++;
        }
      }
      calendar.push(week);
    }

    return calendar;
  };

  const calendar = generateCalendar(currentMonth, currentYear);

  const handleDateSelect = (dateObj: CalendarDate | null) => {
    if (!dateObj || !dateObj.isSelectable) return;

    const selectedDate = new Date(currentYear, currentMonth, dateObj.day);
    setDeliveryDate(selectedDate);

    // Set collection date 7 days later
    const collection = new Date(selectedDate);
    collection.setDate(collection.getDate() + 7);
    setCollectionDate(collection);
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

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-center">
        Choose Your Delivery Date
      </h1>
      <p className="text-center text-gray-400">
        Select your preferred skip delivery date. We'll aim to deliver between
        7am and 6pm on your chosen day.
      </p>
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Delivery Date</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">←</span>
            <h3 className="font-medium">June 2025</h3>
            <span className="text-gray-400">→</span>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {days.map((day) => (
              <div key={day} className="text-gray-400 text-center">
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
                      className="text-gray-400"
                    />
                  );
                }

                return (
                  <div
                    key={`day-${weekIndex}-${dayIndex}`}
                    onClick={() => handleDateSelect(day)}
                    className={`p-2 text-center ${
                      day.isSelected
                        ? "bg-blue-600 text-white font-medium rounded-full"
                        : day.isCurrentMonth
                        ? "text-gray-300 hover:bg-gray-700 rounded-full cursor-pointer"
                        : "text-gray-400"
                    }`}
                  >
                    {day.day}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2">Collection Date</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span>Wednesday 25 June 2025</span>
              <span className="text-blue-400 cursor-pointer">Change →</span>
            </div>
            <p className="text-gray-400">
              We'll collect your skip on this date. Please ensure it's
              accessible.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="secondary" label="Back" onClick={() => {}} />
        <Button label="Continue to Payment" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default DateSelectionStep;
