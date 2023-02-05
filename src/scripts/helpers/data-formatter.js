import { Pagination, AnimeData } from "./types.js";

export function formatPageData(apiData) {
  /** @type {Pagination} */
  const result = {
    currentPage: apiData.current_page,
    hasNextPage: apiData.has_next_page,
    lastVisiblePage: apiData.last_visible_page,
    totalItem: apiData.items.total,
  };

  return result;
}

export function formatAnimeData(apiData) {
  /** @type {AnimeData[]} */
  const results = [];

  apiData.forEach((data, i) => {
    results[i] = {
      id: data.mal_id.toString(),
      title: data.title,
      imageUrl: data.images.webp.image_url,
      episodes: data.episodes,
      animeType: data.type,
      genres: data.genres.map(({ name }) => name),
      rating: data.rating || "N/A",
      score: data.score || "N/A",
      status: data.status,
      synopsis: data.synopsis,
      aired: data.aired.from,
      youtubeUrl: data.trailer.embed_url,
      isFavorite: false,
    };
  });

  return results;
}
