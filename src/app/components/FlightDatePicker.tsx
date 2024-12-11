
"use client"

import React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FlightDatePicker({
  tripType,
  setTripType,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
}: {
  tripType: "oneway" | "roundtrip"
  setTripType: (value: "oneway" | "roundtrip") => void
  departureDate: Date | null
  setDepartureDate: (date: Date | null) => void
  returnDate: Date | null
  setReturnDate: (date: Date | null) => void
}) {
  const today = new Date()

  const getDisplayText = () => {
    if (tripType === "roundtrip") {
      return departureDate && returnDate
        ? `Departure: ${format(departureDate, "LLL dd, yyyy")}, Return: ${format(
            returnDate,
            "LLL dd, yyyy"
          )}`
        : "Pick your dates"
    } else {
      return departureDate
        ? `Departure: ${format(departureDate, "LLL dd, yyyy")}`
        : "Pick a date"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Combined Button to Display Dates */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[320px] justify-between">
            {getDisplayText()}
            <CalendarIcon className="ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          {/* Departure Date Picker */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Departure Date</label>
            <Calendar
              mode="single"
              selected={departureDate}
              onSelect={(date) => setDepartureDate(date)}
              defaultMonth={departureDate || today}
              initialFocus
            />
          </div>

          {/* Return Date Picker (only for Round Trip) */}
          {tripType === "roundtrip" && (
            <div>
              <label className="block text-sm font-medium mb-2">Return Date</label>
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={(date) => setReturnDate(date)}
                defaultMonth={returnDate || addDays(today, 7)}
                initialFocus
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

