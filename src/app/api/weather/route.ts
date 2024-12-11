import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const date = searchParams.get("date");

  // Validate required parameters
  if (!city || !date) {
    return NextResponse.json(
      { error: "City and date are required parameters" },
      { status: 400 }
    );
  }

  const API_KEY = process.env.WEATHERAPI_KEY; // Replace with your WeatherAPI key
  const endpoint = `http://api.weatherapi.com/v1/future.json?key=${API_KEY}&q=${city}&dt=${date}`;

  try {
    const weatherResponse = await fetch(endpoint);
    if (!weatherResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: weatherResponse.status }
      );
    }

    const data = await weatherResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
