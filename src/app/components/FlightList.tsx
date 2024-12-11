
"use client"

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plane } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

interface FlightListProps {
  title: string
  flightData: any
  onBuyFlight: (flight: any) => void; // add this callback
}

export function FlightList({ title, flightData, onBuyFlight }: FlightListProps) {
  // Check if data is available
  if (
    !flightData ||
    !flightData.data ||
    !flightData.data.flights ||
    !flightData.data.flights.days ||
    flightData.data.flights.days.length === 0
  ) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No flight data available.</p>
        </CardContent>
      </Card>
    )
  }

  const { days } = flightData.data.flights
  const { fromLocation, toLocation } = flightData

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">From:</span>
            <span>{fromLocation ?? 'N/A'}</span>
          </div>
          <Plane className="h-5 w-5 text-blue-500" />
          <div className="flex items-center space-x-2">
            <span className="font-semibold">To:</span>
            <span>{toLocation ?? 'N/A'}</span>
          </div>
        </div>

        <ScrollArea className="h-[300px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky top-0 bg-background">Date</TableHead>
                <TableHead className="sticky top-0 bg-background">Price (USD)</TableHead>
                <TableHead className="sticky top-0 bg-background">Group</TableHead>
                <TableHead className="sticky top-0 bg-background">Flight Time</TableHead>
                <TableHead className="sticky top-0 bg-background">Passengers</TableHead>
                <TableHead className="sticky top-0 bg-background">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {days.map((day: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{day.day}</TableCell>
                  <TableCell>${day.price}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{day.group}</Badge>
                  </TableCell>
                  <TableCell>{day.flightTime ?? 'N/A'}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="w-20"
                      aria-label="Number of passengers"
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => onBuyFlight({
                      from: fromLocation,
                      to: toLocation,
                      date: day.day,
                      price: day.price,
                      flightTime: day.flightTime
                    })}>
                      Buy Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
// "use client"

// import React from 'react'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Plane } from 'lucide-react'
// import { ScrollArea } from "@/components/ui/scroll-area"

// interface FlightListProps {
//   title: string
//   flightData: any
// }

// export function FlightList({ title, flightData }: FlightListProps) {
//   // Check if data is available
//   if (
//     !flightData ||
//     !flightData.data ||
//     !flightData.data.flights ||
//     !flightData.data.flights.days ||
//     flightData.data.flights.days.length === 0
//   ) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>{title}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>No flight data available.</p>
//         </CardContent>
//       </Card>
//     )
//   }

//   const { days } = flightData.data.flights
//   const { fromLocation, toLocation } = flightData

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center space-x-2">
//             <span className="font-semibold">From:</span>
//             <span>{fromLocation ?? 'N/A'}</span>
//           </div>
//           <Plane className="h-5 w-5 text-blue-500" />
//           <div className="flex items-center space-x-2">
//             <span className="font-semibold">To:</span>
//             <span>{toLocation ?? 'N/A'}</span>
//           </div>
//         </div>

//         <ScrollArea className="h-[300px] rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="sticky top-0 bg-background">Date</TableHead>
//                 <TableHead className="sticky top-0 bg-background">Price (USD)</TableHead>
//                 <TableHead className="sticky top-0 bg-background">Group</TableHead>
//                 <TableHead className="sticky top-0 bg-background">Flight Time</TableHead>
//                 <TableHead className="sticky top-0 bg-background">Passengers</TableHead>
//                 <TableHead className="sticky top-0 bg-background">Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {days.map((day: any, index: number) => (
//                 <TableRow key={index}>
//                   <TableCell>{day.day}</TableCell>
//                   <TableCell>${day.price}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline">{day.group}</Badge>
//                   </TableCell>
//                   <TableCell>{day.flightTime ?? 'N/A'}</TableCell>
//                   <TableCell>
//                     <Input
//                       type="number"
//                       min="1"
//                       defaultValue="1"
//                       className="w-20"
//                       aria-label="Number of passengers"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Button size="sm">Buy Now</Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }


// "use client"

// import React from 'react'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Plane } from 'lucide-react'
// import { ScrollArea } from "@/components/ui/scroll-area"

// interface FlightListProps {
//   title: string
//   flightData: any
// }

// export function FlightList({ title, flightData }: FlightListProps) {
//   // Check if data is available
//   if (
//     !flightData ||
//     !flightData.data ||
//     !flightData.data.flights ||
//     !flightData.data.flights.days ||
//     flightData.data.flights.days.length === 0
//   ) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>{title}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>No flight data available.</p>
//         </CardContent>
//       </Card>
//     )
//   }

//   const { days } = flightData.data.flights
//   const { fromLocation, toLocation } = flightData

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center space-x-2">
//             <span className="font-semibold">From:</span>
//             <span>{fromLocation ?? 'N/A'}</span>
//           </div>
//           <Plane className="h-5 w-5 text-blue-500" />
//           <div className="flex items-center space-x-2">
//             <span className="font-semibold">To:</span>
//             <span>{toLocation ?? 'N/A'}</span>
//           </div>
//         </div>

//         <ScrollArea className="h-[300px] rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="sticky top-0 bg-background">Date</TableHead>
//                 <TableHead className="sticky top-0 bg-background">Price (USD)</TableHead>
//                 <TableHead className="sticky top-0 bg-background">Group</TableHead>
//                 <TableHead className="sticky top-0 bg-background">Flight Time</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {days.map((day: any, index: number) => (
//                 <TableRow key={index}>
//                   <TableCell>{day.day}</TableCell>
//                   <TableCell>${day.price}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline">{day.group}</Badge>
//                   </TableCell>
//                   <TableCell>{day.flightTime ?? 'N/A'}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }



// "use client"

// import React from 'react'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Flag, Plane } from 'lucide-react'

// interface FlightListProps {
//   title: string
//   flightData: any
// }

// export function FlightList({ title, flightData }: FlightListProps) {
//   // Check if data is available
//   if (
//     !flightData ||
//     !flightData.data ||
//     !flightData.data.flights ||
//     !flightData.data.flights.days ||
//     flightData.data.flights.days.length === 0
//   ) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>{title}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>No flight data available.</p>
//         </CardContent>
//       </Card>
//     )
//   }

//   const { days } = flightData.data.flights
//   const { fromLocation, toLocation } = flightData

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center space-x-2">
//             <Flag className="h-5 w-5 text-red-500" />
//             <span className="font-semibold">From:</span>
//             <span>{fromLocation ?? 'N/A'}</span>
//           </div>
//           <Plane className="h-5 w-5 text-blue-500" />
//           <div className="flex items-center space-x-2">
//             <Flag className="h-5 w-5 text-orange-500" />
//             <span className="font-semibold">To:</span>
//             <span>{toLocation ?? 'N/A'}</span>
//           </div>
//         </div>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Date</TableHead>
//               <TableHead>Price (USD)</TableHead>
//               <TableHead>Group</TableHead>
//               <TableHead>Flight Time</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {days.map((day: any, index: number) => (
//               <TableRow key={index}>
//                 <TableCell>{day.day}</TableCell>
//                 <TableCell>${day.price}</TableCell>
//                 <TableCell>
//                   <Badge variant="outline">{day.group}</Badge>
//                 </TableCell>
//                 <TableCell>{day.flightTime ?? 'N/A'}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }
