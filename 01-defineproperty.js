// 响应式

function defineReactive(obj, key, val) {
    // 对传入的obj进行访问拦截

    observe(val)

    Object.defineProperty(obj, key, {
        get() {
            console.log('get ' + key);
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set ' + key + ':' + newVal);

                // 如果传入的值仍然是一个object，则调用observe
                observe(newVal)
                val = newVal
            } 
        }
    })
}

function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

function set(obj, key, val) {
    defineReactive(obj, key, val)
}

// defineReactive(obj, 'foo', 'foo')
const obj = {foo: '', bar: 'bar', baz: { a: 1 } }
observe(obj)

obj.foo
obj.foo = 'fooooooooooooooooo'
obj.bar
obj.bar = 'barrrrrrrrrrrr'

// obj.baz.a = 10
obj.baz = { a: 100 } // set的时候传入的是object
obj.baz.a = 100000

// obj.dong = 'dong' 
set(obj, 'dong', 'dong')
obj.dong = 'dongggggggggggggggg'