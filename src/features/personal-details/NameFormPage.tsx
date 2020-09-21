import { NameForm, NameFormData } from './NameForm';
import React from 'react';
import { useSampleJoke } from './useSampleJoke';

export const NameFormPage: React.FC<NameFormData> = (props) => {
  const handleSubmit = (data: NameFormData) => alert(JSON.stringify(data));
  const { sampleJoke, setJokePreference } = useSampleJoke();
  return (
    <NameForm {...props} sampleJoke={sampleJoke} onJokePreferenceChanged={setJokePreference} onSubmit={handleSubmit} />
  );
};
