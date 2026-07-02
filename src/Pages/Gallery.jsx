import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  { src: "AVIF.AVIF", title: "Auto Expo Stand", category: "Auto Expo" },
  { src: "IMG1.AVIF", title: "Auto Expo Stand 2", category: "Auto Expo" },
  { src: "IMG2.AVIF", title: "Wedding Setup", category: "Wedding" },
  { src: "IMG3.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG4.AVIF", title: "Corporate Conference", category: "Corporate" },
  { src: "IMG5.AVIF", title: "Corporate Stage", category: "Corporate" },
  { src: "IMG6.AVIF", title: "Wedding Mandap", category: "Corporate" },
  { src: "IMG7.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG8.AVIF", title: "Wedding Mandap", category: "Corporate" },
  { src: "IMG9.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG10.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG11.AVIF", title: "Wedding Mandap", category: "Corporate" },
  { src: "IMG12.AVIF", title: "Wedding Mandap", category: "Auto Expo" },
  { src: "IMG13.AVIF", title: "Wedding Mandap", category: "Auto Expo" },
  { src: "IMG14.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG15.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG16.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG17.AVIF", title: "Wedding Mandap", category: "Auto Expo" },
  { src: "IMG18.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG19.AVIF", title: "Wedding Mandap", category: "Auto Expo" },
  { src: "IMG20.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG21.AVIF", title: "Wedding Mandap", category: "Auto Expo" },
  { src: "IMG22.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG23.AVIF", title: "Wedding Mandap", category: "Corporate" },
  { src: "IMG24.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG25.AVIF", title: "Wedding Mandap", category: "Auto Expo" },
  { src: "IMG26.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG27.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG28.AVIF", title: "Wedding Mandap", category: "Corporate" },
  { src: "IMG29.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG30.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG31.AVIF", title: "Wedding Mandap", category: "Auto Expo" },
  { src: "IMG32.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG33.AVIF", title: "Wedding Mandap", category: "Corporate" },
  { src: "IMG34.AVIF", title: "Wedding Mandap", category: "Wedding" },
  { src: "IMG35.AVIF", title: "Wedding Mandap", category: "Corporate" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next, for slide animation

  const categories = useMemo(() => {
    const unique = [...new Set(images.map((img) => img.category))];
    return ["All", ...unique];
  }, []);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (img) => {
    setDirection(0);
    setSelectedImage(img);
  };
  const closeLightbox = () => setSelectedImage(null);

  const goNext = useCallback(
    (e) => {
      e?.stopPropagation();
      setDirection(1);
      const idx = filteredImages.findIndex((i) => i.src === selectedImage.src);
      setSelectedImage(filteredImages[(idx + 1) % filteredImages.length]);
    },
    [filteredImages, selectedImage],
  );

  const goPrev = useCallback(
    (e) => {
      e?.stopPropagation();
      setDirection(-1);
      const idx = filteredImages.findIndex((i) => i.src === selectedImage.src);
      setSelectedImage(
        filteredImages[
          (idx - 1 + filteredImages.length) % filteredImages.length
        ],
      );
    },
    [filteredImages, selectedImage],
  );

  // ---------- keyboard navigation: Esc to close, arrows to move ----------
  useEffect(() => {
    if (!selectedImage) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImage, goNext, goPrev]);

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir === 0 ? 0 : dir > 0 ? 60 : -60,
      scale: dir === 0 ? 0.92 : 1,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -60 : dir < 0 ? 60 : 0,
      scale: 1,
    }),
  };

  return (
    <section className="bg-white text-neutral-900 px-4 sm:px-8 py-16 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-2">
          Our Work
        </p>
        <h2 className="text-3xl sm:text-4xl font-medium mb-3">
          Events We've Brought to Life
        </h2>
        <p className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto">
          A glimpse into our exhibitions, weddings, and corporate events.
        </p>
      </motion.div>

      {/* Filter buttons — animated active pill indicator */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-300 ${
              activeCategory === cat
                ? "text-white border-neutral-900"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
            }`}
          >
            {activeCategory === cat && (
              <motion.span
                layoutId="activePill"
                className="absolute inset-0 rounded-full bg-neutral-900"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Image grid — staggered entrance + layout animation on filter change */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, i) => (
            <motion.div
              key={img.src}
              layout
              layoutId={`card-${img.src}`}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: Math.min(i, 8) * 0.04,
              }}
              whileHover={{ scale: 1.03 }}
              onClick={() => openLightbox(img)}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
            >
              <motion.img
                layoutId={`img-${img.src}`}
                src={img.src}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                <p className="text-white text-sm font-medium p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {img.title}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
          >
            <motion.div
              layoutId={`card-${selectedImage.src}`}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={selectedImage.src}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />
              </AnimatePresence>

              <motion.p
                key={`caption-${selectedImage.src}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white text-center mt-4 text-sm"
              >
                {selectedImage.title}
              </motion.p>

              {/* Close button */}
              <button
                onClick={closeLightbox}
                aria-label="Close"
                className="absolute -top-10 right-0 sm:top-2 sm:-right-12 text-white text-2xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                &times;
              </button>

              {/* Prev / Next */}
              <button
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 hover:scale-110 transition-all"
              >
                &#8249;
              </button>
              <button
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 hover:scale-110 transition-all"
              >
                &#8250;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
