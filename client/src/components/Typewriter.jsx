import React from "react";

/**
 * Cycles through an array of phrases with a typing / deleting effect.
 */
function Typewriter({ words = [], typingSpeed = 70, deletingSpeed = 40, pause = 1400 }) {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (words.length === 0) return;
    const current = words[index % words.length];

    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1)
          );
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span>
      {text}
      <span className="inline-block w-[2px] h-[1em] align-middle bg-secondary ml-1 animate-pulse" />
    </span>
  );
}

export default Typewriter;
