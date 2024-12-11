import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const context = await req.json(); 
  // `context` should include the city name, weather data, etc.
  // For example: { city: "Toronto", weather: { ... } }

  const prompt = `
  You are a helpful assistant that generates a structured summary for a given location and its weather.
  The user will provide a city name and possibly some weather data.
  
  Generate an object with:
  - title: A unique title for the summary that includes the city name.
  - summary: A short description of the future weather and one or two sentences about the city.
  - funfact: A real and interesting fun fact about the city.
  - famous: Information about what the city is known for.

  Use this context: ${JSON.stringify(context)}
  `;

  // Validate and define your response schema:
  const schema = z.object({
    title: z.string().describe('Unique title for AI summary with City name'),
    summary: z.string().describe('AI summary of weather and city'),
    funfact: z.string().describe('Location-related fun fact'),
    famous: z.string().describe('Information about what city is famous for'),
  });

  const result = streamObject({
    model: openai('gpt-4o-mini'),
    schema,
    prompt,
  });

  return result.toTextStreamResponse();
}