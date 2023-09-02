const sortByViews = (arr) => {
  let byViews = arr.slice(0);
  byViews.sort(function (x, y) {
    return y.others.views.split("K")[0] - x.others.views.split("K")[0];
  });

  return byViews;
};

const getSortedButtonState = () => {
  let buttonState = document.getElementById("sort-by-view");
  if (buttonState.value === "off") {
    buttonState.value = "on";
    document.getElementById("sort-by-view").style.backgroundColor = "#FF1F3D";
    document.getElementById("sort-by-view").style.color = "#FFFFFF";
    // console.log("button state: ", buttonState.value);
  } else {
    buttonState.value = "off";
    document.getElementById("sort-by-view").style.backgroundColor = "#25252533";
    document.getElementById("sort-by-view").style.color = "#000000";
    // console.log("button state: ", buttonState.value);
  }
};

const activateCategory = (categoryName="category-all") => {

  if (categoryName === "category-all") {
    document.getElementById("category-all").style.backgroundColor = "#FF1F3D";
    document.getElementById("category-all").style.color = "#FFFFFF";
    document.getElementById("category-music").style.backgroundColor =
      "#25252526";
    document.getElementById("category-music").style.color = "#252525b3";
    document.getElementById("category-comedy").style.backgroundColor =
      "#25252526";
    document.getElementById("category-comedy").style.color = "#252525b3";
    document.getElementById("category-drawing").style.backgroundColor =
      "#25252526";
    document.getElementById("category-drawing").style.color = "#252525b3";
  } else if (categoryName === "category-music") {
    document.getElementById("category-music").style.backgroundColor = "#FF1F3D";
    document.getElementById("category-music").style.color = "#FFFFFF";
    document.getElementById("category-all").style.backgroundColor = "#25252526";
    document.getElementById("category-all").style.color = "#252525b3";
    document.getElementById("category-comedy").style.backgroundColor =
      "#25252526";
    document.getElementById("category-comedy").style.color = "#252525b3";
    document.getElementById("category-drawing").style.backgroundColor =
      "#25252526";
    document.getElementById("category-drawing").style.color = "#252525b3";
  } else if (categoryName === "category-comedy") {
    document.getElementById("category-comedy").style.backgroundColor =
      "#FF1F3D";
    document.getElementById("category-comedy").style.color = "#FFFFFF";
    document.getElementById("category-all").style.backgroundColor = "#25252526";
    document.getElementById("category-all").style.color = "#252525b3";
    document.getElementById("category-music").style.backgroundColor =
      "#25252526";
    document.getElementById("category-music").style.color = "#252525b3";
    document.getElementById("category-drawing").style.backgroundColor =
      "#25252526";
    document.getElementById("category-drawing").style.color = "#252525b3";
  } else if (categoryName === "category-drawing") {
    document.getElementById("category-drawing").style.backgroundColor =
      "#FF1F3D";
    document.getElementById("category-drawing").style.color = "#FFFFFF";
    document.getElementById("category-all").style.backgroundColor = "#25252526";
    document.getElementById("category-all").style.color = "#252525b3";
    document.getElementById("category-music").style.backgroundColor =
      "#25252526";
    document.getElementById("category-music").style.color = "#252525b3";
    document.getElementById("category-comedy").style.backgroundColor =
      "#25252526";
    document.getElementById("category-comedy").style.color = "#252525b3";
  }
};

activateCategory("category-all");

