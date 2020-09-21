import { JokePreference } from './NameForm';
import { useState, useEffect } from 'react';

const fetchRandomJoke = () =>
  fetch('https://official-joke-api.appspot.com/jokes/random').then((response) =>
    response.json().then((data) => `${data.setup} ${data.punchline}`)
  );

const fetchDadJoke = () =>
  fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'text/plain' },
  }).then((response) => response.text());

export const useSampleJoke = () => {
  const [jokePreference, setJokePreference] = useState<JokePreference | null>(null);
  const [sampleJoke, setSampleJoke] = useState<string | null>(null);

  useEffect(() => {
    if (jokePreference) {
      (jokePreference === 'dad' ? fetchDadJoke : fetchRandomJoke)().then(setSampleJoke);
    } else {
      setSampleJoke(null);
    }
  }, [jokePreference]);

  return { jokePreference, setJokePreference, sampleJoke };
};
