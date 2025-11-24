async function fetchNews() {
  const accessKey = "6c9a4ec7238845859999ea8fa0567eaa";
  const category = document.getElementById("categorySelect").value.trim();


  const resultsDiv = document.getElementById("results"); 
  resultsDiv.innerHTML = '';

  try {
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=${category}&sortBy=popularity&apiKey=${accessKey}`
    );
    const data = res.data;
    data.articles.forEach((news) => {
      const card = document.createElement("div");
      card.innerHTML = `
      <div>
        <p>Title: ${news.title || "None"}</p>
        <p><strong>Source:</strong> ${news.source?.name || "None"}</p>
        <p><strong>Published Date:</strong> ${news.publishedAt || "None"}</p>
        <p><strong>Description:</strong> ${news.description || "None"}</p>
        <img src="${news.urlToImage || ""}" alt="${news.description || "Image"}">
      </div>`;
      resultsDiv.appendChild(card);
    });
  } catch (err) {
    console.error("Axios error:", err);
  }
}
