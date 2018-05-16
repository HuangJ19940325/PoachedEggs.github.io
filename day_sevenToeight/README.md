# 学习时间
-  7.5hours
# 学习内容
## 定位：[要对元素定位，我们使用元素的position属性](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/%E5%AE%9A%E4%BD%8D)。

|静态定位|position: static;|defualt|文档流中的位置|
|--|--|--|--|
|相对定位|position: relative;|no-defualt|相对本身在文档流中的位置偏移，仍在文档流中|
|绝对定位|position: absolute;|no-defualt|脱离文档流，独立于自己的一层，相对于页面的位置偏移|
|固定定位|position: fixed;|no-defualt|脱离文档流，相对于窗口的位置偏移，不随鼠标滑动而改变位置|

举例：

1. 相对定位
```css
selector {
  position: relative;
  top: 30px;
  left: 30px;
}
```
![相对定位](https://github.com/PoachedEggs/PoachedEggs.github.io/raw/master/images/relative-position.png)
<br>
2. 绝对定位
```css
selector {
  pasition: absolute;
}
```
![绝对定位](https://github.com/PoachedEggs/PoachedEggs.github.io/raw/master/images/obsolute-position.png)
>`注意` 1). 外边距margin会影响定位元素。 2). 绝对定位元素的"包容元素"，默认是<html>元素，这种包容元素被称为元素的`定位上下文`,
我们可以改变元素的定位上下文，这可以通过设置元素的祖先元素的position属性为relative来实现。例如，
```css
body {
  position: relative;
}
```
![改变定位上下文为body](https://github.com/PoachedEggs/PoachedEggs.github.io/raw/master/images/position-context.png)
>`多个绝对定位元素的堆叠`： 
a. 源顺序中后定位的元素将赢得先定位的元素。 
b. 要改变堆叠顺序，可以通过设置定位元素的z-index属性；网页也有一个z轴——条从屏幕表面到你的脸（或者在屏幕前面你喜欢的任何其他东西）的虚线。
z-index属性影响元素在z轴上的位置。例如，`z-index: 2;`即覆盖在（高于）`z-index: 1`之上。
## [定位实战](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Practical_positioning_examples)
- <label>元素用来联系文字标签和表单，目的是能更好的理解表单；<label>元素的for属性规定label元素绑定到哪个表单元素。
- [使用复选框来完成变面板的滑动隐蔽/显示](https://mdn.github.io/learning-area/css/css-layout/practical-positioning-examples/hidden-info-panel.html)。实例如下：
```html
<label for="toggle">?</label>
<input type="checkbox" id="toggle">
<aside>
  ...
<aside>
```
```css
label[for="toggle"] {
  z-index: 1;
}

aside {
  padding: 0 20px;
  width: 340px;
  
  position: fixed;
  right: -370px;
  
  transition: 6s all;
}

input[type="checkbox"]:checked + aside {  //当<input>元素被选择时，选择<input>元素邻接的<aside>元素。
  right: 0;                               //使用:checked伪类来实现此目的。
}
```
## 弹性盒子 [display：flex;](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)
- 弹性盒子被广泛应用于`多栏布局`。
- 案例：
```html
<body>
  <header>...</header>
  <section>
    <article>...</article>
    <article>...</article>
    <article>...</article>
  </section>
</body>
```
```css
section {
  display: flex;
}
```
盒子属性|值|作用 
--|--|--
flex-direction|row/column/column-reverse/row-reverse|指定主轴方向
flex-wrap|wrap|在布局中使用定宽或者定高的时候，弹性盒子子元素溢出的情况，使用该属性
align-items|stretch/center/flex-start/flex-end|控制flex项在交叉轴cross-axis上的位置
justify-content|flex-start/center/space-around/space-between|控制flex项在主轴上的位置

![弹性盒子模型](https://github.com/PoachedEggs/PoachedEggs.github.io/raw/master/images/flex-modle.png)

子项属性|值|作用
--|--|--
flex-grow|1/2/3/...|弹性盒子子元素是其他flex项的几倍宽度,
flex-basis|200px/...|每个flex 项将首先给出200px的可用空间，然后，剩余的可用空间将根据分配的比例共享
flex|1 200px|三个属性flex-grow,flex-basis,flex-shrink的设置，可通过flex一并设置
align-self|flex-start/flex-end|控制特定的flex子项在交叉轴cross-axis上的位置
order|0/-1/1|改变 flex 项的布局位置的功能，而不会影响到源顺序。order值越大，显示顺序越靠后

## 浮动 [float: left](http://www.cnblogs.com/chaixiaozhi/p/8481778.html);
- float被设计的初衷——实现文字环绕效果；
- 被设置了float的元素会脱离文档流,使父元素坍塌——破坏性。
- 普通的div如果没有设置宽度，它会撑满整个屏幕，而如果给div增加float:left之后，宽度发生了变化，把内容包裹了——这就是包裹性。
- 相邻的float元素之间不存在空格，紧挨着——清空格。
- 解除浮动的破坏性：
  1. 为父元素添加visibility:hidden/overflow:hidden?；
  2. 浮动父元素; 
  3. 在所有浮动元素下方添加一个[clear:both的元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear);
- [MDN浮动](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Floats)
* 使用float做网页布局
  * 设置float属性后，元素实际上会inline-block块状化;
  * 可以去掉排列间的空格;
  * 比如，单侧固定的流体布局，用：float+margin来实现；
  * 但最好的应用还是应该让他去实现文字的环绕效果。
  
# 总结
- 绝对定位元素的定位上下文是相对于 <html> 元素或其最近的定位祖先；
- 固定定位元素的定位上下文是相对于浏览器视口本身；
- 弹性盒子的真正价值体现在它的灵活性/响应性，如果你调整浏览器窗口的大小，或者增加一个 <article> 元素，这时的布局仍旧是好的。

# 待解决的疑问
- aside元素的用途
- 元素的transition属性，例如：`transition: 0.6s all;` 允许你在状态改变的时候平滑的过渡。
- 元素的cursor属性，例如：`cursor: pointer;`
- 伪元素，伪类区别和用途
- bootstrap正在用的clearfix（清除浮动）。

# 明天学习
- 布局的不同方法，与它们的优劣对比
