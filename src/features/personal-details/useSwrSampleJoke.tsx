import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import { JokePreference } from './NameForm';

const randomJoke = {
  url: 'https://official-joke-api.appspot.com/jokes/random',
  fetcher: (url: string) =>
    fetch(url).then((response) => response.json().then((data) => `${data.setup} ${data.punchline}`)),
};

const dadJoke = {
  url: 'https://icanhazdadjoke.com/',
  fetcher: (url: string) =>
    fetch(url, {
      headers: { Accept: 'text/plain' },
    }).then((response) => response.text()),
};

const getJokeConfig = (jokePreference: JokePreference | null) => {
  if (jokePreference) {
    return jokePreference === 'dad' ? dadJoke : randomJoke;
  } else {
    return {
      url: null,
      fetcher: () => Promise.resolve(null),
    };
  }
};

const jokePreferenceState = atom<JokePreference | null>({
  key: 'jokePreferenceState',
  default: null,
});

export const useSwrSampleJoke = () => {
  const jokePreference = useRecoilValue(jokePreferenceState);
  const jokeConfig = getJokeConfig(jokePreference);
  const { data, error } = useSWR(jokeConfig.url, jokeConfig.fetcher, { refreshInterval: 100000 });
  return {
    jokePreference,
    setJokePreference: useSetRecoilState(jokePreferenceState),
    isLoading: !data && !error,
    sampleJoke: data,
  };
};
