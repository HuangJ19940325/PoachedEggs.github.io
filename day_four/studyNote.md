
学习时间
=======
* 3hours<br>

学习内容
=======
* 盒模型
  * [盒模型学习](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Box_model)
  * [再述盒模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_boxes/Box_model_recap)

![盒模型](https://github.com/PoachedEggs/PoachedEggs.github.io/raw/master/images/box.png)
  
```css
background-clip: content-box;
background-clip: padding-box;
background-clip: border-box; //defult

box-sizing: border-box;
box-sizing: content-box; //defult

margin-top: -50px; //外边距可以使用负数值
```
* 弹性盒子
  * [display: flex;](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)<br>

* 总结
-------
>>在盒模型中，设置盒子的宽度使用百分比，这样可以实现响应式设计，例如：`width: 50%;` 但是默认情况下，此宽度对应的是盒子的内容content宽度，若对盒子增加内边距padding和边框border，会造成盒子宽度增加，影响到它旁边元素的布局。此时设置该元素 `box-sizing: border-box;` 这样width: 50%; 对应的宽度是`盒子内容+内边距+边框的宽度`。增加内边距和边框宽度，盒子的宽度不会增加，而是减小内容的宽度。

待解决的疑问
============
>>display属性的其他值<br>
>>max-width,min-width与@meidia(max-width)的区别
