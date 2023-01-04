import {expect, test} from 'vitest'
import {Token, TokenTypes, NodeTypes, RootNode} from '../types'
import {parser} from './parser'

test('parser', () => {
    const tokens: Array<Token> = [
        {type: TokenTypes.Paren, value: '('},
        {type: TokenTypes.Name, value: 'add'},
        {type: TokenTypes.Number, value: '2'},
        {type: TokenTypes.Paren, value: '('},
        {type: TokenTypes.Name, value: 'subtract'},
        {type: TokenTypes.Number, value: '4'},
        {type: TokenTypes.Number, value: '2'},
        {type: TokenTypes.Paren, value: ')'},
        {type: TokenTypes.Paren, value: ')'},
    ]
    const AST: RootNode = {
        type: NodeTypes.Program,
        body: [
            {
                type: NodeTypes.CallExpression,
                name: 'add',
                params: [
                    {type: NodeTypes.NumberLiteral, value: '2'},
                    {
                        type: NodeTypes.CallExpression,
                        name: 'subtract',
                        params: [
                            {type: NodeTypes.NumberLiteral, value: '4'},
                            {type: NodeTypes.NumberLiteral, value: '2'}
                        ]
                    }
                ]
            }
        ]
    }
    expect(parser(tokens)).toEqual(AST)
})

test('number', () => {
    const tokens: Array<Token> = [
        {type: TokenTypes.Number, value: '2'}
    ]
    const AST: RootNode = {
        type: NodeTypes.Program,
        body: [
            {type: NodeTypes.NumberLiteral, value: '2'}
        ]
    }
    expect(parser(tokens)).toEqual(AST)
})
test('CallExpression', () => {
    const tokens: Array<Token> = [
        {type: TokenTypes.Paren, value: '('},
        {type: TokenTypes.Name, value: 'add'},
        {type: TokenTypes.Number, value: '2'},
        {type: TokenTypes.Number, value: '4'},
        {type: TokenTypes.Paren, value: ')'}
    ]
    const AST: RootNode = {
        type: NodeTypes.Program,
        body: [
            {
                type: NodeTypes.CallExpression,
                name: 'add',
                params: [
                    {type: NodeTypes.NumberLiteral, value: '2'},
                    {type: NodeTypes.NumberLiteral, value: '4'}
                ]
            }
        ]
    }
    expect(parser(tokens)).toEqual(AST)
})
test('two CallExpression', () => {
    const tokens: Array<Token> = [
        {type: TokenTypes.Paren, value: '('},
        {type: TokenTypes.Name, value: 'add'},
        {type: TokenTypes.Number, value: '2'},
        {type: TokenTypes.Number, value: '4'},
        {type: TokenTypes.Paren, value: ')'},
        {type: TokenTypes.Paren, value: '('},
        {type: TokenTypes.Name, value: 'add'},
        {type: TokenTypes.Number, value: '3'},
        {type: TokenTypes.Number, value: '5'},
        {type: TokenTypes.Paren, value: ')'}
    ]
    const AST: RootNode = {
        type: NodeTypes.Program,
        body: [
            {
                type: NodeTypes.CallExpression,
                name: 'add',
                params: [
                    {type: NodeTypes.NumberLiteral, value: '2'},
                    {type: NodeTypes.NumberLiteral, value: '4'}
                ]
            },
            {
                type: NodeTypes.CallExpression,
                name: 'add',
                params: [
                    {type: NodeTypes.NumberLiteral, value: '3'},
                    {type: NodeTypes.NumberLiteral, value: '5'}
                ]
            }
        ]
    }
    expect(parser(tokens)).toEqual(AST)
})