import { useEffect, useState } from 'react';

export function TypewriterText({ text, speed = 36 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let index = 0;
    const interval = window.setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index += 1;

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [speed, text]);

  return (
    <p className="typewriter min-h-[12rem] whitespace-pre-line text-lg leading-9 text-white/84 sm:text-xl sm:leading-10">
      {displayed}
      <span className="ml-1 inline-block h-6 w-px translate-y-1 bg-gold" />
    </p>
  );
}
