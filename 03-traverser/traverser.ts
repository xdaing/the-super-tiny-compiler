import {RootNode, Visitor, Child, Parent, VisitorOption, NodeTypes} from '../types'

export function traverser(rootNode: RootNode, visitor: Visitor) {
    const traverseArray = (array: Array<Child>, parent: Parent): void => {
        for (let i: number = 0, length: number = array.length; i < length; i++) {
            traverseNode(array[i], parent)
        }
    }
    const traverseNode = (node: RootNode | Child, parent: Parent) => {
        const methods: VisitorOption | undefined = visitor[node.type]
        if (methods && methods.enter) methods.enter(node, parent)
        switch (node.type) {
            case NodeTypes.NumberLiteral:
                break
            case NodeTypes.CallExpression:
                traverseArray(node.params, node)
                break
            case NodeTypes.Program:
                traverseArray(node.body, node)
                break
        }
        if (methods && methods.exit) methods.exit(node, parent)
    }
    traverseNode(rootNode, null)
}
