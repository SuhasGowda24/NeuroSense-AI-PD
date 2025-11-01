import React, { useEffect, useState } from "react";

export default function Typewriter({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 80,
  pauseAfterType = 2000,
  className = "",
}) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const currentPhrase = phrases[phraseIndex % phrases.length];
    let timer;

    if (!isDeleting) {
      // typing forward
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // done typing — pause then start deleting
        timer = setTimeout(() => setIsDeleting(true), pauseAfterType);
      }
    } else {
      // deleting backward
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // move to next phrase
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseAfterType]);

  return (
    <span className={`inline-block ${className}`} aria-live="polite">
      {displayText}
    </span>
  );
}
