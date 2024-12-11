"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Sparkles } from 'lucide-react';

interface AISummaryData {
  title: string;
  summary: string;
  funfact: string;
  famous: string;
}

interface AISummaryCardProps {
  data: AISummaryData;
}

export default function AISummaryCard({ data }: AISummaryCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden w-full max-w-2xl">
      <div className="p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
        <CardHeader className="bg-white dark:bg-gray-800 pt-5">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-purple-500" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white dark:bg-gray-800 pt-2 pb-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">{data.summary}</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-500" />
              <span className="text-sm">{data.funfact}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              <span className="text-sm">{data.famous}</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
