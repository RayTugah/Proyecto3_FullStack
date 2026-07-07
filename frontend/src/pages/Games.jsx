import { useEffect, useMemo, useState } from "react";
import { getAllGames } from "../services/games.services";
import GameCard from "../components/GameCard/GameCard";

const Games = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllGames();
        setGames(response.data);
      } catch (error) {
        setError("No se han podido cargar los videojuegos.");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  const genres = useMemo(() => {
    const uniqueGenres = games
      .map((game) => game.genre || game.genero)
      .filter(Boolean);

    return [...new Set(uniqueGenres)];
  }, [games]);

  const platforms = useMemo(() => {
    const uniquePlatforms = games
      .map((game) => game.platform || game.plataforma)
      .filter(Boolean);

    return [...new Set(uniquePlatforms)];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const title = game.title || game.nombre || "";
      const gameGenre = game.genre || game.genero || "";
      const gamePlatform = game.platform || game.plataforma || "";

      const matchesSearch = title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGenre = genre === "all" || gameGenre === genre;
      const matchesPlatform = platform === "all" || gamePlatform === platform;

      return matchesSearch && matchesGenre && matchesPlatform;
    });
  }, [games, search, genre, platform]);

  const resetFilters = () => {
    setSearch("");
    setGenre("all");
    setPlatform("all");
  };

  if (loading) {
    return (
      <main className="games-page">
        <p>Cargando videojuegos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="games-page">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="games-page">
      <section className="games-hero">
        <h1>Galería de videojuegos</h1>
        <p>
          Explora el catálogo completo, busca tus videojuegos favoritos y filtra
          por género o plataforma.
        </p>
      </section>

      <section className="games-filters" aria-label="Buscador y filtros">
        <input
          type="text"
          placeholder="Buscar videojuego..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        >
          <option value="all">Todos los géneros</option>
          {genres.map((genreOption) => (
            <option key={genreOption} value={genreOption}>
              {genreOption}
            </option>
          ))}
        </select>

        <select
          value={platform}
          onChange={(event) => setPlatform(event.target.value)}
        >
          <option value="all">Todas las plataformas</option>
          {platforms.map((platformOption) => (
            <option key={platformOption} value={platformOption}>
              {platformOption}
            </option>
          ))}
        </select>

        <button type="button" onClick={resetFilters}>
          Limpiar filtros
        </button>
      </section>

      <section className="games-results">
        <p>
          Mostrando {filteredGames.length} de {games.length} videojuegos
        </p>
      </section>

      {filteredGames.length > 0 ? (
        <section className="games-grid">
          {filteredGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </section>
      ) : (
        <section className="games-empty">
          <h2>No se han encontrado videojuegos</h2>
          <p>Prueba con otro nombre, género o plataforma.</p>
        </section>
      )}
    </main>
  );
};

export default Games;