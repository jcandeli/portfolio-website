import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Your Name",
  description: "Learn more about Your Name and their work",
};

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Who I Am</h2>
          <p>
            Hello! I&apos;m [Your Name], a [your profession/title] based in
            [your location]. I&apos;m passionate about [your
            interests/specialties].
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">What I Do</h2>
          <p>
            I specialize in [your main skills/services]. My work involves [brief
            description of your work].
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">My Journey</h2>
          <p>[Brief professional journey or background]</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Get in Touch</h2>
          <p>
            I&apos;m always open to new opportunities and collaborations. Feel
            free to reach out to me via [preferred contact method].
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;