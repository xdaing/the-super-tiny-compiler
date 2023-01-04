import {Token, TokenTypes} from '../types'

export const tokenizer = (input: string): Array<Token> => {
    const length: number = input.length
    const tokens: Array<Token> = []
    const LETTERS: RegExp = /[a-z]/i
    const NUMBERS: RegExp = /[0-9]/
    const WHITESPACE: RegExp = /\s/
    const PAREN: RegExp = /[()]/
    for (let i: number = 0; i < length; i++) {
        if (WHITESPACE.test(input[i])) continue
        else if (PAREN.test(input[i])) {
            tokens.push({type: TokenTypes.Paren, value: input[i]})
        } else if (LETTERS.test(input[i])) {
            let value: string = input[i]
            while (LETTERS.test(input[i + 1]) && i + 1 < length) {
                value += input[++i]
            }
            tokens.push({type: TokenTypes.Name, value})

        } else if (NUMBERS.test(input[i])) {
            let value: string = input[i]
            while (NUMBERS.test(input[i + 1]) && i + 1 < length) {
                value += input[++i]
            }
            tokens.push({type: TokenTypes.Number, value})
        } else throw new Error()
    }
    return tokens
}