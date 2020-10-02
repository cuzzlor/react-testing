import React from 'react';
import { NameForm, NameFormData } from './NameForm';
import { useRecoilSampleJoke } from './useRecoilSampleJoke';

export const NameFormPage: React.FC<NameFormData> = (props) => {
  const handleSubmit = (data: NameFormData) => alert(JSON.stringify(data));
  const { sampleJoke, setJokePreference } = useRecoilSampleJoke();
  return (
    <NameForm {...props} sampleJoke={sampleJoke} onJokePreferenceChanged={setJokePreference} onSubmit={handleSubmit} />
  );
};
