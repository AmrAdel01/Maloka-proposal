import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDown,
  CalendarHeart,
  Gem,
  Heart,
  Infinity,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { reasons, startDate, timeline } from './data.js';
import { MusicControl } from './components/MusicControl.jsx';
import { SectionHeader } from './components/SectionHeader.jsx';
import { ThreeLoveScene } from './components/ThreeLoveScene.jsx';
import { TiltCard } from './components/TiltCard.jsx';
import { TypewriterText } from './components/TypewriterText.jsx';
import { useMousePosition } from './hooks/useMousePosition.js';

const letter = `Habibty Malak ❤️,

I do not think words will ever be enough to describe what you truly mean to me, but I want you to know something from the deepest place in my heart: you have become one of the most beautiful parts of my life.

Since May 21, 2026, since the day we started talking, my days have changed in a way I cannot ignore. I love waking up knowing that I will talk to you. I love hearing about your day, your thoughts, your dreams, and even the smallest details that happen to you. Our conversations, whether they are deep and meaningful or completely random, have become the best part of my day.

Your smile is honestly one of my favorite things in this world. There is something magical about it. Whenever you smile, it feels like all the stress, worries, and sadness inside me become lighter. Your happiness means so much to me because seeing you happy genuinely makes me happy. Sometimes I find myself wanting to do little things only to see that smile, because your happiness has become part of my own.

You are one of the kindest people I have ever known. The way you care, the way you listen, the way you support me, and the way you make me feel understood mean more than you can imagine. Your kindness is not ordinary. It is rare, soft, beautiful, and unforgettable.

Thank you for standing beside me, for believing in me, and for reminding me that I am capable of more than I think, especially in the moments when I struggle to believe in myself. Your support gives me strength, and your presence gives me peace.

I love the way we laugh together, smile together, and create beautiful memories from the simplest moments. Sometimes we do not need anything special at all. Just talking to you is enough to make an ordinary day feel extraordinary.

Habibty, I want you beside me forever. I want to protect your happiness, care for your heart, and do everything I can to make you feel loved, safe, chosen, and cherished every single day. I hope you will be mine forever, not only in words, but in every little action, every promise, every morning, and every future dream we build together.

I love you not only for your beautiful smile or your kindness, but for your heart, your soul, and all the tiny details that make you, you. No matter what happens, I will always cherish every conversation, every smile, every laugh, and every moment we spend together, because they all mean the world to me.

I love you so much, Habibty ❤️`;

const sectionMotion = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

