"use client";

import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useInView } from "framer-motion";

const IframeWrapper = styled.div`
  height: calc((100vw / 3) - 2rem);
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

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
    <IframeWrapper ref={ref}>
      {shouldLoad && (
        <Iframe
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
        />
      )}
    </IframeWrapper>
  );
};

export default Audio;
