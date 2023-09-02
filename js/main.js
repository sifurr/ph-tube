const categoryAll = document.getElementById("category-all");
const categoryMusic = document.getElementById("category-music");
const categoryComedy = document.getElementById("category-comedy");
const categoryDrawing = document.getElementById("category-drawing");
const verifiedAuthor = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    >
    <g clip-path="url(#clip0_11_215)">
        <path
        d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z"
        fill="#2568EF"
        />
        <path
        d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z"
        fill="#FFFCEE"
        />
    </g>
    <defs>
        <clipPath id="clip0_11_215">
        <rect width="20" height="20" fill="white" />
        </clipPath>
    </defs>
    </svg>
`;

const handleCategoryName = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const resolvedData = await response.json();
  categoryAll.innerText = resolvedData.data[0].category;
  categoryMusic.innerText = resolvedData.data[1].category;
  categoryComedy.innerText = resolvedData.data[2].category;
  categoryDrawing.innerText = resolvedData.data[3].category;
};

const getCategoryId = (categoryName) => {
  return categoryName;
};

const setCategoryId = (categoryName) => {
  let categoryId = 1000;
  if (categoryName === "music") {
    categoryId = 1001;
  } else if (categoryName === "comedy") {
    categoryId = 1003;
  } else if (categoryName === "drawing") {
    categoryId = 1005;
  }
  return categoryId;
};

const secondsToHoursAndMinutesConverter = (seconds = 3670) => {
  // 3670 = 1 hour 1 minute
  if (isNaN(seconds)) {
    return "";
  } else {
    const hours = parseInt(seconds / 3600);
    const minutes = parseInt((3670 % 3600) / 60);
    if (hours >= 1 && minutes >= 1) {
      return hours + "hrs " + minutes + " min ago";
    } else {
      return "";
    }
  }
};


const handlePostByCategory = async (category) => {
  const cardContainer = document.getElementById("cards-holder");
  //   const categoryName = getCategoryId(category);
  //   console.log("<<<< check >>>> " + categoryName);

  const categoryId = setCategoryId(category);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const resolvedData = await response.json();
  const posts = resolvedData.data;
  // console.log("Post: ", posts);
  cardContainer.textContent = "";

  const noDataAvailable = document.getElementById("data-not-available");
  const noDataDiv = document.createElement("div");

  if (posts.length === 0) {
    noDataAvailable.innerHTML = `
    <div class="w-[450px] text-center mx-auto">
    <img src='images/icon.png' class="mx-auto pt-[5%] lg:pt-[25%] pb-8 rounded-lg h-full w-[140px] object-cover" alt="" />
    <h5 class="text-3xl text-color-three font-bold">Oops!! Sorry, There is no content here</h5>
    </div>
    `;
    cardContainer.appendChild(noDataDiv);
  } else {
    let sortBtnState = document.getElementById("sort-by-view").value;
    if (sortBtnState === "off") {
      // console.log("sort: >>>", sortBtnState);
      posts.forEach((post) => {
        noDataAvailable.innerHTML = "";
        const div = document.createElement("div");
        //   const time = document.getElementsByClassName("time").style.display = "none";
        if (post.others.posted_date === "") {
          div.innerHTML = `
            <div>
            <!-- card top content -->
            <div class="image-holder h-full w-full relative mb-5">
                <img src=${
                  post?.thumbnail
                } class="rounded-lg h-[212px] w-full object-cover" alt="" />                
            </div>
            <!-- card bottom content  -->
            <div class="flex gap-3 mb-6">
                <div class="w-10 h-10">
                <img
                    class="rounded-full w-full h-10 object-cover"
                    src="${post.authors[0]?.profile_picture}
                    alt=""
                    srcset=""
                />
                </div>
                <div>
                <a href="#">
                <h2 class="text-lg font-bold">
                    ${post?.title}
                </h2></a>
                <div class="author-info flex gap-2">
                    <h3 class="text-color-four text-sm">${
                      post?.authors[0]?.profile_name
                    }</h3>
                    ${
                      post.authors[0]?.verified ? verifiedAuthor : ""
                    }                    
                </div>
                <p class="text-color-four text-sm">${
                  post?.others?.views
                } views</p>
                </div>
            </div>
            </div>
        `;
        } else {
          // noDataAvailable.innerHTML = "";
          // const div = document.createElement("div");
          //   const time = document.getElementsByClassName("time").style.display = "none";

          div.innerHTML = `
            <div>
            <!-- card top content -->
            <div class="image-holder h-full w-full relative mb-5">
                <img src=${
                  post?.thumbnail
                } class="rounded-lg h-[212px] w-full object-cover" alt="" />
                <small id="time-count" class="time absolute right-3 bottom-4 text-[10px] text-white bg-[#171717] px-[6px] py-[4px] rounded-[4px]"
                > ${secondsToHoursAndMinutesConverter(
                  post?.others?.posted_date
                )}</small>
            </div>
            <!-- card bottom content  -->
            <div class="flex gap-3 mb-6">
                <div class="w-10 h-10">
                <img
                    class="rounded-full w-full h-10 object-cover"
                    src="${post.authors[0]?.profile_picture}
                    alt=""
                    srcset=""
                />
                </div>
                <div>
                <a href="#">
                <h2 class="text-lg font-bold">
                    ${post?.title}
                </h2></a>
                <div class="author-info flex gap-2">
                    <h3 class="text-color-four text-sm">${
                      post?.authors[0]?.profile_name
                    }</h3>
                    ${
                      post.authors[0]?.verified ? verifiedAuthor : ""
                    }                    
                </div>
                <p class="text-color-four text-sm">${
                  post?.others?.views
                } views</p>
                </div>
            </div>
            </div>
        `;
        }
        // end of innerHtml
        cardContainer.appendChild(div);
      });
      // end of for loop
    } else {
      sortByViews(posts).forEach((post) => {
        noDataAvailable.innerHTML = "";
        const div = document.createElement("div");
        //   const time = document.getElementsByClassName("time").style.display = "none";
        if (post.others.posted_date === "") {
          div.innerHTML = `
            <div>
            <!-- card top content -->
            <div class="image-holder h-full w-full relative mb-5">
                <img src=${
                  post?.thumbnail
                } class="rounded-lg h-[212px] w-full object-cover" alt="" />                
            </div>
            <!-- card bottom content  -->
            <div class="flex gap-3 mb-6">
                <div class="w-10 h-10">
                <img
                    class="rounded-full w-full h-10 object-cover"
                    src="${post.authors[0]?.profile_picture}
                    alt=""
                    srcset=""
                />
                </div>
                <div>
                <a href="#">
                <h2 class="text-lg font-bold">
                    ${post?.title}
                </h2></a>
                <div class="author-info flex gap-2">
                    <h3 class="text-color-four text-sm">${
                      post?.authors[0]?.profile_name
                    }</h3>
                    ${
                      post.authors[0]?.verified ? verifiedAuthor : ""
                    }                    
                </div>
                <p class="text-color-four text-sm">${
                  post?.others?.views
                } views</p>
                </div>
            </div>
            </div>
        `;
        } else {
          // noDataAvailable.innerHTML = "";
          // const div = document.createElement("div");
          //   const time = document.getElementsByClassName("time").style.display = "none";

          div.innerHTML = `
            <div>
            <!-- card top content -->
            <div class="image-holder h-full w-full relative mb-5">
                <img src=${
                  post?.thumbnail
                } class="rounded-lg h-[212px] w-full object-cover" alt="" />
                <small id="time-count" class="time absolute right-3 bottom-4 text-[10px] text-white bg-[#171717] px-[6px] py-[4px] rounded-[4px]"
                > ${secondsToHoursAndMinutesConverter(
                  post?.others?.posted_date
                )}</small>
            </div>
            <!-- card bottom content  -->
            <div class="flex gap-3 mb-6">
                <div class="w-10 h-10">
                <img
                    class="rounded-full w-full h-10 object-cover"
                    src="${post.authors[0]?.profile_picture}
                    alt=""
                    srcset=""
                />
                </div>
                <div>
                <a href="#">
                <h2 class="text-lg font-bold">
                    ${post?.title}
                </h2></a>
                <div class="author-info flex gap-2">
                    <h3 class="text-color-four text-sm">${
                      post?.authors[0]?.profile_name
                    }</h3>
                    ${
                      post.authors[0]?.verified ? verifiedAuthor : ""
                    }                    
                </div>
                <p class="text-color-four text-sm">${
                  post?.others?.views
                } views</p>
                </div>
            </div>
            </div>
        `;
        }
        // end of innerHtml
        cardContainer.appendChild(div);
      });
      // end of for loop
    }
  }
};

handleCategoryName();
handlePostByCategory("all");
