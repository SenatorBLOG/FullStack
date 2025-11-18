async function searchWithFetch() {
  // Get the values from the input fields
  const query = document.getElementById("searchQuery").value.trim();
  const count = document.getElementById("imageCount").value;

  const accessKey = 'wIV1ZG1i7YTr7bl4RLumfNkd2FZzM2L69zzww0GULSM';  // Replace with your actual access key

  // Check if the user entered a query
  if (!query) {
    alert("Please enter a search query!");
    return;
  }

  // Construct the API URL using template literals
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&client_id=${accessKey}`;

  try {
    // Fetch data from Unsplash API
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    // Convert the response into JSON format
    const data = await response.json();

    // Get the gallery container
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = '';  // Clear previous images

    // Display the images in the gallery
    data.results.forEach(image => {
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("image-item");

      const imgElement = document.createElement("img");
      imgElement.src = image.urls.small;
      imgElement.alt = image.alt_description || "Unsplash Image";
      gallery.appendChild(imgElement);

      //Image Details section
      const details = document.createElement("div");
      details.classList.add("image-details");

      //Name
      const photographer = document.createElement("p");
      photographer.textContent = `Photographer: ${image.user.name}`;
      details.appendChild(photographer)

      //Image description
      if(image.alt_description){
        const  description = document.createElement("p");
        description.textContent = `Description:  ${image.alt_description}`;
        details.appendChild(description);
      }
      //Number of likes
      const likes = document.createElement("p");
      likes.textContent = `Likes: ${image.likes}`;
      details.appendChild(likes);
      //Image type
      const orientation = document.createElement("p");
      orientation.textContent = `Orientation: ${image.width > image.height ? 'Landscape':'Portrait'}`
      details.appendChild(orientation)

      //imageURL
      const fullImageURL = document.createElement("a");
      fullImageURL.href = image.urls.full;
      fullImageURL.target = "_blank"
      fullImageURL.textContent = `View Full Image`;
      details.appendChild(fullImageURL);

        imageDiv.appendChild(details);

      gallery.appendChild(imageDiv);
    });

  } catch (err) {
    console.error("Error:", err);
    alert("Error fetching images. Please try again later.");
  }
}

// Add an event listener to the button to trigger the search function
document.querySelector("button").addEventListener("click", searchWithFetch);
