export enum TokenTypes {
    Paren = 'paren',
    Name = 'name',
    Number = 'number',
}

export enum NodeTypes {
    NumberLiteral = 'NumberLiteral',
    Program = 'Program',
    CallExpression = 'CallExpression',
    ExpressionStatement = 'ExpressionStatement',
    Identifier = 'Identifier'
}

export interface Token {
    type: TokenTypes
    value: string
}

export type Child = NumberLiteralNode | CallExpressionNode

export interface RootNode {
    type: NodeTypes.Program
    body: Array<Child>
    context?: Array<ExpressionStatement | Expression | NumberLiteralNode>
}

export interface CallExpressionNode {
    type: NodeTypes.CallExpression
    name: string
    params: Array<Child>
    context?: Array<NumberLiteralNode | Expression | ExpressionStatement>
}

export interface NumberLiteralNode {
    type: NodeTypes.NumberLiteral
    value: string
}

export type Parent = RootNode | CallExpressionNode | null

export interface VisitorOption {
    enter?(node: Child | RootNode, parent: Parent): void

    exit?(node: Child | RootNode, parent: Parent): void
}

export interface Visitor {
    Program?: VisitorOption
    CallExpression?: VisitorOption
    NumberLiteral?: VisitorOption
}

export interface Expression {
    type: NodeTypes.CallExpression
    callee: Callee
    arguments: Array<NumberLiteralNode | Expression>
}

export interface Callee {
    type: NodeTypes.Identifier
    name: string
}

export interface ExpressionStatement {
    type: NodeTypes.ExpressionStatement
    expression: Expression
}

export interface TransformedAST {
    type: NodeTypes.Program
    body: Array<ExpressionStatement>
}