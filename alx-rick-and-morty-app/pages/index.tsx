import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "@/graphql/queries";
import { EpisodeProps } from "@/interfaces";
import EpisodeCard from "@/components/common/EpisodeCard";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: { page },
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  const results = data?.episodes.results;
  const info = data?.episodes.info;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Rick and Morty Episodes
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {results?.map(({ id, name, air_date, episode }: EpisodeProps) => (
          <EpisodeCard
            key={id}
            id={id}
            name={name}
            air_date={air_date}
            episode={episode}
          />
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
