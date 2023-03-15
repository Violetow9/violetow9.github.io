// Afficher 3 articles de veille consultés récemment et d'actualité

// Selection des articles
const articles = [
    {
        "name": "SOLID Principles With (almost) Real-Life Examples in Java",
        "date": "5 janvier 2022",
        "url": "https://betterprogramming.pub/solid-principles-with-almost-real-life-examples-in-java-b292a4e2c18b",
        "img": "https://miro.medium.com/v2/resize:fit:640/format:webp/1*cRdO9c0N4P0QSg9LnJPTeg.jpeg",
        "category": "JAVA",
        "description": "SOLID principles are some of the oldest rules in the software world. They enable us to write maintainable, readable, reusable code. In this text, I am trying to accomplish a somewhat real-life example, obeying the SOLID principles.",
        "author": "Berke Soysal",
        "read_time": 3
    },
    {
        "name": "How to Scale Application to support Millions User",
        "date": "17 avril 2022",
        "url": "https://sahil-code.medium.com/how-to-scale-application-to-support-millions-user-a71005856670",
        "img": "https://miro.medium.com/v2/resize:fit:640/format:webp/1*y0wWDCkOUAJkOuetskGuEw.png",
        "category": "WEB PERFORMANCES",
        "description": "Designing a system that supports millions of user is a process that requires continuous improvement and refinement. In this article, we will discuss about high level system architecture for single user first and then scale our system to millions of user.",
        "author": "Sahil Patel",
        "read_time": 4
    },
    {
        "name": "Dependency Inversion Principle: How Google Developers write code",
        "date": "10 avril 2022",
        "url": "https://paigeshin1991.medium.com/dependency-inversion-principle-how-google-developers-write-code-f6cbd3b530a6",
        "img": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*0QZCG375uYmgHsyK9aJMFg.png",
        "category": "JAVA",
        "description": "Using CompletableFuture to implement an asynchronous use case",
        "author": "Suraj Mishra",
        "read_time": 2
    }
]

window.onload = () => {
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

