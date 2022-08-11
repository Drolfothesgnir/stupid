import State from '../State/State.js';

const pageState = new State(location.pathname);

let active = false;

function preventReload(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = "";
}

function changePageState() {
    if (active) {
        pageState.update(location.pathname);
    }
}

function start() {
    if (!active) {
        addEventListener('beforeunload', preventReload);
        addEventListener('popstate', changePageState);
        active = true;
    }
}

function stop() {
    if (active) {
        removeEventListener('beforeunload', preventReload);
        removeEventListener('popstate', changePageState);
        active = false;
    }
}

function goTo(path: string) {
    if (active) {
        history.pushState(null, "", path);
        pageState.update(path);
    }
}

export default {
    pageState,
    start,
    stop,
    goTo
}