import { type NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { originSkyId, destinationSkyId, fromDate, currency } = body

    if (!originSkyId || !destinationSkyId || !fromDate || !currency) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar',
      params: {
        originSkyId,
        destinationSkyId,
        fromDate,
        currency,
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      },
    }

    const response = await axios.request(options)
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error('Error fetching price calendar:', error)
    return NextResponse.json({ error: 'Failed to fetch price calendar' }, { status: 500 })
  }
}
