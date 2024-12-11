// "use client"

// import React, { useState, useEffect, useCallback } from "react"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { FlightDatePicker } from "./FlightDatePicker"

// function FlightForm() {
//   const [searchFrom, setSearchFrom] = useState("")
//   const [searchTo, setSearchTo] = useState("")
//   const [suggestionsFrom, setSuggestionsFrom] = useState([])
//   const [suggestionsTo, setSuggestionsTo] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   // Parse CSV data
//   const parseCSV = (data: string) => {
//     const rows = data.split("\n")
//     return rows.map((row) => {
//       const columns = row.split(",")
//       return {
//         name: columns[1]?.replace(/"/g, ""), // Airport name
//         city: columns[2]?.replace(/"/g, ""), // City
//         country: columns[3]?.replace(/"/g, ""), // Country
//         iata: columns[4]?.replace(/"/g, ""), // IATA code
//       }
//     })
//   }

//   const handleSearch = useCallback(
//     async (query: string, type: "from" | "to") => {
//       if (query.length < 3) return
//       setIsLoading(true)
//       setError("")

//       try {
//         const response = await fetch(
//           "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
//         )
//         if (!response.ok) {
//           throw new Error("Failed to fetch data")
//         }
//         const text = await response.text()
//         const data = parseCSV(text)

//         const filteredAirports = data.filter(
//           (airport) =>
//             airport.city?.toLowerCase().includes(query.toLowerCase()) ||
//             airport.name?.toLowerCase().includes(query.toLowerCase())
//         )

//         if (type === "from") {
//           setSuggestionsFrom(filteredAirports)
//         } else {
//           setSuggestionsTo(filteredAirports)
//         }
//       } catch (err) {
//         console.error("Error fetching airport data:", err)
//         setError("Failed to load airport suggestions. Please try again.")
//       } finally {
//         setIsLoading(false)
//       }
//     },
//     []
//   )

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Flights</CardTitle>
//         <CardDescription>Your destination is waiting for you.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex  gap-4">
//             {/* From Input */}
//             <div className="flex flex-col">
//               <Input
//                 id="WhereFrom"
//                 placeholder="Enter city or airport name (From)"
//                 value={searchFrom}
//                 onChange={(e) => {
//                   setSearchFrom(e.target.value)
//                   handleSearch(e.target.value, "from")
//                 }}
//               />
//               {isLoading && <p className="text-sm text-gray-500">Loading suggestions...</p>}
//               {error && <p className="text-sm text-red-500">{error}</p>}
//               <ul className="bg-white rounded-md shadow-md mt-1 max-h-40 overflow-auto">
//                 {suggestionsFrom.map((airport: any, index: number) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() =>
//                       setSearchFrom(`${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`)
//                     }
//                   >
//                     {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* To Input */}
//             <div className="flex flex-col">
//               <Input
//                 id="WhereTo"
//                 placeholder="Enter city or airport name (To)"
//                 value={searchTo}
//                 onChange={(e) => {
//                   setSearchTo(e.target.value)
//                   handleSearch(e.target.value, "to")
//                 }}
//               />
//               {isLoading && <p className="text-sm text-gray-500">Loading suggestions...</p>}
//               {error && <p className="text-sm text-red-500">{error}</p>}
//               <ul className="bg-white rounded-md shadow-md mt-1 max-h-40 overflow-auto">
//                 {suggestionsTo.map((airport: any, index: number) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() =>
//                       setSearchTo(`${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`)
//                     }
//                   >
//                     {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Date Picker */}
//             <div className="">
//               <FlightDatePicker />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default FlightForm


// "use client";

// import React, { useState, useCallback, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { FlightDatePicker } from "./FlightDatePicker";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Airport {
//   name: string;
//   city: string;
//   country: string;
//   iata: string;
// }

// function FlightForm() {
//   const [searchFrom, setSearchFrom] = useState<Airport | null>(null);
//   const [searchTo, setSearchTo] = useState<Airport | null>(null);
//   const [suggestionsFrom, setSuggestionsFrom] = useState<Airport[]>([]);
//   const [suggestionsTo, setSuggestionsTo] = useState<Airport[]>([]);
//   const [departureDate, setDepartureDate] = useState<Date | null>(null);
//   const [returnDate, setReturnDate] = useState<Date | null>(null);
//   const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip");
//   const [isButtonEnabled, setIsButtonEnabled] = useState(false);

//   useEffect(() => {
//     if (
//       searchFrom &&
//       searchTo &&
//       departureDate &&
//       (tripType === "oneway" || (tripType === "roundtrip" && returnDate))
//     ) {
//       setIsButtonEnabled(true);
//     } else {
//       setIsButtonEnabled(false);
//     }
//   }, [searchFrom, searchTo, departureDate, returnDate, tripType]);

//   const parseCSV = (data: string): Airport[] => {
//     const rows = data.split("\n");
//     return rows.map((row) => {
//       const columns = row.split(",");
//       return {
//         name: columns[1]?.replace(/"/g, ""),
//         city: columns[2]?.replace(/"/g, ""),
//         country: columns[3]?.replace(/"/g, ""),
//         iata: columns[4]?.replace(/"/g, ""),
//       };
//     });
//   };

