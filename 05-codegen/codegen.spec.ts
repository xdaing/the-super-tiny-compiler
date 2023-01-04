import {expect, test} from 'vitest'
import {NodeTypes, TransformedAST} from '../types'
import {codegen} from './codegen'

test('codegen', () => {
    const AST: TransformedAST = {
        type: NodeTypes.Program,
        body: [
            {
                type: NodeTypes.ExpressionStatement,
                expression: {
                    type: NodeTypes.CallExpression,
                    callee: {type: NodeTypes.Identifier, name: 'add'},
                    arguments: [
                        {type: NodeTypes.NumberLiteral, value: '2'},
                        {
                            type: NodeTypes.CallExpression,
                            callee: {type: NodeTypes.Identifier, name: 'subtract'},
                            arguments: [
                                {type: NodeTypes.NumberLiteral, value: '4'},
                                {type: NodeTypes.NumberLiteral, value: '2'},
                            ]
                        }
                    ]
                }
            }
        ]
    }
    expect(codegen(AST)).toMatchInlineSnapshot('"add(2, subtract(4, 2));"')
})

test('two ExpressionStatement', () => {
    const AST: TransformedAST = {
        type: NodeTypes.Program,
        body: [
            {
                type: NodeTypes.ExpressionStatement,
                expression: {
                    type: NodeTypes.CallExpression,
                    callee: {type: NodeTypes.Identifier, name: 'add'},
                    arguments: [
                        {type: NodeTypes.NumberLiteral, value: '2'},
                        {
                            type: NodeTypes.CallExpression,
                            callee: {type: NodeTypes.Identifier, name: 'subtract'},
                            arguments: [
                                {type: NodeTypes.NumberLiteral, value: '4'},
                                {type: NodeTypes.NumberLiteral, value: '2'},
                            ]
                        }
                    ]
                }
            },
            {
                type: NodeTypes.ExpressionStatement,
                expression: {
                    type: NodeTypes.CallExpression,
                    callee: {type: NodeTypes.Identifier, name: 'add'},
                    arguments: [
                        {type: NodeTypes.NumberLiteral, value: '2'},
                        {
                            type: NodeTypes.CallExpression,
                            callee: {type: NodeTypes.Identifier, name: 'subtract'},
                            arguments: [
                                {type: NodeTypes.NumberLiteral, value: '4'},
                                {type: NodeTypes.NumberLiteral, value: '2'}
                            ]
                        }
                    ]
                }
            }
        ]
    }
    expect(codegen(AST)).toMatchInlineSnapshot('"add(2, subtract(4, 2));add(2, subtract(4, 2));"')
})