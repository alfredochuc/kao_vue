export async function getToken(clientId, clientSecret) {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });
  
    const data = await result.json();
    return data.access_token;
  }

  export async function getGendersApi(token) {
    const result = await fetch(
      `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data.genres;
  }

  export async function getRecommendations(token,genres, trackBPM, min_duration_ms, max_duration_ms ) {
    const result = await fetch(
      `https://api.spotify.com/v1/recommendations?seed_genres=${genres}&max_duration_ms=${max_duration_ms}&min_duration_ms=${min_duration_ms}&target_tempo=${trackBPM}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data.tracks;
  }