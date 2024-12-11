// "use client"
// import Image from "next/image";
// import NavBar from "./components/NavBar";
// import FlightForm from "./components/FlightForm";
// import { useState } from "react";
// import { FlightList } from "./components/FlightList";

// export default function Home() {
//   const [outboundFlights, setOutboundFlights] = useState<any>(null);
//   const [returnFlights, setReturnFlights] = useState<any>(null);

//   return (
//     <div>
//      <div className="w-full h-12">
//       <NavBar />
//      </div>
//      <div className="w-full h-full px-10 pt-10 ">
//      <FlightForm
//           onOutboundFlights={(data) => setOutboundFlights(data)}
//           onReturnFlights={(data) => setReturnFlights(data)}
//         />
//      </div>
     
//       <div className="w-full h-full px-10 pt-10 ">
//      {/* Show Outbound Flights if available */}
//      {outboundFlights && <FlightList title="Outbound Flights" flightData={outboundFlights} />}
//      </div>
//      <div className="w-full h-full px-10 pt-10 ">
//         {/* Show Return Flights if available */}
//         {returnFlights && <FlightList title="Return Flights" flightData={returnFlights} />}
//       </div>
//       </div>
    

//   );
// }
// "use client";

// import NavBar from "./components/NavBar";
// import FlightForm from "./components/FlightForm";
// import WeatherCard from "./components/WeatherCard";
// import { useEffect, useState } from "react";
// import { FlightList } from "./components/FlightList";
// import { BoardingPass } from "./components/BoardingPass";
// import AISummaryCard from "./components/AISummaryCard";

// export default function Home() {
//   const [outboundFlights, setOutboundFlights] = useState<any>(null);
//   const [returnFlights, setReturnFlights] = useState<any>(null);

//   const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<any>(null);
//   const [selectedReturnFlight, setSelectedReturnFlight] = useState<any>(null);

//   const [outboundWeather, setOutboundWeather] = useState<any>(null);
//   const [returnWeather, setReturnWeather] = useState<any>(null);

//   const [outboundAISummary, setOutboundAISummary] = useState<any>(null);
//   const [returnAISummary, setReturnAISummary] = useState<any>(null);

//   const handleBuyOutboundFlight = (flight: any) => {
//     setSelectedOutboundFlight(flight);
//   };

//   const handleBuyReturnFlight = (flight: any) => {
//     setSelectedReturnFlight(flight);
//   };
  
//   useEffect(() => {
//     const fetchOutboundAISummary = async () => {
//       if (!outboundWeather || !selectedOutboundFlight) return;
//       const city = outboundWeather.location.name;

//       const response = await fetch("/api/summary", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           city: city,
//           weatherData: outboundWeather,
//         }),
//       });

//       if (!response.ok) {
//         console.error("Failed to fetch outbound AI summary");
//         return;
//       }

//       const data = await response.json();
//       setOutboundAISummary(data);
//     };

//     fetchOutboundAISummary();
//   }, [outboundWeather, selectedOutboundFlight]);

//   // Fetch AI summary for return
//   useEffect(() => {
//     const fetchReturnAISummary = async () => {
//       if (!returnWeather || !selectedReturnFlight) return;
//       const city = returnWeather.location.name;

//       const response = await fetch("/api/summary", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           city: city,
//           weatherData: returnWeather,
//         }),
//       });

//       if (!response.ok) {
//         console.error("Failed to fetch return AI summary");
//         return;
//       }

//       const data = await response.json();
//       setReturnAISummary(data);
//     };

//     fetchReturnAISummary();
//   }, [returnWeather, selectedReturnFlight]);

//   return (
//     <div>
//       <div className="w-full h-12">
//         <NavBar />
//       </div>
//       <div className="w-full h-full px-10 pt-10">
//         <FlightForm
//           onOutboundFlights={(data) => setOutboundFlights(data)}
//           onReturnFlights={(data) => setReturnFlights(data)}
//         />
//       </div>

//       <div className="w-full h-full px-10 pt-10">
//         {!selectedOutboundFlight && outboundFlights && (
//           <FlightList
//             title="Outbound Flights"
//             flightData={outboundFlights}
//             onBuyFlight={handleBuyOutboundFlight}
//           />
//         )}
//         {selectedOutboundFlight && (
//           <BoardingPass
//             from={selectedOutboundFlight.from}
//             to={selectedOutboundFlight.to}
//             date={selectedOutboundFlight.date}
//             price={selectedOutboundFlight.price}
//             boardingTime={selectedOutboundFlight.flightTime}
//           />
//         )}
//       </div>

//       <div className="w-full h-full px-10 pt-10">
//         {!selectedReturnFlight && returnFlights && (
//           <FlightList
//             title="Return Flights"
//             flightData={returnFlights}
//             onBuyFlight={handleBuyReturnFlight}
//           />
//         )}
//         {selectedReturnFlight && (
//           <BoardingPass
//             from={selectedReturnFlight.from}
//             to={selectedReturnFlight.to}
//             date={selectedReturnFlight.date}
//             price={selectedReturnFlight.price}
//             boardingTime={selectedReturnFlight.flightTime}
//           />
//         )}
//       </div>

//       <div className="w-full h-full px-10 pt-10 grid gap-6 md:grid-cols-2">
//         {selectedOutboundFlight && (
//           <WeatherCard
//             city={selectedOutboundFlight.to}
//             date={selectedOutboundFlight.date}
//             onWeatherLoaded={(data) => setOutboundWeather(data)}
//           />
//         )}
//         {selectedReturnFlight && (
//           <WeatherCard
//             city={selectedReturnFlight.to}
//             date={selectedReturnFlight.date}
//             onWeatherLoaded={(data) => setReturnWeather(data)}
//           />
//         )}

