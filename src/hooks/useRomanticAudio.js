import { useCallback, useEffect, useRef, useState } from 'react';

const melody = [
  { note: 392, duration: 0.62 },
  { note: 493.88, duration: 0.62 },
  { note: 587.33, duration: 0.86 },
  { note: 523.25, duration: 0.62 },
  { note: 440, duration: 0.86 },
  { note: 392, duration: 1.1 },
];

export function useRomanticAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const contextRef = useRef(null);
  const timersRef = useRef([]);
  const gainRef = useRef(null);

  const stop = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    if (gainRef.current && contextRef.current) {
      gainRef.current.gain.cancelScheduledValues(contextRef.current.currentTime);
      gainRef.current.gain.setTargetAtTime(0, contextRef.current.currentTime, 0.08);
    }

    setIsPlaying(false);
  }, []);

  const play = useCallback(async () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return;
    }

    if (!contextRef.current) {
      contextRef.current = new AudioContext();
      gainRef.current = contextRef.current.createGain();
      gainRef.current.gain.value = 0;
      gainRef.current.connect(contextRef.current.destination);
    }

    const context = contextRef.current;
    await context.resume();
    gainRef.current.gain.setTargetAtTime(0.08, context.currentTime, 0.22);

    const scheduleLoop = () => {
      let offset = 0;

      melody.forEach(({ note, duration }, index) => {
        const timer = window.setTimeout(() => {
          const now = context.currentTime;
          const oscillator = context.createOscillator();
          const noteGain = context.createGain();
          const filter = context.createBiquadFilter();

          oscillator.type = index % 2 === 0 ? 'sine' : 'triangle';
          oscillator.frequency.setValueAtTime(note, now);
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1550, now);

          noteGain.gain.setValueAtTime(0, now);
          noteGain.gain.linearRampToValueAtTime(0.32, now + 0.08);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

          oscillator.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(gainRef.current);

          oscillator.start(now);
          oscillator.stop(now + duration + 0.05);
        }, offset * 1000);

        timersRef.current.push(timer);
        offset += duration;
      });

      const loopTimer = window.setTimeout(scheduleLoop, (offset + 0.5) * 1000);
      timersRef.current.push(loopTimer);
    };

    stop();
    setIsPlaying(true);
    gainRef.current.gain.setTargetAtTime(0.08, context.currentTime, 0.22);
    scheduleLoop();
  }, [stop]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }, [isPlaying, play, stop]);

  useEffect(() => stop, [stop]);

  return { isPlaying, toggle };
}
