import "./GameCard.css";

const localImages = {
  "Minecraft": "/games/minecraft.jpg",
  "Fortnite": "/games/fortnite.jpg",
  "League of Legends": "/games/league-of-legends.jpg",
  "Escape from Tarkov": "/games/escape-from-tarkov.jpg",
  "Gran Turismo 7": "/games/gran-turismo-7.jpg",
  "The Surge 2": "/games/the-surge-2.jpg",
};

const GameCard = ({ game }) => {
  const title = game.title || game.nombre || "Videojuego";
  const image = localImages[title] || game.image;

  return (
    <article className="game-card">
      <img
        src={image}
        alt={title}
        className="game-card__image"
        referrerPolicy="no-referrer"
      />

      <div className="game-card__content">
        <h2>{title}</h2>

        <p>
          <strong>Género:</strong> {game.genre}
        </p>

        <p>
          <strong>Plataforma:</strong> {game.platform}
        </p>

        <button type="button">Ver detalle</button>
      </div>
    </article>
  );
};

export default GameCard;