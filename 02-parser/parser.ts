import {CallExpressionNode, Child, NodeTypes, NumberLiteralNode, RootNode, Token, TokenTypes} from '../types'

const createNumberLiteralNode = (value: string): NumberLiteralNode => {
    return {type: NodeTypes.NumberLiteral, value}
}
const createCallExpressionNode = (name: string): CallExpressionNode => {
    return {type: NodeTypes.CallExpression, name, params: []}
}
export const parser = (tokens: Array<Token>): RootNode => {
    const rootNode: RootNode = {type: NodeTypes.Program, body: []}
    let i: number = 0
    const forEach = (): Child => {
        if (tokens[i].type === TokenTypes.Number) {
            return createNumberLiteralNode(tokens[i++].value)
        } else if (tokens[i].type === TokenTypes.Paren && tokens[i].value === '(') {
            const callExpressionNode = createCallExpressionNode(tokens[++i].value)
            i++
            while (!(tokens[i].type === TokenTypes.Paren && tokens[i].value === ')')) {
                callExpressionNode.params.push(forEach())
            }
            i++
            return callExpressionNode
        } else throw new Error()
    }
    while (i < tokens.length) {
        rootNode.body.push(forEach())
    }
    return rootNode
}