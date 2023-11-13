import Results from "@/components/Results";
import React from "react";

const SearchPage = async ({ params }) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${params.searchTerm}&include_adult=false&language=en-US&page=1`
  );

  if (!res.ok) {
    throw Error("Something went wrong");
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div>
      {results && results.length === 0 && (
        <h1 className="text-center pt-6">No results found</h1>
      )}

      {results && results.length > 0 && <Results results={results} />}
    </div>
  );
};

export default SearchPage;
