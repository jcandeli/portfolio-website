import { Metadata } from "next";

interface FilterPageProps {
  params: {
    filter: string;
  };
}

export const generateMetadata = ({ params }: FilterPageProps): Metadata => {
  return {
    title: `${
      params.filter.charAt(0).toUpperCase() + params.filter.slice(1)
    } | Your Portfolio`,
    description: `View ${params.filter} in Your Portfolio`,
  };
};

export default function FilterPage({ params }: FilterPageProps) {
  const { filter } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{filter}</h1>
      <p className="text-lg">
        You are viewing the {filter} category. Content for {filter} will be
        displayed here.
      </p>
    </div>
  );
}
