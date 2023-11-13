import Image from "next/image";
import React from "react";
import Results from "@/components/Results";

async function getMovie(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  return await res.json();
}

async function getSimilarMovies(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.API_KEY}`
  );
  return await res.json();
}

const MoviePage = async ({ params }) => {
  const movieId = params.id;
  const movie = await getMovie(movieId);
  const similarMovies = await getSimilarMovies(movieId);
  const similarMoviesResults = similarMovies.results.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex-grow">
        <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
            width={500}
            height={300}
            className="rounded-lg"
            placeholder="blur"
            blurDataURL="/spinner.svg"
            alt="Movie poster"
          />
          <div className="p-2">
            <h2 className="text-lg mb-3 font-bold underline underline-offset-8 rounded-lg">{movie.title || movie.name}</h2>
            <p className="text-lg mb-3">
            <span className="font-semibold mr-1">Overview:</span>
            {movie.overview}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.vote_count}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Runtime:</span>
            {movie.runtime} minutes
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Genre(s)</span>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          </div>
        </div>
      </div>

      {/* Similar Movies Footer */}
      <div className="w-full p-4 md:pt-8 mx-auto dark:bg-gray-600 bg-amber-100">
        <h2 className="text-lg mb-3 font-bold text-center">Similar Movies</h2>
        <Results results={similarMoviesResults} />
      </div>
    </div>
  );
};

export default MoviePage;
