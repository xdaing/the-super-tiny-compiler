import {NodeTypes, RootNode} from '../types'
import {expect, test} from 'vitest'
import {transformer} from './transformer'

test('transformer', () => {
    const originalAST: RootNode = {
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
                            {type: NodeTypes.NumberLiteral, value: '2'},
                        ]
                    }
                ]
            }
        ]
    }
    const transformedAST = {
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
                                {type: NodeTypes.NumberLiteral, value: '2'}
                            ]
                        }
                    ]
                }
            }
        ]
    }
    expect(transformer(originalAST)).toEqual(transformedAST)
})