//   const handleSearch = useCallback(
//     async (query: string, type: "from" | "to") => {
//       if (query.length < 3) return;

//       try {
//         const response = await fetch(
//           "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
//         );
//         const text = await response.text();
//         const data = parseCSV(text);
//         const filteredAirports = data.filter(
//           (airport) =>
//             airport.city?.toLowerCase().includes(query.toLowerCase()) ||
//             airport.name?.toLowerCase().includes(query.toLowerCase())
//         );
//         if (type === "from") {
//           setSuggestionsFrom(filteredAirports);
//         } else {
//           setSuggestionsTo(filteredAirports);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     },
//     []
//   );

//   const handleSelectFrom = (airport: Airport) => {
//     setSearchFrom(airport);
//     setSuggestionsFrom([]);
//   };

//   const handleSelectTo = (airport: Airport) => {
//     setSearchTo(airport);
//     setSuggestionsTo([]);
//   };

//   const fetchFlightData = async (originIata: string, destinationIata: string, date: string) => {
//     const params = new URLSearchParams({
//       originSkyId: originIata,
//       destinationSkyId: destinationIata,
//       fromDate: date,
//       currency: "USD",
//     });

//     try {
//       const response = await fetch(`/api/flights?${params.toString()}`);
//       if (!response.ok) throw new Error("Failed to fetch flight data");
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching flight data:", error);
//       return null;
//     }
//   };

//   const handleSubmit = async () => {
//     if (!searchFrom || !searchTo || !departureDate) {
//       alert("Please fill out all required fields");
//       return;
//     }

//     const departureDateStr = departureDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD

//     // Fetch departure flight data
//     const departureData = await fetchFlightData(
//       searchFrom.iata,
//       searchTo.iata,
//       departureDateStr
//     );

//     if (departureData) {
//       alert(`Departure Flight Data:\n${JSON.stringify(departureData, null, 2)}`);
//     }

//     // If round trip, fetch return flight data
//     if (tripType === "roundtrip" && returnDate) {
//       const returnDateStr = returnDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
//       const returnData = await fetchFlightData(
//         searchTo.iata,
//         searchFrom.iata,
//         returnDateStr
//       );

//       if (returnData) {
//         alert(`Return Flight Data:\n${JSON.stringify(returnData, null, 2)}`);
//       }
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-start">
//           <div>
//             <CardTitle>Flights</CardTitle>
//             <CardDescription>Your destination is waiting for you.</CardDescription>
//           </div>
//           <div className="flex items-center">
//             <label className="text-sm font-medium mr-2">Trip Type:</label>
//             <Select
//               value={tripType}
//               onValueChange={(value) => setTripType(value as "oneway" | "roundtrip")}
//             >
//               <SelectTrigger className="w-[140px]">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="roundtrip">Round Trip</SelectItem>
//                 <SelectItem value="oneway">One Way</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex flex-wrap items-center gap-4">
//             {/* From Input */}
//             <div className="flex-1 relative">
//               <Input
//                 id="WhereFrom"
//                 placeholder="Enter city or airport name (From)"
//                 onChange={(e) => handleSearch(e.target.value, "from")}
//               />
//               <ul className="absolute top-full left-0 w-full border rounded-md shadow-md max-h-40 overflow-auto z-50">
//                 {suggestionsFrom.map((airport, index) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-700 cursor-pointer"
//                     onClick={() => handleSelectFrom(airport)}
//                   >
//                     {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* To Input */}
//             <div className="flex-1 relative">
//               <Input
//                 id="WhereTo"
//                 placeholder="Enter city or airport name (To)"
//                 onChange={(e) => handleSearch(e.target.value, "to")}
//               />
//               <ul className="absolute top-full left-0 w-full border rounded-md shadow-md max-h-40 overflow-auto z-50">
//                 {suggestionsTo.map((airport, index) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleSelectTo(airport)}
//                   >
//                     {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Date Picker */}
//             <div className="flex-1">
//               <FlightDatePicker
//                 tripType={tripType}
//                 setTripType={setTripType}
//                 departureDate={departureDate}
//                 setDepartureDate={setDepartureDate}
//                 returnDate={returnDate}
//                 setReturnDate={setReturnDate}
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-4 flex justify-end">
//             <Button
//               type="button"
//               onClick={handleSubmit}
//               disabled={!isButtonEnabled}
//               className="bg-black text-white hover:bg-gray-800"
//             >
//               Search Flights
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

// export default FlightForm;
// "use client"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { useState, useEffect, useCallback } from "react"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { FlightDatePicker } from "./FlightDatePicker"
// import FlightList  from "./FlightList"

