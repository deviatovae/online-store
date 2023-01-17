import {describe, expect} from "@jest/globals";
import {checkFormatName, checkNameLength, checkAddressLength, checkFormatEmail, checkFormatNumber, formatCardNumber, formatDate} from "../../../../src/components/view/pages/payment/validation";


describe('validation', () => {
    it('only letters name', () => {
        expect(checkFormatName('Rubi Rhod!!!')).toBe('Rubi Rhod');
        expect(checkFormatName('Bruce Willis555')).toBe('Bruce Willis');
    })

    it('length name', () => {
        expect(checkNameLength('Rubi Rhod')).toBeTruthy();
        expect(checkNameLength('Bruce Willis')).toBeTruthy();
    })

    it('check format email', () => {
        expect(checkFormatEmail('Rubi_Rohod@icloud.com')).toBeTruthy();
        expect(checkFormatEmail('zaeban@gmail.com')).toBeTruthy();
    })

    it('check format card number', () => {
        expect(formatCardNumber('5761874490110008')).toBe('5761 8744 9011 0008');
    })

    it('check format date card', () => {
        const input = {value: '122321231'};
        formatDate(input as HTMLInputElement);
        expect(input.value).toBe('12/23');
    })
})