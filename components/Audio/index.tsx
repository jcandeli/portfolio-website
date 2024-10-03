"use client";

import styled from "@emotion/styled";

const Iframe = styled.iframe`
  height: calc((100vw / 3) - 2rem);
`;

interface AudioProps {
  id: string;
}

const Audio = ({ id }: AudioProps) => (
  <Iframe
    width="100%"
    scrolling="no"
    frameBorder="no"
    allow="autoplay"
    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
  ></Iframe>
);

export default Audio;
