window.onload = () => {

    // Chargement des projets à partir du fichier projects.json
    fetch("/projects.json")
        .then(response => response.json())
        .then(json => {
            console.log(json)
            loadProjects(json)
        })
        .catch(reason => console.log(reason))

    // Chargement des articles de veille à partir du fichier veille.json
    fetch("/veille.json")
        .then(response => response.json())
        .then(json => {
            console.log(json)
            loadVeille(json)
        })
        .catch(reason => console.log(reason))

    // Formulaire de contact, quand le visiteur clique pour envoyer un message
    const btnContact = document.getElementById("btnContact");
    btnContact.onclick = () => {
        const nameChamp = document.getElementById("name");
        const name = nameChamp.value;

        const emailChamp = document.getElementById("email");
        const email = emailChamp.value;

        const subjectChamp = document.getElementById("subject");
        const subject = document.getElementById("subject").value;

        const messageChamp = document.getElementById("message");
        const message = document.getElementById("message").value;

        if (!nameChamp.checkValidity() || !emailChamp.checkValidity() || !subjectChamp.checkValidity() || !messageChamp.checkValidity()) {
            return;
        }

        const errorMessage = document.getElementById("contact-error-message");
        const successMessage = document.getElementById("contact-success-message");

        // Appel à ma restapi
        axios.post('/contact', {
            name: name,
            email: email,
            subject: subject,
            message: message
        }).then(response => {
            console.log(response)

            errorMessage.style.display = "none";
            successMessage.style.display = "block";

        }).catch(error => {
            console.log(error)

            errorMessage.style.display = "block";
            successMessage.style.display = "none";
        })
    };
}


function loadProjects(projects) {
    let rowProjects = document.getElementById("projects");

    for (const project of projects) {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-md-4");

        const workBoxDiv = document.createElement("div");
        workBoxDiv.classList.add("work-box");

        const aLink = document.createElement("a");
        aLink.href = project.image;
        aLink.setAttribute("data-gallery", "portfolioGallery");
        aLink.classList.add("portfolio-lightbox");

        const workImgDiv = document.createElement("div");
        workImgDiv.classList.add("work-img");

        const img = document.createElement("img");
        img.src = project.image;
        img.alt = "";
        img.classList.add("img-fluid");

        workImgDiv.appendChild(img);
        aLink.appendChild(workImgDiv);

        const workContentDiv = document.createElement("div");
        workContentDiv.classList.add("work-content");

        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        const colSm8Div = document.createElement("div");
        colSm8Div.classList.add("col-sm-8");

        const h2Title = document.createElement("h2");
        h2Title.classList.add("w-title");
        h2Title.innerText = project.name;

        const pDescription = document.createElement("p");
        pDescription.innerText = project.description;

        const wMoreDiv = document.createElement("div");
        wMoreDiv.classList.add("w-more");

        const wCategorySpan = document.createElement("span");
        wCategorySpan.classList.add("w-ctegory");
        wCategorySpan.innerText = project.category;

        const slashSpan = document.createElement("span");
        slashSpan.innerText = " / ";

        const wDateSpan = document.createElement("span");
        wDateSpan.classList.add("w-date");
        wDateSpan.innerText = project.date;

        const languageDocDiv = document.createElement("div");
        languageDocDiv.classList.add("col-sm-8");

        const languageButton = document.createElement("button");
        languageButton.type = "button";
        languageButton.innerText = project.language;
        languageButton.style.background = project.color;
        languageButton.classList.add("btn", "btn-primary", "me-2");
        languageButton.disabled = true;

        const docButton = document.createElement("a");
        docButton.href = project.documentation;
        docButton.innerText = "Documentation";
        docButton.classList.add("btn", "btn-link", "me-2");

        wMoreDiv.appendChild(wCategorySpan);
        wMoreDiv.appendChild(slashSpan);
        wMoreDiv.appendChild(wDateSpan);

        languageDocDiv.appendChild(languageButton);
        languageDocDiv.appendChild(docButton);

        colSm8Div.appendChild(h2Title);
        colSm8Div.appendChild(pDescription);
        colSm8Div.appendChild(wMoreDiv);
        colSm8Div.appendChild(languageDocDiv);

        const colSm4Div = document.createElement("div");
        colSm4Div.classList.add("col-sm-4");

        const wLikeDiv = document.createElement("div");
        wLikeDiv.classList.add("w-like");

        const aLink2 = document.createElement("a");
        aLink2.href = project.url;

        const spanIcon = document.createElement("span");
        spanIcon.classList.add("bi", "bi-plus-circle");

        aLink2.appendChild(spanIcon);
        wLikeDiv.appendChild(aLink2);
        colSm4Div.appendChild(wLikeDiv);

        rowDiv.appendChild(colSm8Div);
        rowDiv.appendChild(colSm4Div);
        workContentDiv.appendChild(rowDiv);

        workBoxDiv.appendChild(aLink);
        workBoxDiv.appendChild(workContentDiv);
        colDiv.appendChild(workBoxDiv);

        rowProjects.appendChild(colDiv);
    }
}


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