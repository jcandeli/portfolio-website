"use client";

import styled from "@emotion/styled";
import Heading from "@/components/Heading";

const Container = styled.div`
  max-width: 960px;
  padding: 2rem 1rem;
`;

const ContentSection = styled.section`
  margin-bottom: 2.5rem;

  p {
    margin-top: 0.75rem;
    line-height: 1.6;
  }
`;

const SectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export function AboutPage() {
  return (
    <>
      <Heading level={1}>About Me</Heading>
      <Container>
        <SectionsWrapper>
          <ContentSection>
            <Heading level={2}>Who I Am</Heading>
            <p>
              I&apos;m JP Candelier, a Front End Web Developer and creative
              enthustiast.
            </p>
          </ContentSection>
          <ContentSection>
            <Heading level={2}>Professional Experience</Heading>
            <p>
              My journey includes working with industry leaders like{" "}
              <a href="https://figma.com" target="_blank">
                Figma
              </a>{" "}
              and{" "}
              <a href="https://headspace.com" target="_blank">
                Headspace
              </a>
              , where I&apos;ve contributed to intuitive and impactful web
              experiences. I specialize in modern front-end technologies and
              have a keen eye for detail in implementing beautiful, accessible
              web interfaces.
            </p>
          </ContentSection>
          <ContentSection>
            <Heading level={2}>Creative Pursuits</Heading>
            <p>
              Beyond coding, I&apos;m a multi faceted creator. As a musician,
              I&apos;ve played bass for over 30 years and I&apos;ve played bass
              and guitar in over 20 bands, composing and performing across
              various genres. I also explore visual arts through graphic design,
              photography, and digital art, bringing a unique creative
              perspective to my technical work. I&apos;m currently enrolled in a
              Graphic Design certification program from{" "}
              <a href="https://risd.edu" target="_blank">
                Rhode Island School of Design
              </a>
              .
            </p>
          </ContentSection>
          <ContentSection>
            <Heading level={2}>Get in Touch</Heading>
            <p>
              I&apos;m always interested in connecting with fellow creators and
              technologists. Whether it&apos;s about web development, music, or
              creative collaborations, feel free to reach out.
            </p>
          </ContentSection>
        </SectionsWrapper>
      </Container>
    </>
  );
}
