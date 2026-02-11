"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { addDays, format } from "date-fns"
import { type DateRange } from "react-day-picker"
import { useMounted } from "@/hooks/useMounted"
import { es } from "date-fns/locale"
import { useRouter, useSearchParams } from "next/navigation"

export default function DateRangePicker() {
  const isMounted = useMounted();
  const router = useRouter();
   const searchParams = useSearchParams();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })

  

    if (!isMounted) return null;

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);

    if (!range?.from) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("from", format(range.from, "yyyy-MM-dd"));

    if (range.to) {
      params.set("to", format(range.to, "yyyy-MM-dd"));
    } else {
      params.delete("to");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
    router.refresh();
  };

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          locale={es}
        />
      </CardContent>
    </Card>
  )
}
