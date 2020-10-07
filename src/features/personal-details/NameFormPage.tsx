import React from 'react';
import { NameForm, NameFormData } from './NameForm';
import { useFilms } from './useFilms';
import { useRecoilSampleJoke } from './useRecoilSampleJoke';

export const NameFormPage: React.FC<NameFormData> = (props) => {
  const handleSubmit = (data: NameFormData) => alert(JSON.stringify(data));
  const { sampleJoke, setJokePreference } = useRecoilSampleJoke();
  const films = useFilms();
  return (
    <NameForm
      {...props}
      films={films}
      sampleJoke={sampleJoke}
      onJokePreferenceChanged={setJokePreference}
      onSubmit={handleSubmit}
    />
  );
};
