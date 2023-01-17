
export const checkFormatName = (value: string) => value.replace(/[^-\A-Za-z, А-Яа-я]/g, '');

export const checkNameLength = (value: string) => {
    const arrName = value.split(' ');
    return arrName.length >= 2 && arrName.every((el) => el.length >= 3);
}

export const checkFormatAddress = (value: string) => value.replace(/[^-\A-Za-z, А-Яа-я]/g, '');

export const checkAddressLength = (value: string) => {
    const arrAddress = value.split(' ');
    return arrAddress.length >= 3 && arrAddress.every((el) => el.length >= 5);
}

export const checkFormatEmail = (value: string) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

export const checkFormatNumber = (value: string) => value.replace(/[^+\d]/g, '').substring(0, 16);

export const checkNumberLength = (value: string) => value.match(/^\+\d{9}/g);

export const formatCardNumber = (cardNumber: string) => {
    const value = cardNumber.replace(/[^\d]/g, '').substring(0, 16);
    return value.match(/.{1,4}/g)?.join(' ') || '';
}

export const checkFormatNameCard = (value: string) => value.replace(/[^\A-Za-z /]/g, '');

export const checkFormatLength = (value: string) => {
    const arrName = value.split(' ');
    return arrName.length >= 2 && arrName.every((el) => el.length >= 3);
}

export const checkFormatCvv = (value: string) => value.replace(/[^\d]/g, '').substring(0, 3);

export const checkLengthCvv = (value: string) => value.length === 3;

export const isYearValid = (dateInput: HTMLInputElement) => {
    const thisYear = new Date().getFullYear().toString().substring(2, 4)
    return Number(dateInput.value.substring(3, 5)) >= +thisYear;
}

export const isMonthValid = (dateInput: HTMLInputElement) => {
    return Number(dateInput.value.substring(0, 2)) <= 12;
}

export const isDateFormatValid = (dateInput: HTMLInputElement) => {
    return dateInput.value.match(/.{5}/g);
}

export const formatDate = (dateInput: HTMLInputElement) => {
    let value = dateInput.value.replace(/[^\d]/g, '').substring(0, 4);
    value = value.match(/.{1,2}/g)?.join('/') || '';
    dateInput.value = value;
}