function SparkleField() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 72 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${2.5 + Math.random() * 4}s`,
      })),
    [],
  );

  return (
    <div className="sparkle-field">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            '--delay': sparkle.delay,
            '--duration': sparkle.duration,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 120]);
  const contentY = useTransform(scrollY, [0, 700], [0, -80]);

  const scrollToStory = () => {
    document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-110 bg-[url('/assets/hero-romantic-garden.png')] bg-cover bg-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-velvet/20 via-velvet/50 to-velvet" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,214,224,0.08),transparent_34rem)]" />
      <ThreeLoveScene />

      <motion.div
        style={{ y: contentY }}
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-5 pb-24 pt-28 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-gold backdrop-blur-xl"
        >
          <Sparkles className="h-4 w-4" />
          A little forever
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="romantic-gradient-text animate-shimmer font-script text-[4.8rem] leading-none drop-shadow-[0_0_30px_rgba(255,214,224,0.35)] sm:text-[7rem] lg:text-[9rem]"
        >
          To My Habibty ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75 }}
          className="mt-5 max-w-2xl font-display text-2xl leading-snug text-white/88 sm:text-4xl"
        >
          Every moment with you feels like magic.
        </motion.p>

        <motion.button
          type="button"
          onClick={scrollToStory}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          whileHover={{ scale: 1.06, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="animate-pulseGlow group mt-10 inline-flex items-center gap-3 rounded-full border border-gold/70 bg-gradient-to-r from-white/22 via-blush/24 to-gold/24 px-7 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-glow backdrop-blur-xl transition"
        >
          <Heart className="h-5 w-5 fill-blush text-blush transition group-hover:scale-125" />
          Start Our Story
          <ArrowDown className="h-5 w-5 transition group-hover:translate-y-1" />
        </motion.button>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-28 bg-gradient-to-t from-velvet to-transparent" />
    </section>
  );
}

function StoryTimeline() {
  return (
    <section id="our-story" className="soft-section px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Our Story"
          title="The sweetest timeline"
          copy="A few little chapters from the love story I never want to stop reading."
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent sm:left-1/2" />

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 48, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
                className={`relative grid gap-5 sm:grid-cols-2 ${
                  index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'
                }`}
              >
                <div className={index % 2 === 0 ? 'sm:pr-10' : 'sm:col-start-2 sm:pl-10'}>
                  <TiltCard className="glass rounded-[1.5rem] p-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold">
                      {item.date}
                    </p>
                    <h3 className="font-display text-2xl text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/68">{item.copy}</p>
                  </TiltCard>
                </div>
                <div className="absolute left-4 top-7 h-4 w-4 -translate-x-1/2 rounded-full border border-gold bg-blush shadow-glow sm:left-1/2" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Reasons"
          title="Why I love you"
          copy="Cute little truths, each one too small to hold the whole feeling."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((reason, index) => (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="reason-card min-h-[13rem]"
              tabIndex={0}
            >
              <div className="reason-card-inner relative h-full">
                <div className="reason-card-face glass flex min-h-[13rem] flex-col justify-between rounded-[1.4rem] p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blush/18 text-blush shadow-glow">
                    <Heart className="h-6 w-6 fill-blush" />
                  </div>
                  <h3 className="mt-8 font-display text-2xl text-white">{reason.title}</h3>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold/80">
                    Hover me
                  </p>
                </div>

                <div className="reason-card-face reason-card-back glass flex min-h-[13rem] items-center rounded-[1.4rem] p-5">
                  <p className="text-sm leading-7 text-white/78">{reason.copy}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function useLoveCounter() {
  const getDiff = useCallback(() => {
    const start = new Date(startDate).getTime();
    const diff = Math.max(0, Date.now() - start);
    const totalMinutes = Math.floor(diff / 60000);

    return {
      days: Math.floor(totalMinutes / 1440),
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes,
    };
  }, []);

  const [counter, setCounter] = useState(getDiff);

  useEffect(() => {
    const timer = window.setInterval(() => setCounter(getDiff()), 1000);
    return () => window.clearInterval(timer);
  }, [getDiff]);

  return counter;
}

function LoveCounter() {
  const counter = useLoveCounter();
  const items = [
    { label: 'Days since May 21', value: counter.days },
    { label: 'Hours talking', value: counter.hours },
    { label: 'Minutes talking', value: counter.minutes },
  ];

  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Love Counter"
          title="Every minute counts"
          copy="Counting from May 21, 2026, the day our conversations began."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <TiltCard className="glass rounded-[1.5rem] p-6 text-center">
                <CalendarHeart className="mx-auto mb-5 h-9 w-9 text-gold" />
                <motion.p
                  key={item.value}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-5xl font-bold text-white sm:text-6xl"
                >
                  {item.value.toLocaleString()}
                </motion.p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.32em] text-white/58">
                  {item.label}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoveLetter() {
  return (
    <section className="soft-section px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Love Letter"
          title="For my Habibty"
          copy="Everything I want your heart to know, written slowly."
        />
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="glass relative overflow-hidden rounded-[1.8rem] p-7 sm:p-10"
        >
          <div className="absolute right-8 top-8 hidden h-20 w-20 rounded-full border border-gold/30 sm:block" />
          <div className="mb-7 flex items-center gap-3 text-gold">
            <Gem className="h-6 w-6" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em]">
              Dear Habibty
            </span>
          </div>
          <TypewriterText text={letter} speed={12} />
        </motion.div>
      </div>
    </section>
  );
}

function HeartRain({ active }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 90 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        duration: `${3.2 + Math.random() * 3.8}s`,
        delay: `${Math.random() * 1.8}s`,
        drift: `${(Math.random() - 0.5) * 240}px`,
        rotate: `${(Math.random() - 0.5) * 420}deg`,
      })),
    [active],
  );

  if (!active) return null;

  return (
    <div className="heart-rain z-40">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            '--duration': heart.duration,
            '--drift': heart.drift,
            '--rotate': heart.rotate,
            animationDelay: heart.delay,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

function FinalProposal() {
  const [accepted, setAccepted] = useState(false);

  const launchCelebration = useCallback(() => {
    setAccepted(true);

    const end = Date.now() + 2400;
    const colors = ['#FFD6E0', '#E6E6FA', '#FFFFFF', '#F7D794'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.78 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.78 },
        colors,
      });
      confetti({
        particleCount: 2,
        startVelocity: 34,
        spread: 360,
        origin: { x: 0.5, y: 0.32 },
        colors,
        scalar: 1.15,
      });

      if (Date.now() < end) {
        window.requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <section className="relative overflow-hidden px-5 py-28 sm:py-40">
      <HeartRain active={accepted} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,214,224,0.2),transparent_26rem)]" />
      <motion.div
        variants={sectionMotion}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="glass relative z-10 mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-20"
      >
        <div className="absolute -left-12 top-10 h-40 w-40 rounded-full border border-blush/20" />
        <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full border border-gold/25" />

        <motion.div
          animate={{ rotate: accepted ? [0, -7, 7, -4, 4, 0] : 0, scale: accepted ? [1, 1.16, 1] : 1 }}
          transition={{ duration: 0.95 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-blush/16 text-gold shadow-glow"
        >
          <Infinity className="h-10 w-10" />
        </motion.div>

        <motion.h2
          animate={accepted ? { scale: [1, 1.04, 1] } : {}}
          transition={{ duration: 0.8 }}
          className="romantic-gradient-text animate-shimmer font-script text-5xl leading-tight sm:text-7xl lg:text-8xl"
        >
          Habibty, Will You Be Mine Forever? 💍❤️
        </motion.h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
          No matter where life takes us, my favorite place will always be beside you.
        </p>

        <motion.button
          type="button"
          onClick={launchCelebration}
          disabled={accepted}
          whileHover={{ scale: accepted ? 1 : 1.07, y: accepted ? 0 : -4 }}
          whileTap={{ scale: accepted ? 1 : 0.98 }}
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-gold/80 bg-gradient-to-r from-blush/34 via-white/22 to-gold/34 px-8 py-4 text-sm font-bold uppercase tracking-[0.24em] text-white shadow-glow backdrop-blur-xl transition disabled:cursor-default disabled:opacity-90"
        >
          <Heart className="h-5 w-5 fill-blush text-blush" />
          Yes, Forever ❤️
        </motion.button>

        <AnimatePresence>
          {accepted ? (
            <motion.p
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mt-8 max-w-2xl font-display text-2xl text-white sm:text-3xl"
            >
              You just made me the happiest person alive ❤️
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function App() {
  const mouse = useMousePosition();
  const parallaxX =
    typeof window === 'undefined' ? 0 : ((mouse.x / window.innerWidth) - 0.5) * 20;
  const parallaxY =
    typeof window === 'undefined' ? 0 : ((mouse.y / window.innerHeight) - 0.5) * 20;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-hidden"
      style={{
        '--mouse-x': `${mouse.x}px`,
        '--mouse-y': `${mouse.y}px`,
      }}
    >
      <SparkleField />
      <div className="cursor-glow" />
      <div
        className="pointer-events-none fixed inset-0 z-[2] opacity-70"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
          background:
            'radial-gradient(circle at 20% 30%, rgba(255, 214, 224, 0.08), transparent 18rem), radial-gradient(circle at 84% 70%, rgba(247, 215, 148, 0.08), transparent 16rem)',
        }}
      />

      <div className="relative z-10">
        <Hero />
        <StoryTimeline />
        <Reasons />
        <LoveCounter />
        <LoveLetter />
        <FinalProposal />
      </div>

      <MusicControl />
    </motion.main>
  );
}

export default App;
