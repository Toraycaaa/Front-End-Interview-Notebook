## Vue框架及相关面试题

[toc]



### 1. 生命周期

 Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是Vue的生命周期 

**各个生命周期的作用**

| 生命周期      | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| beforeCreate  | 组件实例被创建之初，组件的属性生效之前                       |
| created       | 组件实例已经完全创建，属性也绑定，但真实dom还没有生成，$el还不可用 |
| beforeMount   | 在挂载开始之前被调用：相关的 render 函数首次被调用           |
| mounted       | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子    |
| beforeUpdate  | 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前              |
| update        | 组件数据更新之后                                             |
| activited     | [keep]()-alive专属，组件被激活时调用，组件保存在缓存中，切换时不销毁 |
| deadactivated | [keep]()-alive专属，组件被销毁时调用                         |
| beforeDestory | 组件销毁前调用                                               |
| destoryed     | 组件销毁后调用                                               |



### 2. 父子组件生命周期

加载：父组件beforeMount后子组件再加载

更新：父组件beforeUpdate后子组件再更新

销毁：父组件beforeDestroy后子组件再更新

**加载渲染过程** （父组件挂载之后子组件才开始创建）

```
`父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted`
```

**更新过程**

```
`父beforeUpdate->子beforeUpdate->子updated->父updated`
```

**销毁过程**

```
`父beforeDestroy->子beforeDestroy->子destroyed->父destroyed`
```

**常用钩子简易版**

```
`父create->子created->子mounted->父mounted`
```



### 3.  v-if和v-show

基于**数据驱动**的理念，当 `v-if` 指令对应的 `value` 为 `false` 的时候会**预先创建一个注释节value 发生变化时，命中派发更新的逻辑，对新旧组件树进行 `patch`，从而完成使用 `v-if` 指令元素的动态显示隐藏。** 

 ![img](https://uploadfiles.nowcoder.com/files/20210729/57532155_1627572665922/20210727234940.png) 

 [Vue 3 中 v-if 和 v-show 指令实现的原理（源码分析）](https://segmentfault.com/a/1190000039005215)



### 4. this.$next.tick(callback) 方法

- 作用：处理 Vue 中 DOM 的异步更新
- 简单的理解：在 DOM 渲染之后，会自动执行 callback 函数。
- 举例：因为VDOM的原因，Vue会在清空事件队列的下一个周期中异步的统一对页面进行渲染（避免不必要的多次计算和DOM操作），因此，如果我们在渲染之前获取DOM节点被修改的状态，并不会获得修改后的状态。