// function FlightForm() {
//   const [searchFrom, setSearchFrom] = useState("")
//   const [searchTo, setSearchTo] = useState("")
//   const [suggestionsFrom, setSuggestionsFrom] = useState([])
//   const [suggestionsTo, setSuggestionsTo] = useState([])
//   const [fromIata, setFromIata] = useState("")
//   const [toIata, setToIata] = useState("")
//   const [departureDate, setDepartureDate] = useState<Date | null>(null)
//   const [returnDate, setReturnDate] = useState<Date | null>(null)
//   const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip")
//   const [isButtonEnabled, setIsButtonEnabled] = useState(false)
//   const [outboundFlights, setOutboundFlights] = useState<any>(null)
//   const [returnFlights, setReturnFlights] = useState<any>(null)
//   useEffect(() => {
//     if (
//       searchFrom &&
//       searchTo &&
//       departureDate &&
//       (tripType === "oneway" || (tripType === "roundtrip" && returnDate))
//     ) {
//       setIsButtonEnabled(true)
//     } else {
//       setIsButtonEnabled(false)
//     }
//   }, [searchFrom, searchTo, departureDate, returnDate, tripType])

//   const parseCSV = (data: string) => {
//     const rows = data.split("\n")
//     return rows.map((row) => {
//       const columns = row.split(",")
//       return {
//         name: columns[1]?.replace(/"/g, ""),
//         city: columns[2]?.replace(/"/g, ""),
//         country: columns[3]?.replace(/"/g, ""),
//         iata: columns[4]?.replace(/"/g, ""),
//       }
//     })
//   }

//   const handleSearch = useCallback(
//     async (query: string, type: "from" | "to") => {
//       if (query.length < 3) return

//       try {
//         const response = await fetch(
//           "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
//         )
//         const text = await response.text()
//         const data = parseCSV(text)
//         const filteredAirports = data.filter(
//           (airport) =>
//             airport.city?.toLowerCase().includes(query.toLowerCase()) ||
//             airport.name?.toLowerCase().includes(query.toLowerCase())
//         )
//         if (type === "from") {
//           setSuggestionsFrom(filteredAirports)
//         } else {
//           setSuggestionsTo(filteredAirports)
//         }
//       } catch (err) {
//         console.error(err)
//       }
//     },
//     []
//   )

//   const handleSelectFrom = (airport: any) => {
//     setSearchFrom(`${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`)
//     setFromIata(airport.iata) // Store IATA code separately
//     setSuggestionsFrom([])
//   }

//   const handleSelectTo = (airport: any) => {
//     setSearchTo(`${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`)
//     setToIata(airport.iata) // Store IATA code separately
//     setSuggestionsTo([])
//   }

//   // const handleSubmit = () => {
//   //   const formattedDate = departureDate ? departureDate.toISOString().split("T")[0] : ""
//   //   const tripDetails = {
//   //     originSkyId: fromIata,
//   //     destinationSkyId: toIata,
//   //     fromDate: formattedDate,
//   //     currency: "USD",
//   //   }
//   //   console.log("params:", tripDetails)
//   //   alert(JSON.stringify(tripDetails, null, 2))
//   // }
//   const handleSubmit = async () => {
//     if (!departureDate) return

//     const formattedDepartureDate = departureDate.toISOString().split("T")[0]
//     const tripDetails = {
//       originSkyId: fromIata,
//       destinationSkyId: toIata,
//       fromDate: formattedDepartureDate,
//       currency: "USD",
//     }

//     console.log("Outbound params:", tripDetails)
//     alert(JSON.stringify(tripDetails, null, 2))

//     try {
//       // 1. Outbound API Call
//       const outboundResponse = await fetch("/api/flights", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(tripDetails),
//       })
//       const outboundData = await outboundResponse.json()
//       console.log("Outbound Flight Data:", outboundData)
//       alert(JSON.stringify(outboundData, null, 2))

//       // Store outbound flights in state
//       setOutboundFlights(outboundData)

//       // If roundtrip, make another call for the return flight
//       if (tripType === "roundtrip" && returnDate) {
//         const formattedReturnDate = returnDate.toISOString().split("T")[0]
//         const returnTripDetails = {
//           originSkyId: toIata,
//           destinationSkyId: fromIata,
//           fromDate: formattedReturnDate,
//           currency: "USD",
//         }

//         console.log("Return params:", returnTripDetails)

//         const returnResponse = await fetch("/api/flights", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(returnTripDetails),
//         })
//         const returnData = await returnResponse.json()
//         console.log("Return Flight Data:", returnData)

//         // Store return flights in state
//         setReturnFlights(returnData)
//       }

//       alert("Flight search completed!")
//     } catch (error) {
//       console.error("Error fetching flights:", error)
//       alert("An error occurred while fetching the flights.")
//     }
//   }
"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FlightDatePicker } from "./FlightDatePicker"

interface FlightFormProps {
  onOutboundFlights: (data: any) => void
  onReturnFlights: (data: any) => void

}

