import {TransformedAST, NodeTypes, Expression, ExpressionStatement, NumberLiteralNode} from '../types'

export const codegen = (node: TransformedAST | NumberLiteralNode | Expression | ExpressionStatement): string => {
    switch (node.type) {
        case NodeTypes.Program:
            return node.body.map(codegen).join('')
        case NodeTypes.ExpressionStatement:
            return codegen(node.expression) + ';'
        case NodeTypes.NumberLiteral:
            return node.value
        case NodeTypes.CallExpression:
            return node.callee.name + '(' + node.arguments.map(codegen).join(', ') + ')'
        default:
            return ''
    }
}