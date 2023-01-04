import {expect, test} from 'vitest'
import {tokenizer} from './tokenizer'
import {Token, TokenTypes} from '../types'


test('tokenizer', () => {
    const input: string = '(add 2 (subtract 4 2))'
    const tokens: Array<Token> = [
        {type: TokenTypes.Paren, value: '('},
        {type: TokenTypes.Name, value: 'add'},
        {type: TokenTypes.Number, value: '2'},
        {type: TokenTypes.Paren, value: '('},
        {type: TokenTypes.Name, value: 'subtract'},
        {type: TokenTypes.Number, value: '4'},
        {type: TokenTypes.Number, value: '2'},
        {type: TokenTypes.Paren, value: ')'},
        {type: TokenTypes.Paren, value: ')'}
    ]
    expect(tokenizer(input)).toEqual(tokens)
})
test('left paren', () => {
    const input: string = '('
    const tokens: Array<Token> = [{type: TokenTypes.Paren, value: '('}]
    expect(tokenizer(input)).toEqual(tokens)
})
test('right paren', () => {
    const input: string = ')'
    const tokens: Array<Token> = [{type: TokenTypes.Paren, value: ')'}]
    expect(tokenizer(input)).toEqual(tokens)
})
test('add', () => {
    const input: string = 'add'
    const tokens: Array<Token> = [{type: TokenTypes.Name, value: 'add'}]
    expect(tokenizer(input)).toEqual(tokens)
})
test('number', () => {
    const input: string = '22'
    const tokens: Array<Token> = [{type: TokenTypes.Number, value: '22'}]
    expect(tokenizer(input)).toEqual(tokens)
})
test('(add 1 1)', () => {
    const input: string = '(add 1 1)'
    const tokens: Array<Token> = [
        {type: TokenTypes.Paren, value: '('},
        {type: TokenTypes.Name, value: 'add'},
        {type: TokenTypes.Number, value: '1'},
        {type: TokenTypes.Number, value: '1'},
        {type: TokenTypes.Paren, value: ')'}
    ]
    expect(tokenizer(input)).toEqual(tokens)
})