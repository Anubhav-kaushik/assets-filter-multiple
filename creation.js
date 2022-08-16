function createAsset(assetData) {
    const assetContainer = document.createElement('div');
    assetContainer.classList.add('column');
    assetContainer.dataset.category = assetData.category;
    assetContainer.dataset.organization = assetData.organization;
    assetContainer.addEventListener('click', function () {
        hyperlinkTo(assetData.url)
    });

    const content = document.createElement('div');
    content.classList.add('content');

    const thumbnail = document.createElement('img');
    thumbnail.src = assetData.thumbnailSrc;
    thumbnail.alt = assetData.category;
    thumbnail.style.width = '100%';
    content.append(thumbnail);

    const assetTitle = document.createElement('h4');
    assetTitle.innerHTML = assetData.title
    content.append(assetTitle);

    const assetDescription = document.createElement('p');
    assetDescription.innerHTML = assetData.description;
    content.append(assetDescription);

    assetContainer.append(content);

    return assetContainer;
}

function addAssets(container, assetsData) {
    container.innerHTML = '';

    for (let assetData of assetsData) {
        container.append(createAsset(assetData));
    }
}

function createFilterBtn(btnSubtype, btnType) {
    const btn = document.createElement('button');
    btn.classList.add('btn');

    btn.dataset.type = btnType;
    btn.dataset.class = btnSubtype;
    
    if (btnSubtype == 'all') {
        btn.dataset.status = 'active';
        btn.dataset.default = btnType;
        btn.innerHTML = 'Show all';
        btn.addEventListener('click', function() {
            defaultSettings(this);
            showSelected('#filter-1 .filter-btn-container')
        })
    } else {
        btn.innerHTML = capitalize(btnSubtype);
        btn.addEventListener('click', function () {
            toggleStatus(this);
            showSelected('#filter-1 .filter-btn-container')
        })
    }

    return btn;
}

function addFilterBtns(btnContainer, btnType, assetsData) {
    btnContainer.innerHTML = '';

    const filterHeading = document.createElement('span');
    filterHeading.classList.add('btn-type');
    filterHeading.innerHTML = `<strong>${capitalize(btnType)}: </strong>`;
    btnContainer.append(filterHeading);

    const defaultBtn = createFilterBtn('all', btnType);
    btnContainer.append(defaultBtn);

    const allTypes = [];

    for (let assetData of assetsData) {
        const type = assetData[btnType];

        if (!allTypes.includes(type)) {
            allTypes.push(type);
        }
    }

    for (let type of allTypes) {
        const btn = createFilterBtn(type, btnType);
        btnContainer.append(btn);
    }
}
