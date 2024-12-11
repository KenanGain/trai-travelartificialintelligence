import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plane, Clock, Calendar, User, MapPin } from 'lucide-react'

interface BoardingPassProps {
  airline?: string;
  flightNumber?: string;
  passengerName?: string;
  from: string;
  to: string;
  date: string;
  boardingTime?: string;
  gate?: string;
  seat?: string;
  price: number;
}

// Generate random fallback data if needed
const randomSeat = () => {
  const seats = ['12A', '15B', '22C', '7F', '18D', '9E']
  return seats[Math.floor(Math.random() * seats.length)]
}
const randomGate = () => {
  const gates = ['A1', 'B2', 'C3', 'D4', 'E5', 'F6']
  return gates[Math.floor(Math.random() * gates.length)]
}

export function BoardingPass({
  airline = 'TRAI',
  flightNumber = `A1${Math.floor(1000 + Math.random() * 9000)}`,
  passengerName = 'Smart User',
  from,
  to,
  date,
  boardingTime,
  gate,
  seat,
  price
}: BoardingPassProps) {

  const displayedBoardingTime = boardingTime ?? `${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`
  const displayedGate = gate ?? randomGate()
  const displayedSeat = seat ?? randomSeat()

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{airline}</h1>
          <span className="text-xl font-semibold">{flightNumber}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-75">From</p>
            <h2 className="text-2xl font-bold">{from}</h2>
          </div>
          <Plane className="w-12 h-12 mx-4" />
          <div className="text-right">
            <p className="text-sm opacity-75">To</p>
            <h2 className="text-2xl font-bold">{to}</h2>
          </div>
        </div>
      </div>
      <CardContent className="bg-white p-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Date
            </p>
            <p className="font-medium">{date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Boarding Time
            </p>
            <p className="font-medium">{displayedBoardingTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Gate
            </p>
            <p className="font-medium">{displayedGate}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <User className="w-4 h-4" /> Passenger
            </p>
            <p className="font-medium">{passengerName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Seat</p>
            <p className="font-medium text-xl">{displayedSeat}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-bold text-xl">${price.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-dashed flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-500 mb-1">Scan QR code to board</div>
            <img src="/placeholder.svg?height=80&width=80" alt="QR Code" className="w-20 h-20" />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Board by</p>
            <p className="font-bold text-xl">{displayedBoardingTime}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
