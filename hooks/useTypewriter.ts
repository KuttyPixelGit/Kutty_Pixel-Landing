import { useState, useEffect } from "react";

export function useTypewriter(text: string, start: boolean) {
  const [typewriterText, setTypewriterText] = useState("");

  useEffect(() => {
    if (!start) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypewriterText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 45); // faster typing (~45ms per char)

    return () => {
      clearInterval(timer);
    };
  }, [start, text]);

  return { typewriterText };
}
