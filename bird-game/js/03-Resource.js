/**
 * Created by Administrator on 2017/8/13.
 */

//加载本地资源工具类 ->加载图片
/**
 1.定义loadImage(), 参数 :url ,callback
 2.game里调用loadImage('r.json', func)
 3.请求数据 ,创建请求对象
 4.ajax三步 , 判断状态值和状态码, 解析数据
 5.获取数组, 遍历
 6.创建图片对象, 加载src
 7.图片加载完后 onload() 保存图片,
 图片格式 {name : 图片对象}
 8.定义属性
 this.allImageObj = {};

 9.name保存
 image.name = dataArr[i].name;

 //保存图片格式 {name:图片对象}
 self.allImageObj[this.name] = this; //图片

 10.回调
 所有图片对象, 所有图片的个数, 已经加载的图片个数

 11,已经加载的图片个数 loadImageCount
 加载完图片以后, 已经加载的图片个数

 */

(function () {
    window.Resource = Class.extend({
        init: function () {
            // 保存所有图片对象
            this.allImageObj = {};
        },

        //加载图片方法
        //返回  所有图片对象, 所有图片的个数, 已经加载的图片个数
        //核心封装ajax
        loadImage: function (url, callback) {
            //注意:for() 或者在闭包中, 指针一定要备份
            var self = this;

            // 1 创建请求对象
            var xhr = new XMLHttpRequest();

            // 2 设置请求方法和路径
            xhr.open("get",url);

            // 3 发送请求
            xhr.send();

            // 4 监听网络状态
            xhr.onreadystatechange = function () {
                // 判断请求状态和状态码;
                if((xhr.readyState ==4)&&(xhr.status == 200)){
                    // 请求成功区域

                    // 01 已经加载的图片个数
                    var loadImageCount = 0;

                    // 02 获得请求数据
                    var responseText = xhr.responseText;

                    // 03 解析json
                    var responseJson = JSON.parse(responseText);

                    // 04 获取数组
                    var dataArr = responseJson.images;

                    // 05 遍历数组
                    for (var i = 0; i < dataArr.length; i++) {
                        // 06 创建图片对象
                        var image = new Image();
                        image.src = dataArr[i].src;


                        //获取name
                        //var name = dataArr[i].name;
                        //console.log(name);
                        image.name = dataArr[i].name;

                        // 07 保证图片加载完后 使用
                        image.onload = function () {
                            // 累计加载的图片
                            loadImageCount++;

                            //保存图片格式{name:图片对象}
                            self.allImageObj[this.name] = this;

                            //10.回调, 返回  所有图片对象, 所有图片的个数, 已经加载的图片个数
                            callback(self.allImageObj,dataArr.length,loadImageCount)
                        }

                    }
                }

            }
        }


    })
})()