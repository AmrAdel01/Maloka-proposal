import { Music, Pause, Play } from 'lucide-react';
import { useRomanticAudio } from '../hooks/useRomanticAudio.js';

export function MusicControl() {
  const { isPlaying, toggle } = useRomanticAudio();

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white shadow-glow backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-gold"
      aria-label={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      <Music className="absolute h-9 w-9 text-gold/20" />
      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
    </button>
  );
}
