import { useState, useCallback } from 'react';
import { getRandomFactWithTruthValue, getRandomCatImage } from '../utils/api.ts';

export function useUselessFactsGame() {
  const [fact, setFact] = useState<{ text: string; isTrue: boolean } | null>(null);
  const [catImage, setCatImage] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGuessCorrect, setLastGuessCorrect] = useState<boolean | null>(null);

  const fetchNewFact = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newFact = await getRandomFactWithTruthValue();
      setFact(newFact);
    } catch (err) {
      setError('Failed to fetch a new fact. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCatImage = useCallback(async () => {
    setImageLoading(true);
    try {
      const imageUrl = await getRandomCatImage();
      setCatImage(imageUrl);
    } catch (err) {
      console.error('Failed to fetch cat image:', err);
      setCatImage(null);
    } finally {
      setImageLoading(false);
    }
  }, []);

  const guessFactTruth = useCallback(async (guess: boolean) => {
    if (!fact) return;

    const isCorrect = guess === fact.isTrue;
    setLastGuessCorrect(isCorrect);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setStreak((prevStreak) => prevStreak + 1);
      await fetchCatImage();
    } else {
      setStreak(0);
      setCatImage(null);
    }

    await fetchNewFact();
  }, [fact, fetchNewFact, fetchCatImage]);

  return {
    fact,
    catImage,
    score,
    streak,
    loading,
    imageLoading,
    error,
    lastGuessCorrect,
    fetchNewFact,
    guessFactTruth,
  };
}
