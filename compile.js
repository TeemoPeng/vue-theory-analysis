/**
 * 编译器
 * 获取宿主元素，递归遍历所有domTree
 * 判断节点类型，如果是文本，则判断是否是插值表达式
 * 如果是元素，则遍历其属性，判断是否是指令或是事件绑定，然后递归子元素
 */
class Compile {
    // el 是宿主元素
    // vm 是KVue实例
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)
        
        if (this.$el) {
            this.compile(this.$el)
        }
    }

    // 判断节点类型
    compile(el) {
        const childNodes = el.childNodes

        Array.from(childNodes).forEach(node => {
            if (this.isElement(node)) {
                // node为元素，遍历其所有属性，获取指令、方法
                console.log('编译元素---：', node.nodeName)

                this.compileElement(node)

            } else if (this.isInterpolation(node)) {
                // node 为插值表达式
                console.log('编辑插值文本---：', node.textContent)

                this.compileInterpolation(node)

            }
        })
    }

    // 判断node是否为元素
    isElement(node) {
        return node.nodeType === 1
    }

    // 判断是否为插值文本
    isInterpolation(node) {
        // 1. node类型首先得是文本
        // 2. 判断格式是否为：{{xxx}}
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    // 解析元素
    compileElement(node) {
        // 遍历元素所有属性，取出指令、方法
        const attributes = node.attributes

        Array.from(attributes).forEach(attr => {
            
        })
    }

    // 解析插值文本
    compileInterpolation(node) {

    }
}