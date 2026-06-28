import { motion } from 'framer-motion';

export function SectionHeader({ eyebrow, title, copy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl text-white sm:text-5xl">{title}</h2>
      {copy ? (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
          {copy}
        </p>
      ) : null}
    </motion.div>
  );
}
