import {describe, expect} from "@jest/globals";
import {formatPrice} from "../../../../src/components/view/helpers/helpers";

describe('formatPrice', () => {
    it('should return formatted value', () => {
        expect(formatPrice(42)).toBe('42.00')
        expect(formatPrice(42.421)).toBe('42.42')
    })
})