function FlightForm({ onOutboundFlights, onReturnFlights }: FlightFormProps) {
  const [searchFrom, setSearchFrom] = useState("")
  const [searchTo, setSearchTo] = useState("")
  const [suggestionsFrom, setSuggestionsFrom] = useState([])
  const [suggestionsTo, setSuggestionsTo] = useState([])
  const [fromIata, setFromIata] = useState("")
  const [toIata, setToIata] = useState("")
  const [departureDate, setDepartureDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip")
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  useEffect(() => {
    if (
      searchFrom &&
      searchTo &&
      departureDate &&
      (tripType === "oneway" || (tripType === "roundtrip" && returnDate))
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [searchFrom, searchTo, departureDate, returnDate, tripType])

  const parseCSV = (data: string) => {
    const rows = data.split("\n")
    return rows.map((row) => {
      const columns = row.split(",")
      return {
        name: columns[1]?.replace(/"/g, ""),
        city: columns[2]?.replace(/"/g, ""),
        country: columns[3]?.replace(/"/g, ""),
        iata: columns[4]?.replace(/"/g, ""),
      }
    })
  }

  const handleSearch = useCallback(
    async (query: string, type: "from" | "to") => {
      if (query.length < 3) return

      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
        )
        const text = await response.text()
        const data = parseCSV(text)
        const filteredAirports = data.filter(
          (airport) =>
            airport.city?.toLowerCase().includes(query.toLowerCase()) ||
            airport.name?.toLowerCase().includes(query.toLowerCase())
        )
        if (type === "from") {
          setSuggestionsFrom(filteredAirports)
        } else {
          setSuggestionsTo(filteredAirports)
        }
      } catch (err) {
        console.error(err)
      }
    },
    []
  )

  const handleSelectFrom = (airport: any) => {
    // Only store the city name
    setSearchFrom(airport.city)
    setFromIata(airport.iata)
    setSuggestionsFrom([])
  }

  const handleSelectTo = (airport: any) => {
    // Only store the city name
    setSearchTo(airport.city)
    setToIata(airport.iata)
    setSuggestionsTo([])
  }

  const handleSubmit = async () => {
    if (!departureDate) return

    const formattedDepartureDate = departureDate.toISOString().split("T")[0]
    const tripDetails = {
      originSkyId: fromIata,
      destinationSkyId: toIata,
      fromDate: formattedDepartureDate,
      currency: "USD",
    }

    console.log("Outbound params:", tripDetails)
    alert(JSON.stringify(tripDetails, null, 2))

    try {
      // 1. Outbound API Call
      const outboundResponse = await fetch("/api/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripDetails),
      })
      const outboundData = await outboundResponse.json()
      console.log("Outbound Flight Data:", outboundData)
      alert(JSON.stringify(outboundData, null, 2))

      const outboundDataWithLocations = {
        ...outboundData,
        fromLocation: searchFrom,
        toLocation: searchTo,
      }
  
      // Pass the outbound data with locations to the parent
      onOutboundFlights(outboundDataWithLocations)

      // If roundtrip, we make another call for the return flight
      if (tripType === "roundtrip" && returnDate) {
        const formattedReturnDate = returnDate.toISOString().split("T")[0]
        const returnTripDetails = {
          originSkyId: toIata,
          destinationSkyId: fromIata,
          fromDate: formattedReturnDate,
          currency: "USD",
        }

        console.log("Return params:", returnTripDetails)

        const returnResponse = await fetch("/api/flights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(returnTripDetails),
        })
        const returnData = await returnResponse.json()
        console.log("Return Flight Data:", returnData)
        const returnDataWithLocations = {
          ...returnData,
          fromLocation: searchTo,
          toLocation: searchFrom,
        }
  
        // Pass the return data with locations to the parent
        onReturnFlights(returnDataWithLocations)
      }
      alert("Flight search completed!")
    } catch (error) {
      console.error("Error fetching flights:", error)
      alert("An error occurred while fetching the flights.")
    }
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Flights</CardTitle>
            <CardDescription>Your destination is waiting for you.</CardDescription>
          </div>
          <div className="flex items-center">
            <label className="text-sm font-medium mr-2">Trip Type:</label>
            <Select
              value={tripType}
              onValueChange={(value) => setTripType(value as "oneway" | "roundtrip")}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="roundtrip">Round Trip</SelectItem>
                <SelectItem value="oneway">One Way</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-wrap items-center gap-4">
            {/* From Input */}
            <div className="flex-1 relative">
              <Input
                id="WhereFrom"
                placeholder="Enter city or airport name (From)"
                value={searchFrom}
                onChange={(e) => {
                  setSearchFrom(e.target.value)
                  handleSearch(e.target.value, "from")
                }}
              />
              {suggestionsFrom.length > 0 && (
                <ul className="absolute top-full left-0 w-full border rounded-md shadow-md max-h-40 overflow-auto z-50 bg-white">
                  {suggestionsFrom.map((airport: any, index: number) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectFrom(airport)}
                    >
                      {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* To Input */}
            <div className="flex-1 relative">
              <Input
                id="WhereTo"
                placeholder="Enter city or airport name (To)"
                value={searchTo}
                onChange={(e) => {
                  setSearchTo(e.target.value)
                  handleSearch(e.target.value, "to")
                }}
              />
              {suggestionsTo.length > 0 && (
                <ul className="absolute top-full left-0 w-full border rounded-md shadow-md max-h-40 overflow-auto z-50 bg-white">
                  {suggestionsTo.map((airport: any, index: number) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectTo(airport)}
                    >
                      {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Date Picker */}
            <div className="flex-1">
              <FlightDatePicker
                tripType={tripType}
                setTripType={setTripType}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!isButtonEnabled}
              className="bg-black text-white hover:bg-gray-800"
            >
              Search Flights
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    
  )
}

export default FlightForm

//////////// main code 
// "use client"

// import React, { useState, useCallback, useEffect } from "react"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { FlightDatePicker } from "./FlightDatePicker"
// import { Button } from "@/components/ui/button"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// function FlightForm() {
//   const [searchFrom, setSearchFrom] = useState("")
//   const [searchTo, setSearchTo] = useState("")
//   const [suggestionsFrom, setSuggestionsFrom] = useState([])
//   const [suggestionsTo, setSuggestionsTo] = useState([])
//   const [departureDate, setDepartureDate] = useState<Date | null>(null)
//   const [returnDate, setReturnDate] = useState<Date | null>(null)
//   const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip")
//   const [isButtonEnabled, setIsButtonEnabled] = useState(false)

//   useEffect(() => {
//     if (
//       searchFrom &&
//       searchTo &&
//       departureDate &&
//       (tripType === "oneway" || (tripType === "roundtrip" && returnDate))
//     ) {
//       setIsButtonEnabled(true)
//     } else {
//       setIsButtonEnabled(false)
//     }
//   }, [searchFrom, searchTo, departureDate, returnDate, tripType])

//   const parseCSV = (data: string) => {
//     const rows = data.split("\n")
//     return rows.map((row) => {
//       const columns = row.split(",")
//       return {
//         name: columns[1]?.replace(/"/g, ""),
//         city: columns[2]?.replace(/"/g, ""),
//         country: columns[3]?.replace(/"/g, ""),
//         iata: columns[4]?.replace(/"/g, ""),
//       }
//     })
//   }

//   const handleSearch = useCallback(
//     async (query: string, type: "from" | "to") => {
//       if (query.length < 3) return

//       try {
//         const response = await fetch(
//           "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
//         )
//         const text = await response.text()
//         const data = parseCSV(text)
//         const filteredAirports = data.filter(
//           (airport) =>
//             airport.city?.toLowerCase().includes(query.toLowerCase()) ||
//             airport.name?.toLowerCase().includes(query.toLowerCase())
//         )
//         if (type === "from") {
//           setSuggestionsFrom(filteredAirports)
//         } else {
//           setSuggestionsTo(filteredAirports)
//         }
//       } catch (err) {
//         console.error(err)
//       }
//     },
//     []
//   )

//   const handleSelectFrom = (airport: any) => {
//     setSearchFrom(`${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`)
//     setSuggestionsFrom([])
//   }

//   const handleSelectTo = (airport: any) => {
//     setSearchTo(`${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`)
//     setSuggestionsTo([])
//   }

//   const handleSubmit = () => {
//     const tripDetails = {
//       from: searchFrom,
//       to: searchTo,
//       departureDate,
//       returnDate: tripType === "roundtrip" ? returnDate : null,
//       tripType,
//     }
//     console.log("Trip Details:", tripDetails)
//     alert(`Flight Search Submitted: ${JSON.stringify(tripDetails, null, 2)}`)
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-start">
//           <div>
//             <CardTitle>Flights</CardTitle>
//             <CardDescription>Your destination is waiting for you.</CardDescription>
//           </div>
//           <div className="flex items-center">
//             <label className="text-sm font-medium mr-2">Trip Type:</label>
//             <Select
//               value={tripType}
//               onValueChange={(value) => setTripType(value as "oneway" | "roundtrip")}
//             >
//               <SelectTrigger className="w-[140px]">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="roundtrip">Round Trip</SelectItem>
//                 <SelectItem value="oneway">One Way</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex flex-wrap items-center gap-4">
//             {/* From Input */}
//             <div className="flex-1 relative">
//               <Input
//                 id="WhereFrom"
//                 placeholder="Enter city or airport name (From)"
//                 value={searchFrom}
//                 onChange={(e) => {
//                   setSearchFrom(e.target.value)
//                   handleSearch(e.target.value, "from")
//                 }}
//               />
//               <ul className="absolute top-full left-0 w-full border rounded-md shadow-md max-h-40 overflow-auto z-50">
//                 {suggestionsFrom.map((airport: any, index: number) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-700 cursor-pointer"
//                     onClick={() => handleSelectFrom(airport)}
//                   >
//                     {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* To Input */}
//             <div className="flex-1 relative">
//               <Input
//                 id="WhereTo"
//                 placeholder="Enter city or airport name (To)"
//                 value={searchTo}
//                 onChange={(e) => {
//                   setSearchTo(e.target.value)
//                   handleSearch(e.target.value, "to")
//                 }}
//               />
//               <ul className="absolute top-full left-0 w-full  border rounded-md shadow-md max-h-40 overflow-auto z-50">
//                 {suggestionsTo.map((airport: any, index: number) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleSelectTo(airport)}
//                   >
//                     {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Date Picker */}
//             <div className="flex-1">
//               <FlightDatePicker
//                 tripType={tripType}
//                 setTripType={setTripType}
//                 departureDate={departureDate}
//                 setDepartureDate={setDepartureDate}
//                 returnDate={returnDate}
//                 setReturnDate={setReturnDate}
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-4 flex justify-end">
//             <Button
//               type="button"
//               onClick={handleSubmit}
//               disabled={!isButtonEnabled}
//               className="bg-black text-white hover:bg-gray-800"
//             >
//               Search Flights
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default FlightForm







// "use client"

// import React, { useState, useEffect, useCallback } from "react"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { FlightDatePicker } from "./FlightDatePicker"
// import { Button } from "@/components/ui/button"

// function FlightForm() {
//   const [searchFrom, setSearchFrom] = useState("")
//   const [searchTo, setSearchTo] = useState("")
//   const [suggestionsFrom, setSuggestionsFrom] = useState([])
//   const [suggestionsTo, setSuggestionsTo] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [departureDate, setDepartureDate] = useState<Date | null>(null)
//   const [returnDate, setReturnDate] = useState<Date | null>(null)
//   const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway")

//   // Parse CSV data
//   const parseCSV = (data: string) => {
//     const rows = data.split("\n")
//     return rows.map((row) => {
//       const columns = row.split(",")
//       return {
//         name: columns[1]?.replace(/"/g, ""), // Airport name
//         city: columns[2]?.replace(/"/g, ""), // City
//         country: columns[3]?.replace(/"/g, ""), // Country
//         iata: columns[4]?.replace(/"/g, ""), // IATA code
//       }
//     })
//   }

//   const handleSearch = useCallback(
//     async (query: string, type: "from" | "to") => {
//       if (query.length < 3) return
//       setIsLoading(true)
//       setError("")

//       try {
//         const response = await fetch(
//           "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
//         )
//         if (!response.ok) {
//           throw new Error("Failed to fetch data")
//         }
//         const text = await response.text()
//         const data = parseCSV(text)

//         const filteredAirports = data.filter(
//           (airport) =>
//             airport.city?.toLowerCase().includes(query.toLowerCase()) ||
//             airport.name?.toLowerCase().includes(query.toLowerCase())
//         )

//         if (type === "from") {
//           setSuggestionsFrom(filteredAirports)
//         } else {
//           setSuggestionsTo(filteredAirports)
//         }
//       } catch (err) {
//         console.error("Error fetching airport data:", err)
//         setError("Failed to load airport suggestions. Please try again.")
//       } finally {
//         setIsLoading(false)
//       }
//     },
//     []
//   )

//   const handleSelectFrom = (airport: any) => {
//     setSearchFrom(`${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`)
//     setSuggestionsFrom([]) // Clear dropdown
//   }

//   const handleSelectTo = (airport: any) => {
//     setSearchTo(`${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`)
//     setSuggestionsTo([]) // Clear dropdown
//   }

//   const handleSubmit = () => {
//     if (!searchFrom || !searchTo || !departureDate || (tripType === "roundtrip" && !returnDate)) {
//       alert("Please fill out all fields.")
//       return
//     }

//     const tripDetails = {
//       from: searchFrom,
//       to: searchTo,
//       departureDate,
//       returnDate: tripType === "roundtrip" ? returnDate : null,
//       tripType,
//     }

//     console.log("Trip Details:", tripDetails)
//     alert(`Flight Search Submitted: ${JSON.stringify(tripDetails, null, 2)}`)
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Flights</CardTitle>
//         <CardDescription>Your destination is waiting for you.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex gap-4">
//             <div className="flex gap-4">
//             {/* From Input */}
//             <div className="flex w-full">
//               <Input
//                 id="WhereFrom"
//                 placeholder="Enter city or airport name (From)"
//                 value={searchFrom}
//                 onChange={(e) => {
//                   setSearchFrom(e.target.value)
//                   handleSearch(e.target.value, "from")
//                 }}
//               />
//               {isLoading && <p className="text-sm text-gray-500">Loading suggestions...</p>}
//               {error && <p className="text-sm text-red-500">{error}</p>}
//               <ul className="bg-white rounded-md shadow-md mt-1 max-h-40 overflow-auto">
//                 {suggestionsFrom.map((airport: any, index: number) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleSelectFrom(airport)}
//                   >
//                     {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* To Input */}
//             <div className="flex w-full" >
              
//               <Input
//                 id="WhereTo"
//                 placeholder="Enter city or airport name (To)"
//                 value={searchTo}
//                 onChange={(e) => {
//                   setSearchTo(e.target.value)
//                   handleSearch(e.target.value, "to")
//                 }}
//               />
//               {isLoading && <p className="text-sm text-gray-500">Loading suggestions...</p>}
//               {error && <p className="text-sm text-red-500">{error}</p>}
//               <ul className="bg-white rounded-md shadow-md mt-1 max-h-40 overflow-auto">
//                 {suggestionsTo.map((airport: any, index: number) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleSelectTo(airport)}
//                   >
//                     {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Date Picker */}
//             <div className="w-1/2">
//               <FlightDatePicker
//                 tripType={tripType}
//                 setTripType={setTripType}
//                 departureDate={departureDate}
//                 setDepartureDate={setDepartureDate}
//                 returnDate={returnDate}
//                 setReturnDate={setReturnDate}
//               />
//             </div>
//             </div>
//             {/* Submit Button */}
//             <div className="items-center ">
//             <Button
//               type="button"
//               className=""
//               onClick={handleSubmit}
//               disabled={!searchFrom || !searchTo || !departureDate}
//             >
//               Search Flights
//             </Button>
//             </div>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default FlightForm
// "use client"

// import React, { useState, useEffect, useCallback } from "react"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { FlightDatePicker } from "./FlightDatePicker"
// import { Button } from "@/components/ui/button"

// function FlightForm() {
//   const [searchFrom, setSearchFrom] = useState("")
//   const [searchTo, setSearchTo] = useState("")
//   const [suggestionsFrom, setSuggestionsFrom] = useState([])
//   const [suggestionsTo, setSuggestionsTo] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [departureDate, setDepartureDate] = useState<Date | null>(null)
//   const [returnDate, setReturnDate] = useState<Date | null>(null)
//   const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway")

//   // Parse CSV data
//   const parseCSV = (data: string) => {
//     const rows = data.split("\n")
//     return rows.map((row) => {
//       const columns = row.split(",")
//       return {
//         name: columns[1]?.replace(/"/g, ""), // Airport name
//         city: columns[2]?.replace(/"/g, ""), // City
//         country: columns[3]?.replace(/"/g, ""), // Country
//         iata: columns[4]?.replace(/"/g, ""), // IATA code
//       }
//     })
//   }

//   const handleSearch = useCallback(
//     async (query: string, type: "from" | "to") => {
//       if (query.length < 3) return
//       setIsLoading(true)
//       setError("")

//       try {
//         const response = await fetch(
//           "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
//         )
//         if (!response.ok) {
//           throw new Error("Failed to fetch data")
//         }
//         const text = await response.text()
//         const data = parseCSV(text)

//         const filteredAirports = data.filter(
//           (airport) =>
//             airport.city?.toLowerCase().includes(query.toLowerCase()) ||
//             airport.name?.toLowerCase().includes(query.toLowerCase())
//         )

//         if (type === "from") {
//           setSuggestionsFrom(filteredAirports)
//         } else {
//           setSuggestionsTo(filteredAirports)
//         }
//       } catch (err) {
//         console.error("Error fetching airport data:", err)
//         setError("Failed to load airport suggestions. Please try again.")
//       } finally {
//         setIsLoading(false)
//       }
//     },
//     []
//   )

//   const handleSubmit = () => {
//     if (!searchFrom || !searchTo || !departureDate || (tripType === "roundtrip" && !returnDate)) {
//       alert("Please fill out all fields.")
//       return
//     }

//     const tripDetails = {
//       from: searchFrom,
//       to: searchTo,
//       departureDate,
//       returnDate: tripType === "roundtrip" ? returnDate : null,
//       tripType,
//     }

//     console.log("Trip Details:", tripDetails)
//     alert(`Flight Search Submitted: ${JSON.stringify(tripDetails, null, 2)}`)
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Flights</CardTitle>
//         <CardDescription>Your destination is waiting for you.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex flex-col gap-4">
//             {/* From Input */}
//             <div className="flex flex-col">
//               <Input
//                 id="WhereFrom"
//                 placeholder="Enter city or airport name (From)"
//                 value={searchFrom}
//                 onChange={(e) => {
//                   setSearchFrom(e.target.value)
//                   handleSearch(e.target.value, "from")
//                 }}
//               />
//               {isLoading && <p className="text-sm text-gray-500">Loading suggestions...</p>}
//               {error && <p className="text-sm text-red-500">{error}</p>}
//               <ul className="bg-white rounded-md shadow-md mt-1 max-h-40 overflow-auto">
//                 {suggestionsFrom.map((airport: any, index: number) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() =>
//                       setSearchFrom(`${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`)
//                     }
//                   >
//                     {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* To Input */}
//             <div className="flex flex-col">
//               <Input
//                 id="WhereTo"
//                 placeholder="Enter city or airport name (To)"
//                 value={searchTo}
//                 onChange={(e) => {
//                   setSearchTo(e.target.value)
//                   handleSearch(e.target.value, "to")
//                 }}
//               />
//               {isLoading && <p className="text-sm text-gray-500">Loading suggestions...</p>}
//               {error && <p className="text-sm text-red-500">{error}</p>}
//               <ul className="bg-white rounded-md shadow-md mt-1 max-h-40 overflow-auto">
//                 {suggestionsTo.map((airport: any, index: number) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() =>
//                       setSearchTo(`${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`)
//                     }
//                   >
//                     {airport.name} ({airport.iata}) - {airport.city}, {airport.country}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Date Picker */}
//             <div>
//               <FlightDatePicker
//                 tripType={tripType}
//                 setTripType={setTripType}
//                 departureDate={departureDate}
//                 setDepartureDate={setDepartureDate}
//                 returnDate={returnDate}
//                 setReturnDate={setReturnDate}
//               />
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="button"
//               className="mt-4"
//               onClick={handleSubmit}
//               disabled={!searchFrom || !searchTo || !departureDate}
//             >
//               Search Flights
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default FlightForm

// "use client"
// import * as React from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { FlightDatePicker } from "./FlightDatePicker";

// function FlightForm() {
//   const [fromCity, setFromCity] = React.useState("");
//   const [toCity, setToCity] = React.useState("");
//   const [citySuggestions, setCitySuggestions] = React.useState([]);
//   const [airportSuggestions, setAirportSuggestions] = React.useState([]);
//   const [allAirports, setAllAirports] = React.useState([]);
//   const [citySelected, setCitySelected] = React.useState(false);  // New state to track if a city has been selected

//   // Fetch all airport data on component mount
//   React.useEffect(() => {
//     const fetchAirports = async () => {
//       try {
//         const response = await fetch(
//           "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
//         );
//         const data = await response.text();
//         const parsedData = data
//           .split("\n")
//           .map((line) => line.split(","))
//           .map((fields) => ({
//             name: fields[1]?.replace(/"/g, ""),
//             city: fields[2]?.replace(/"/g, ""),
//             country: fields[3]?.replace(/"/g, ""),
//             iata: fields[4]?.replace(/"/g, ""),
//           }))
//           .filter((airport) => airport.iata);
//         setAllAirports(parsedData);
//       } catch (error) {
//         console.error("Error fetching airport data:", error);
//       }
//     };

//     fetchAirports();
//   }, []);

//   // Filter cities based on user input
//   const filterCities = (query) => {
//     setCitySelected(false);  // Reset city selection when user is typing
//     if (!query) {
//       setCitySuggestions([]);
//       return;
//     }
//     const cities = allAirports
//       .map((airport) => ({
//         city: airport.city,
//         country: airport.country,
//       }))
//       .filter(
//         (value, index, self) =>
//           self.findIndex((v) => v.city === value.city && v.country === value.country) === index
//       )
//       .filter(({ city, country }) =>
//         `${city}, ${country}`.toLowerCase().includes(query.toLowerCase())
//       );

//     setCitySuggestions(cities);
//     setAirportSuggestions([]);  // Clear airport suggestions when searching for new cities
//   };

//   // Filter airports in the selected city
//   const filterAirportsInCity = (city) => {
//     const airports = allAirports.filter((airport) => airport.city === city);
//     setAirportSuggestions(airports);
//   };

//   const handleFromCityChange = (e) => {
//     setFromCity(e.target.value);
//     filterCities(e.target.value);
//   };

//   const handleToCityChange = (e) => {
//     setToCity(e.target.value);
//     filterCities(e.target.value);
//   };

//   const handleCitySuggestionClick = (city, isFrom) => {
//     if (isFrom) {
//       setFromCity(city.city);
//       filterAirportsInCity(city.city);
//     } else {
//       setToCity(city.city);
//       filterAirportsInCity(city.city);
//     }
//     setCitySelected(true);  // Set city as selected to switch suggestion view
//     setCitySuggestions([]);  // Clear city suggestions after selection
//   };

//   const handleAirportSuggestionClick = (airport, isFrom) => {
//     const airportFullName = `${airport.city} - ${airport.name} (${airport.iata})`;
//     if (isFrom) {
//       setFromCity(airportFullName);
//     } else {
//       setToCity(airportFullName);
//     }
//     setAirportSuggestions([]);  // Clear airport suggestions after selection
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Flights</CardTitle>
//         <CardDescription>Your destination is waiting for you.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex flex-col gap-4">
//             {/* From City Input */}
//             <div className="relative">
//               <Input
//                 id="Where from?"
//                 placeholder="Departure City"
//                 value={fromCity}
//                 onChange={handleFromCityChange}
//               />
//               {!citySelected && citySuggestions.length > 0 && (
//                 <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto z-10 w-full">
//                   {citySuggestions.map((city, index) => (
//                     <li
//                       key={index}
//                       className="p-2 cursor-pointer hover:bg-gray-100"
//                       onClick={() => handleCitySuggestionClick(city, true)}
//                     >
//                       {city.city}, {city.country}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               {citySelected && airportSuggestions.length > 0 && (
//                 <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto z-10 w-full">
//                   {airportSuggestions.map((airport, index) => (
//                     <li
//                       key={index}
//                       className="p-2 cursor-pointer hover:bg-gray-100"
//                       onClick={() => handleAirportSuggestionClick(airport, true)}
//                     >
//                       {airport.name} ({airport.iata}), {airport.city}, {airport.country}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             {/* To City Input */}
//             <div className="relative">
//               <Input
//                 id="Where to?"
//                 placeholder="Destination City"
//                 value={toCity}
//                 onChange={handleToCityChange}
//               />
//               {!citySelected && citySuggestions.length > 0 && (
//                 <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto z-10 w-full">
//                   {citySuggestions.map((city, index) => (
//                     <li
//                       key={index}
//                       className="p-2 cursor-pointer hover:bg-gray-100"
//                       onClick={() => handleCitySuggestionClick(city, false)}
//                     >
//                       {city.city}, {city.country}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               {citySelected && airportSuggestions.length > 0 && (
//                 <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto z-10 w-full">
//                   {airportSuggestions.map((airport, index) => (
//                     <li
//                       key={index}
//                       className="p-2 cursor-pointer hover:bg-gray-100"
//                       onClick={() => handleAirportSuggestionClick(airport, false)}
//                     >
//                       {airport.name} ({airport.iata}), {airport.city}, {airport.country}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             {/* Date Picker */}
//             <div>
//               <FlightDatePicker />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

// export default FlightForm;