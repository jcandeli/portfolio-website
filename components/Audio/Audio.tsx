import { useRef } from "react";
import { useInView } from "framer-motion";

interface AudioProps {
  id: string;
}

const Audio = ({ id }: AudioProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="h-full w-full" ref={ref}>
      {isInView && (
        <iframe
          className="h-full w-full"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
        />
      )}
    </div>
  );
};

export default Audio;
