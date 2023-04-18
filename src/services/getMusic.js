const getMusic = async (id) => {
  const response = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
  const data = await response.json();

  return data.results;
};

export default getMusic;
