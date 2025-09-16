import axios from "axios";

export default async function handler(req, res) {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular",
    params: { language: "ko-KR", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzNhYTEzODQzNGE1NWQ2MDJkYmEzNWQyMjMxMDFhZiIsIm5iZiI6MTc1MTY5NTg0Ni45MTIsInN1YiI6IjY4NjhjMWU2ZmM3ZDg1NmJiNmE5NTE3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.idRPsYEOA4QgOsQ2kQ7PVryvCtp7R1E-iemkROXiHMk",
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
