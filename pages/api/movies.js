import clientPromise from "../../lib/mongodb";
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

// id:573a1394f29313caabcdfa3e

// This is an api end point. Only JSON FILE

export default async (req, res) => {
  try {
    const client = await clientPromise;

    // Here we can select which collection we want to use from the database.
    const db = client.db("sample_mflix");
    const id = req.query.id;
    console.log(id);

    // We then set the order of how we want the information displayed.
    const movies = await db
      .collection("movies")
      .find({ _id: ObjectId("573a1394f29313caabcdfa3e") })
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    res.json(movies.map((movie) => movie.title));
    // Send information to frontend/client and throw error if something goes wrong.
  } catch (e) {
    console.error(e);
  }
};
