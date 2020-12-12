function defineReactive(obj, key, val) {
    observe(val)

    // 创建一个Dep 和当前的key一一对应
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get() {
            console.log('get:', val)

            //依赖收集
            Dep.target && dep.addDep(Dep.target)

            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set:', newVal)
                observe(newVal)
                val = newVal

                // 执行更新函数
                // watchers.forEach(w => w.update())

                // 通知更新
                dep.notify()
            }
        }
    })
}

function observe(obj) {
    console.log('function observe:', typeof obj)
    if (typeof obj !== 'object' || obj == null) {
        return
    }

    // Observer实例
    new Observer(obj)
}

// 为$data做代理
function proxy(vm, sourceKey) {
    Object.keys(vm[sourceKey]).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm[sourceKey][key]
            },
            set(newVal) {
                vm[sourceKey][key] = newVal
            }
        })
    })
}

// KVue构造函数
class KVue {
    constructor(options) {
        // 保存选项
        this.$options = options
        this.$data = options.data

        console.log('KVue:', options)

        // 响应化处理
        observe(this.$data)

        // $data数据代理
        proxy(this, '$data')

        new Compile(this.$options.el, this)
    }
}

// 根据对象的类型决定如何进行响应化
class Observer {
    constructor(value) {
        this.value = value

        console.log("Observer")
        // 判断其类型
        if (typeof value === 'object') {
            this.walk(value)
        }
    }

    // 对象数据的响应化
    walk(obj) {
        console.log('walk:')
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }

    // 数组数据的响应化
}

// 观察者, 值发生变化时，执行更新函数
// let watchers = []
class Wacther {
    constructor(vm, key, updateFn) {
        this.vm = vm
        this.key = key
        this.updateFn = updateFn

        // watchers.push(this)

        // Dep.target 静态属性，设置为当前watcher实例
        Dep.target = this
        this.vm[this.key] // 读取key，触发getter
        Dep.target = null // 收集完就置空
    }

    update() {
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}

// 依赖，管理某个key相关的所有watcher实例
class Dep {
    constructor () {
        this.deps = []
    }

    addDep(dep) {
        // dep 为watcher实例
        this.deps.push(dep)
    }

    notify() {
        this.deps.forEach(dep => dep.update())
    }
}



