window.addEventListener("onload", () => {
    fetch("/veille.json")
        .then(response => response.json())
        .then(json => {
            console.log(json)
            loadVeille(json)
        })
        .catch(reason => console.log(reason))
})

function loadVeille(articles) {
    const row = document.getElementById("articlesVeille");

    for (const article of articles) {
        let col = document.createElement("div");
        col.className = "col-md-4";

        let card = document.createElement("div");
        card.classList.add("card", "card-blog");

        let cardImage = document.createElement("div");
        cardImage.className = "card-img";

        let cardImageSource = document.createElement("a");
        let cardImageImg = document.createElement("img");
        cardImageImg.src = article.img;
        cardImageImg.alt = "";
        cardImageImg.className = "img-fluid";

        cardImageSource.appendChild(cardImageImg);
        cardImage.appendChild(cardImageSource);
        card.appendChild(cardImage);

        let cardCategoryBox = document.createElement("div");
        cardCategoryBox.className = "card-category-box";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let cardCategory = document.createElement("div");
        cardCategory.className = "card-category";

        let cardCategoryTitle = document.createElement("h6");
        cardCategoryTitle.className= "category";
        cardCategoryTitle.innerText = article.category;

        cardCategory.appendChild(cardCategoryTitle);
        cardCategoryBox.appendChild(cardCategory);
        cardBody.appendChild(cardCategoryBox);

        let cardTitle = document.createElement("h3");
        cardTitle.className = "card-title";
        let cardLink = document.createElement("a");
        cardLink.href = article.url;
        cardLink.innerText = article.name;

        cardTitle.appendChild(cardLink);
        cardBody.appendChild(cardTitle);

        let cardDescription = document.createElement("p");
        cardDescription.className = "card-description";
        cardDescription.innerText = article.description;

        cardBody.appendChild(cardDescription);
        card.appendChild(cardBody);

        let cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";

        let postAuthor = document.createElement("div");
        postAuthor.className = "post-author";

        let authorSpan = document.createElement("span");
        authorSpan.className = "author";
        authorSpan.innerText = article.author;

        postAuthor.appendChild(authorSpan);
        cardFooter.appendChild(authorSpan);

        let postDate = document.createElement("div");
        postDate.className = "post-date";

        let postSpan = document.createElement("span");
        postSpan.classList.add("bi", "bi-clock");
        postSpan.innerText = " " + article.read_time + "min";

        postDate.appendChild(postSpan);
        cardFooter.appendChild(postDate);

        card.appendChild(cardImage);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        col.appendChild(card);

        row.appendChild(col);
    }
}

