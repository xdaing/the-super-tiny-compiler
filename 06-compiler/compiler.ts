import {tokenizer} from '../01-tokenizer/tokenizer'
import {parser} from '../02-parser/parser'
import {transformer} from '../04-transformer/transformer'
import {codegen} from '../05-codegen/codegen'
import {RootNode, Token, TransformedAST} from '../types'

export const compiler = (input: string): string => {
    const tokens: Array<Token> = tokenizer(input)
    const AST: RootNode = parser(tokens)
    const transformedAST: TransformedAST = transformer(AST)
    return codegen(transformedAST)
}