import {
    Child,
    Expression,
    ExpressionStatement,
    NodeTypes,
    NumberLiteralNode,
    Parent,
    RootNode,
    TransformedAST
} from '../types'
import {traverser} from '../03-traverser/traverser'

export const transformer = (AST: RootNode) => {
    const newAST: TransformedAST = {type: NodeTypes.Program, body: []}

    AST.context = newAST.body

    traverser(AST, {
        CallExpression: {
            enter(node: Child | RootNode, parent: Parent) {
                if (node.type === NodeTypes.CallExpression) {
                    let expression: Expression | ExpressionStatement = {
                        type: NodeTypes.CallExpression,
                        callee: {type: NodeTypes.Identifier, name: node.name},
                        arguments: []
                    }
                    node.context = expression.arguments
                    if (parent?.type !== NodeTypes.CallExpression) {
                        expression = {type: NodeTypes.ExpressionStatement, expression}
                    }
                    parent?.context?.push(expression)
                }
            }
        },
        NumberLiteral: {
            enter(node: Child | RootNode, parent: Parent) {
                if (node.type === NodeTypes.NumberLiteral) {
                    const numberNode: NumberLiteralNode = {type: NodeTypes.NumberLiteral, value: node.value}
                    parent?.context?.push(numberNode)
                }
            }
        }
    })
    return newAST
}