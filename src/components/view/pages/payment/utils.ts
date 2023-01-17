import { Validation } from "../../../types/validation";

export function makeInputInvalid(input: HTMLInputElement | null) {
    if (!input) return;
        input.classList.add('invalid');
        input.classList.remove('valid');
}

export function makeInputValid(input: HTMLInputElement | null) {
    if (!input) return;
        input.classList.remove('invalid');
        input.classList.add('valid');
}

export function lightInvalid (formFields: Validation, inputElements: {[key: string] : HTMLInputElement} ) {

    Object.entries(formFields).forEach(([fieldName, isValid]) => {
        if (!isValid) {
            makeInputInvalid(inputElements[fieldName]);
        } else {
            makeInputValid(inputElements[fieldName]);
        }
    });
}

