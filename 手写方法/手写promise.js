class NewPromise {
    static PENDING = "pending"
    static RESOLVED = "resolved"
    static REJECTED = "rejected"

    constructor(executor){
        // promise 状态
        this.status = NewPromise.PENDING
        // promise 返回内容
        this.value = null
        // 回调函数数组，存放以后执行的函数
        this.callbacks = []
        // executor(this.resolve.bind(this), this.reject.bind(this))
        // 异常捕获
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(value){
        // 状态保护
        if(this.status === NewPromise.PENDING){
            this.status = NewPromise.RESOLVED
            this.value = value
            this.callbacks.map(callback=>{
                callback.onResolved(this.value)
            })
        }
        
    }
    reject(reason){
        if(this.status === NewPromise.PENDING){
            this.status = NewPromise.REJECTED
            this.value = reason
            this.callbacks.map(callback=>{
                callback.onRejected(this.reason)
            })
        }
    }

    then(onResolved, onRejected){
        // console.log(this.status)
        // 判断是否为函数
        if(typeof onResolved !== 'function'){
            onResolved = () => {}
        }
        if(typeof onRejected !== 'function'){
            onRejected = () => {}
        }
        
        // 处理准备状态
        if(this.status === NewPromise.PENDING){
            this.callbacks.push({
                onResolved: (value)=>{
                    try {
                        onResolved(value)
                    } catch (error) {
                        onRejected(error)
                    }
                },
                onRejected: (value)=>{
                    try {
                        onRejected(value)
                    } catch (error) {
                        onRejected(error)
                    }
                },
            })
        }
        if(this.status === NewPromise.RESOLVED){
            // 使用setTimeout实现异步
            setTimeout(() => {
                try {
                    onResolved(this.value)
                } catch (error) {
                    onRejected(error)
                }
            });
        }
        if(this.status === NewPromise.REJECTED){
            setTimeout(() => {
                try {
                    onRejected(this.value)
                } catch (error) {
                    onRejected(error)
                }
            });
        }
        
    }
}

// 原版
// let p1 = new Promise((resolve, reject) => {
//     resolve("resolved")
// }).then(value => {
//     console.log(value)
// })
// 使用方法
let p2 = new NewPromise((resolve, reject) => {
    resolve("resolved")
    // reject("rejected")
}).then(
    res => {
        console.log(res)
    },
    reason=>{
        console.log(reason)
    }
)

p2