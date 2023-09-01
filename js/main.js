const handleCategoryName = async () => {
  const categoryAll = document.getElementById("category-all");
  const categoryMusic = document.getElementById("category-music");
  const categoryComedy = document.getElementById("category-comedy");
  const categoryDrawing = document.getElementById("category-drawing");

  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const resolvedData = await response.json();

  categoryAll.innerText = resolvedData.data[0].category;
  categoryMusic.innerText = resolvedData.data[1].category;
  categoryComedy.innerText = resolvedData.data[2].category;
  categoryDrawing.innerText = resolvedData.data[3].category;
};

handleCategoryName();

