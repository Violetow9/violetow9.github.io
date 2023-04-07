window.onload = () => {

    // Chargement des projets à partir du fichier projects.json
    fetch("/projects.json")
        .then(response => response.json())
        .then(json => {
            console.log(json)
            loadProjects2(json)
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

        for (let technology of project.technologies) {
            const techButton = document.createElement("button");
            techButton.type = "button";
            techButton.innerText = technology.name;
            techButton.style.background = technology.color;
            techButton.classList.add("btn", "btn-primary", "me-2");
            techButton.disabled = true;
            languageDocDiv.appendChild(techButton);
        }

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

function loadProjects2(projects) {
    // Récupération de l'élément HTML représentant le conteneur des cartes
    const cardContainer = document.getElementById('projects-card');

    // Création des éléments HTML pour chaque carte et ajout des données
    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-4', 'mr-4', "mx-3", "p-0", "h-100", "rounded-0");
        card.style.maxWidth = '348px';

        const img = document.createElement('img');
        img.src = 'assets/img/' + project.image;
        img.classList.add('card-img-top', 'w-100', 'h-100');
        img.alt = '';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = project.name;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = project.description;

        const date = document.createElement('p');
        date.classList.add('card-text', 'text-muted');
        date.textContent = project.date;

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('mb-2');

        for (const techno of project.technologies) {
            // Créer le bouton
            const button = document.createElement('button');
            button.setAttribute('id', 'myButton');
            button.classList.add('btn', 'mr-1');
            //button.style.backgroundColor = techno.color;
            button.href = techno.url;

            //const buttonText = document.createTextNode(techno.name);
            //button.appendChild(buttonText);

            const buttonImage = document.createElement('img');
            buttonImage.setAttribute('src', 'assets/img/' + techno.image);
            //buttonImage.setAttribute('alt', 'Image de bouton');
            button.appendChild(buttonImage);

            buttonImage.style.maxHeight = '100%';
            buttonImage.style.maxWidth = '100%';

// Ajouter des styles CSS au bouton et à l'image
            button.style.display = 'inline-flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.padding = '3.5px 7px';
            //button.style.backgroundColor = '#007bff';
            //button.style.color = '#fff';
            button.style.borderRadius = '10px';
            button.style.border = 'none';
            button.style.fontSize = '18px';
            button.style.fontWeight = 'bold';
            button.style.textAlign = 'center';
            button.style.width = '100px';
            buttonImage.style.marginRight = '10px';

            /*
            // Ajouter le bouton au DOM
            const buttonContainer = document.getElementById('button-container');
            buttonContainer.appendChild(button);

            // Changer le texte du bouton
            buttonText.textContent = 'Nouveau texte';

// Changer l'image du bouton
            buttonImage.setAttribute('src', 'nouvelle-image.png');

             */


            /*
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.classList.add('btn', 'mr-1');
            btn.textContent = techno.name;
            btn.style.backgroundColor = techno.color;
            btn.href = techno.url;

            /*
            const icon = document.createElement('img');
            icon.src = button.icon;
            icon.classList.add('mr-2');
            btn.appendChild(icon);

             */

            buttonDiv.appendChild(button);
        }

        const documentationBtn = document.createElement('button');
        documentationBtn.type = 'button';
        documentationBtn.classList.add('btn', 'btn-primary', 'btn-block', 'mt-2');
        documentationBtn.textContent = 'Documentation';

        documentationBtn.href = project.documentation;

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(date);
        cardBody.appendChild(buttonDiv);
        cardBody.appendChild(documentationBtn);

        card.appendChild(img);
        card.appendChild(cardBody);

        cardContainer.appendChild(card);
    });
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
        cardCategoryTitle.className = "category";
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