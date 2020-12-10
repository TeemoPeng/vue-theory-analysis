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
    }
}