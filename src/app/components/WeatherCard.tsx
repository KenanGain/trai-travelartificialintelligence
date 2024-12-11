
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Sunrise, Sunset, Wind } from "lucide-react";

interface WeatherData {
  location: {
    name: string;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        avgtemp_c: number;
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
        };
        maxwind_kph: number;
        avghumidity: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
    }>;
  };
}

interface WeatherCardProps {
  city: string;
  date: string;
  onWeatherLoaded?: (data: WeatherData) => void;
}

export default function WeatherCard({ city, date, onWeatherLoaded }: WeatherCardProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 
  const prevCity = useRef<string | null>(null);
  const prevDate = useRef<string | null>(null);

  useEffect(() => {
    let canceled = false;


    if (!city || !date) return;

    const cityChanged = prevCity.current !== city;
    const dateChanged = prevDate.current !== date;

    if (weatherData && !cityChanged && !dateChanged) {
    
    }

   
    prevCity.current = city;
    prevDate.current = date;

    setLoading(true);
    setError("");

    (async () => {
      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}&date=${encodeURIComponent(date)}`);
        if (!response.ok) {
          throw new Error(`Error fetching weather: ${response.statusText}`);
        }

        const data: WeatherData = await response.json();
        if (!canceled) {
          setWeatherData(data);
          // biome-ignore lint/complexity/useOptionalChain: <explanation>
          onWeatherLoaded && onWeatherLoaded(data);
        }
      } catch (err: any) {
        if (!canceled) {
          setError(err.message);
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      canceled = true;
    };
  }, [city, date, onWeatherLoaded, weatherData]);

  if (loading) return <p className="text-center">Loading weather...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!weatherData) return null;

  const forecast = weatherData.forecast.forecastday[0];
  const { day, astro } = forecast;

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-blue-400 to-purple-500 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{weatherData.location.name}</CardTitle>
        <p className="text-sm text-blue-100">{forecast.date}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Cloud className="h-10 w-10 mr-2 text-blue-200" />
            <div>
              <p className="text-3xl font-bold">{day.avgtemp_c}°C</p>
              <p className="text-sm text-blue-100">{day.condition.text}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">H: {day.maxtemp_c}°C</p>
            <p className="text-sm font-medium">L: {day.mintemp_c}°C</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Wind className="h-5 w-5 mr-2 text-blue-200" />
            <span className="text-sm">{day.maxwind_kph} km/h</span>
          </div>
          <div className="flex items-center">
            <Droplets className="h-5 w-5 mr-2 text-blue-200" />
            <span className="text-sm">{day.avghumidity}% humidity</span>
          </div>
          <div className="flex items-center">
            <Sunrise className="h-5 w-5 mr-2 text-blue-200" />
            <span className="text-sm">{astro.sunrise}</span>
          </div>
          <div className="flex items-center">
            <Sunset className="h-5 w-5 mr-2 text-blue-200" />
            <span className="text-sm">{astro.sunset}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
