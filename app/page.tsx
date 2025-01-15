'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import { useUselessFactsGame } from '../hooks/useUselessFactsGame';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ThumbsUp, ThumbsDown, Flame } from 'lucide-react'

export default function UselessFactsAndCats() {
  const { 
    fact, 
    catImage, 
    score, 
    streak, 
    loading, 
    imageLoading, 
    error, 
    lastGuessCorrect, 
    fetchNewFact, 
    guessFactTruth 
  } = useUselessFactsGame();

  useEffect(() => {
    fetchNewFact();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Useless Facts and Cats Game</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Random Fact</CardTitle>
          <CardDescription>Guess if its true or false!</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-lg">{fact?.text}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => guessFactTruth(true)} disabled={loading || !fact}>
            <ThumbsUp className="mr-2 h-4 w-4" /> True
          </Button>
          <Button onClick={() => guessFactTruth(false)} disabled={loading || !fact}>
            <ThumbsDown className="mr-2 h-4 w-4" /> False
          </Button>
        </CardFooter>
      </Card>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Score: {score}</span>
            <span className="flex items-center">
              <Flame className="mr-2 h-5 w-5 text-orange-500" />
              Streak: {streak}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
            {imageLoading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : catImage ? (
              <Image
                src={catImage}
                alt="Random cat"
                width={400}
                height={300}
                className="object-cover w-full h-full"
                onError={() => console.error('Failed to load cat image')}
              />
            ) : (
              <p className="text-gray-500">Guess correctly to see a cat!</p>
            )}
          </div>
          {lastGuessCorrect !== null && (
            <p className={`mt-4 text-center ${lastGuessCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {lastGuessCorrect ? 'Correct! Heres a cat!' : 'Oops! Thats not right. Try again!'}
            </p>
          )}
        </CardContent>
      </Card>
      <p className="text-center text-sm text-gray-500">
        Made by Khaled Ali Ahmed
      </p>
    </div>
  );
}
