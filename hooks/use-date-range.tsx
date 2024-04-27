"use client";

import * as React from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

interface DateRangeContextType {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const DateRangeContext = React.createContext<DateRangeContextType | undefined>(
  undefined,
);

export const useDateRange = () => {
  const context = React.useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
};

export const DateRangeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 3, 20),
    to: addDays(new Date(2024, 3, 20), 5),
  });

  return (
    <DateRangeContext.Provider value={{ date, setDate }}>
      {children}
    </DateRangeContext.Provider>
  );
};