//         {outboundAISummary && <AISummaryCard data={outboundAISummary} />}
//         {returnAISummary && <AISummaryCard data={returnAISummary} />}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState, useRef } from "react";
import { format, differenceInDays } from "date-fns";
import NavBar from "./components/NavBar";
import FlightForm from "./components/FlightForm";
import WeatherCard from "./components/WeatherCard";
import { FlightList } from "./components/FlightList";
import { BoardingPass } from "./components/BoardingPass";
import AISummaryCard from "./components/AISummaryCard";
import  { SiteFooter }  from "./components/SiteFooter";

export default function Home() {
  const [outboundFlights, setOutboundFlights] = useState<any>(null);
  const [returnFlights, setReturnFlights] = useState<any>(null);

  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<any>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<any>(null);

  const [outboundWeather, setOutboundWeather] = useState<any>(null);
  const [returnWeather, setReturnWeather] = useState<any>(null);

  const [outboundAISummary, setOutboundAISummary] = useState<any>(null);
  const [returnAISummary, setReturnAISummary] = useState<any>(null);

  const handleBuyOutboundFlight = (flight: any) => {
    // User clicked Buy Now for an outbound flight:
    // This sets selectedOutboundFlight, triggering WeatherCard to appear once date is validated.
    setSelectedOutboundFlight(flight);
    // Reset previous results if any:
    setOutboundWeather(null);
    setOutboundAISummary(null);
  };

  const handleBuyReturnFlight = (flight: any) => {
    setSelectedReturnFlight(flight);
    setReturnWeather(null);
    setReturnAISummary(null);
  };

  // Format date for Weather API (disable strict validation for now)
  const getWeatherDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return format(dateObj, "yyyy-MM-dd");
  };

  const outboundWeatherDate = selectedOutboundFlight ? getWeatherDate(selectedOutboundFlight.date) : null;
  const returnWeatherDate = selectedReturnFlight ? getWeatherDate(selectedReturnFlight.date) : null;

  // Fetch Outbound AI Summary once we have outboundWeather and a selected outbound flight
  useEffect(() => {
    if (!outboundWeather || !selectedOutboundFlight) return;
    if (outboundAISummary) return; // Already fetched, no need again

    const fetchOutboundAISummary = async () => {
      const city = outboundWeather.location.name;
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          weatherData: outboundWeather,
        }),
      });

      if (!response.ok) {
        console.error("Failed to fetch outbound AI summary");
        return;
      }

      const data = await response.json();
      setOutboundAISummary(data);
    };

    fetchOutboundAISummary();
  }, [outboundWeather, selectedOutboundFlight, outboundAISummary]);

  // Fetch Return AI Summary once we have returnWeather and a selected return flight
  useEffect(() => {
    if (!returnWeather || !selectedReturnFlight) return;
    if (returnAISummary) return; // Already fetched, no need again

    const fetchReturnAISummary = async () => {
      const city = returnWeather.location.name;
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          weatherData: returnWeather,
        }),
      });

      if (!response.ok) {
        console.error("Failed to fetch return AI summary");
        return;
      }

      const data = await response.json();
      setReturnAISummary(data);
    };

    fetchReturnAISummary();
  }, [returnWeather, selectedReturnFlight, returnAISummary]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="w-full h-12">
        <NavBar />
      </div>
      <div className="w-full h-full px-10 pt-10">
        <FlightForm
          onOutboundFlights={(data) => setOutboundFlights(data)}
          onReturnFlights={(data) => setReturnFlights(data)}
        />
      </div>

      <div className="w-full h-full px-10 pt-10">
        {!selectedOutboundFlight && outboundFlights && (
          <FlightList
            title="Outbound Flights"
            flightData={outboundFlights}
            onBuyFlight={handleBuyOutboundFlight}
          />
        )}
        {selectedOutboundFlight && (
          <BoardingPass
            from={selectedOutboundFlight.from}
            to={selectedOutboundFlight.to}
            date={selectedOutboundFlight.date}
            price={selectedOutboundFlight.price}
            boardingTime={selectedOutboundFlight.flightTime}
          />
        )}
      </div>

      <div className="w-full h-full px-10 pt-10">
        {!selectedReturnFlight && returnFlights && (
          <FlightList
            title="Return Flights"
            flightData={returnFlights}
            onBuyFlight={handleBuyReturnFlight}
          />
        )}
        {selectedReturnFlight && (
          <BoardingPass
            from={selectedReturnFlight.from}
            to={selectedReturnFlight.to}
            date={selectedReturnFlight.date}
            price={selectedReturnFlight.price}
            boardingTime={selectedReturnFlight.flightTime}
          />
        )}
      </div>

      <div className="w-full h-full px-10 pt-10 grid gap-6 md:grid-cols-2">

        {selectedOutboundFlight && outboundWeatherDate && (
          <WeatherCard
            city={selectedOutboundFlight.to}
            date={outboundWeatherDate}
            // WeatherCard fetches weather once, onWeatherLoaded sets outboundWeather
            onWeatherLoaded={(data) => setOutboundWeather(data)}
          />
        )}

        {selectedReturnFlight && returnWeatherDate && (
          <WeatherCard
            city={selectedReturnFlight.to}
            date={returnWeatherDate}
            // WeatherCard fetches weather once, onWeatherLoaded sets returnWeather
            onWeatherLoaded={(data) => setReturnWeather(data)}
          />
        )}

        {outboundAISummary && <AISummaryCard data={outboundAISummary} />}
        {returnAISummary && <AISummaryCard data={returnAISummary} />}
      </div>
     <div className="">
     <SiteFooter />
     </div>
    </div>
  );
}
