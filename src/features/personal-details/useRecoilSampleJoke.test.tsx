import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useRecoilSampleJoke } from './useRecoilSampleJoke';

describe('useRecoilSampleJoke', () => {
  const randomJokeResponse = { setup: 'Why did the chicken cross the road?', punchline: 'To get to the other side!' };
  const randomJoke = `${randomJokeResponse.setup} ${randomJokeResponse.punchline}`;
  const dadJoke = 'What did the 0 say to the 8? Nice belt.';

  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(randomJokeResponse),
        text: () => Promise.resolve(dadJoke),
      } as Response)
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const wrapper: React.FC = ({ children }) => <RecoilRoot>{children}</RecoilRoot>;
  const arrange = () => {
    const { result, waitForNextUpdate } = renderHook(() => useRecoilSampleJoke(), { wrapper });
    return { result, waitForNextUpdate };
  };

  it('gets a dad joke', async () => {
    const { result, waitForNextUpdate } = arrange();

    act(() => {
      result.current.setJokePreference('dad');
    });

    await waitForNextUpdate();

    expect(result.current.jokePreference).toEqual('dad');
    expect(result.current.sampleJoke.contents).toEqual(dadJoke);
  });

  it('gets a random joke', async () => {
    const { result, waitForNextUpdate } = arrange();

    act(() => {
      result.current.setJokePreference('random');
    });

    await waitForNextUpdate();

    expect(result.current.jokePreference).toEqual('random');
    expect(result.current.sampleJoke.contents).toEqual(randomJoke);
  });

  it('supports unsetting jokePreference', async () => {
    const { result, waitForNextUpdate } = arrange();

    act(() => {
      result.current.setJokePreference('random');
    });

    await waitForNextUpdate();

    expect(result.current.jokePreference).toEqual('random');
    expect(result.current.sampleJoke.contents).toEqual(randomJoke);

    act(() => {
      result.current.setJokePreference(null);
    });

    expect(result.current.jokePreference).toEqual(null);
    expect(result.current.sampleJoke.contents).toEqual(null);
  });
});
