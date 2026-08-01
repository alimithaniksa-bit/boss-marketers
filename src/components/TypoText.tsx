import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&*%";

interface TypoTextProps {
  text: string;
  className?: string;
  mode?: 'scramble-once' | 'loop-glitch' | 'typewriter';
  delay?: number;
  speed?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export default function TypoText({
  text,
  className = '',
  mode = 'scramble-once',
  delay = 0,
  speed = 40,
  highlightWords = [],
  highlightClass = ''
}: TypoTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    if (mode === 'scramble-once') {
      timeoutId = setTimeout(() => {
        let iteration = 0;
        const totalIterations = text.length * 2.5;

        intervalId = setInterval(() => {
          setDisplayText(
            text
              .split('')
              .map((char, index) => {
                if (char === ' ' || char === '\n') return char;
                if (index < iteration / 2.5) {
                  return text[index];
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join('')
          );

          iteration += 1;

          if (iteration >= totalIterations) {
            setDisplayText(text);
            setIsComplete(true);
            clearInterval(intervalId);
          }
        }, speed);
      }, delay);
    } else if (mode === 'typewriter') {
      timeoutId = setTimeout(() => {
        let index = 0;
        intervalId = setInterval(() => {
          if (index <= text.length) {
            setDisplayText(text.slice(0, index));
            index++;
          } else {
            setIsComplete(true);
            clearInterval(intervalId);
          }
        }, speed);
      }, delay);
    } else if (mode === 'loop-glitch') {
      // Loop glitch mode for header "The Boss Marketers"
      setDisplayText(text);

      const triggerGlitch = () => {
        let count = 0;
        const glitchInterval = setInterval(() => {
          setDisplayText(
            text
              .split('')
              .map((char) => {
                if (char === ' ') return ' ';
                if (Math.random() < 0.35) {
                  return CHARS[Math.floor(Math.random() * CHARS.length)];
                }
                return char;
              })
              .join('')
          );
          count++;
          if (count > 6) {
            clearInterval(glitchInterval);
            setDisplayText(text);
          }
        }, 60);
      };

      // Trigger glitch every 3.5 seconds
      const loopInterval = setInterval(() => {
        triggerGlitch();
      }, 3500);

      return () => {
        clearInterval(loopInterval);
      };
    }

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, mode, delay, speed]);

  // Render text with optional highlight words
  const renderFormattedText = (str: string) => {
    if (!highlightWords.length || !highlightClass) {
      return str;
    }

    // Split text keeping matched highlighted words intact
    const parts = str.split(' ');
    return parts.map((part, idx) => {
      const isHighlighted = highlightWords.some(hw => 
        part.toLowerCase().includes(hw.toLowerCase())
      );
      return (
        <span 
          key={idx} 
          className={isHighlighted ? highlightClass : undefined}
        >
          {part}{idx < parts.length - 1 ? ' ' : ''}
        </span>
      );
    });
  };

  return (
    <span className={`inline-block ${className}`}>
      {renderFormattedText(displayText || (mode === 'typewriter' ? '' : text))}
      {mode === 'typewriter' && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2.5 h-[0.8em] bg-white ml-1 vertical-middle shadow-[0_0_10px_#fff]"
        />
      )}
    </span>
  );
}
