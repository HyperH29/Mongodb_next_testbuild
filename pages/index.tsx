import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import "tailwindcss/tailwind.css";
import { ObjectId } from "mongodb";

// export async function getServerSideProps(context) {
//   try {
//     await clientPromise;
//
//     // `await clientPromise` will use the default database passed in the MONGODB_URI
//     // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
//     //
//     // `const client = await clientPromise`
//     // `const db = client.db("myDatabase")`
//     //
//     // Then you can execute queries against your database like so:
//     // db.find({}) or any of the MongoDB Node Driver commands
//
//     return {
//       props: {
//         isConnected: true,
//       },
//     };
//   } catch (e) {
//     console.error(e);
//     return {
//       props: { isConnected: false },
//     };
//   }
// }

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (e) {
    console.error(e);
  }
}

// @ts-ignore
export default function Movies({ movies }: { movies: Movie[] }) {
  // @ts-ignore
  interface Movie {
    _id: ObjectId;
    title: string;
    plot: string;
    released: number;
  }
  return (
    <div
      className={"container bg-white rounded shadow p-6 m-4 w-full lg:w-3/4"}
    >
      <h1 className="text-2xl font-bold text-gray-darkest">
        Top 20 Movies of All Time
      </h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul className={"pt-8"}>
        {movies.map((movie) => (
          <li className={"container py-4"}>
            <h2 className={"font-bold"}>{movie.title}</h2>
            <h3>Score: {movie.metacritic}</h3>
            <p>{movie.plot}</p>
            <h4>Year: {movie.year}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}
