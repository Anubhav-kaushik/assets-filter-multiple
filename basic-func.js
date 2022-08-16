async function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

function reachIntoView(elementSelector) {
    const element = document.querySelector(elementSelector);

    options = {
        behaviour: 'smooth',
        block: 'center',
        inline: 'center'
    }

    element.scrollIntoView(options)
}

function hyperlinkTo(href, newWindow=true) {
    const url = window.location.href + href;

    console.log(url);

    if (newWindow) {
        return window.open(url, '_blank');
    } else {
        return window.open(url, '_self');
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

function isIn(key, array) {
    for (let element of array) {
        if (key == element) {
            return true;
        }
    }

    return false;
}

function toggleStatus(element) {
    const currentStatus = element.dataset.status;

    if (currentStatus == 'active') {
        element.dataset.status = 'passive';
    } else {
        element.dataset.status = 'active';
    }
}

