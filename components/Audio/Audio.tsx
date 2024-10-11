import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface AudioProps {
  id: string;
}

const Audio = ({ id }: AudioProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldLoad(true);
    }
  }, [isInView]);

  return (
    <div className="h-full w-full" ref={ref}>
      {shouldLoad ? (
        <iframe
          className="h-full w-full"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
        />
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-grow space-y-3">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-[50px] w-[50px] rounded-full" />
              <div>
                <Skeleton className="h-2 w-[150px] mb-1" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
          </div>
          <Skeleton className="h-[75px] w-full mt-auto mb-[50px]" />
        </div>
      )}
    </div>
  );
};

export default Audio;
