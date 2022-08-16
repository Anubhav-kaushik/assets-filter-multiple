function filterSelection(type, selectedClasses, assetsSelector = '.column') {
    const columns = document.querySelectorAll(assetsSelector);

    for (let column of columns) {
        for (let selectedClass of selectedClasses) {
            if (isIn(selectedClass, separateTags(column, type))) {
                column.dataset[`${type}Visible`] = true;
            } else if (selectedClass == "all") {
                column.dataset[`${type}Visible`] = true;
            }
        }
    }
}

function hideAllAssets(types, assetsSelector = '.column') {
    const columns = document.querySelectorAll(assetsSelector);

    for (let column of columns) {
        for (let type of types) {
            column.dataset[`${type}Visible`] = false;
        }
        column.dataset.visible = false;
    }
}

function separateTags(element, dataName, separator = ',') {
    const dataTags = element.dataset[dataName];
    const tagsArray = dataTags.split(separator);

    return tagsArray
}

function getActiveBtnsDetail(btnContainerSelector) {
    const btnContainers = document.querySelectorAll(btnContainerSelector);
    
    const active = {};

    for (let btnContainer of btnContainers) {
        const activeBtns = btnContainer.querySelectorAll('.btn[data-status="active"]');

        for (let activeBtn of activeBtns) {
            const activeType = activeBtn.dataset.type;
            const activeClass = activeBtn.dataset.class;

            if (!isIn(activeType, Object.keys(active))) {
                active[activeType] = [];
            }

            active[activeType].push(activeClass);
        }
    }

    return active;
}

function areAllTrue(arrayObj) {
    for (let val of arrayObj) {
        if (val != 'true') {
            return false;
        }
    }

    return true;
}

function showSelected(btnContainerSelector, assetsSelector='.column') {
    const active = getActiveBtnsDetail(btnContainerSelector);
    
    const activeTypes = Object.keys(active);

    for (let type of activeTypes) {
        if (active[type].length > 1 && active[type].includes('all')) {
            let temp = [];
            for (let element of active[type]) {
                if (element == 'all') {
                    continue
                }
                temp.push(element);
            }
            active[type] = temp;

            const defaultBtn = document.querySelector(`${btnContainerSelector} .btn[data-default="${type}"]`);
            defaultBtn.dataset.status = "passive";
        }
    }

    // filter assets
    hideAllAssets(activeTypes);

    for (let btnType of activeTypes) {
        const classes = active[btnType];

        filterSelection(btnType, classes)
    }

    const columns = document.querySelectorAll(assetsSelector);

    for (let column of columns) {
        const tagsStatus = [];

        for (let type of activeTypes) {
            const status = column.dataset[`${type}Visible`];
            tagsStatus.push(status);
        }

        if (areAllTrue(tagsStatus)) {
            column.dataset.visible = true;
        } else {
            column.dataset.visible = false;
        }
    }

}

// Add active class to the current button (highlight it)

function resetBtn(btn, categoryBtnContainer) {
    const prev = categoryBtnContainer.querySelector(".active");
    prev.classList.toggle("active");

    btn.classList.add("active");
}

function defaultSettings(defaultBtn) {
    const parentElement = defaultBtn.parentNode;

    const activeElements = parentElement.querySelectorAll('[data-status="active"]');

    for (let element of activeElements) {
        element.dataset.status = "passive";
    }

    defaultBtn.dataset.status = "active";
}

