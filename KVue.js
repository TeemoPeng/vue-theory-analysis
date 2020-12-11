function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            console.log('get:', val)
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set:', newVal)
                observe(newVal)
                val = newVal
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



