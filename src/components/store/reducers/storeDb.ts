import store from "../store";
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";

export function saveState(store: ToolkitStore) {
    store.subscribe(() => {
        localStorage.setItem('store', JSON.stringify(store.getState()))
    })
}

export function loadState(name: string) {
    const json = localStorage.getItem('store');
    if (json) {
        const storeData = JSON.parse(json);
        if (storeData[name] === undefined) {
            throw new Error(`Store ${name} is not found`)
        }
        return storeData[name]
    }
    return [];
}
