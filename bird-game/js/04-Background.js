/**
 * Created by Administrator on 2017/8/13.
 */
//背景类 -> 房子, 树, 地板
(function () {
    window.Background = Class.extend({
        init: function (option) {
            this.img = option.img;
            this.x = 0;
            this.y = option.y;
            this.width = option.width;
            this.height = option.height;

            //计算图片个数
            this.count = parseInt(game.canvas.width/this.width)+1;

            //速度
            this.speed = option.speed || 1;
        },

        // 绘制
        render: function () {
            // 遍历图片个数
            for (var i = 0; i <2*this.count; i++) {
                game.ctx.drawImage(this.img,this.x+i*this.width,this.y,this.width,this.height)
            }

        },

        //更新
        updata: function () {
            this.x = this.x <= -this.width*this.count?0:this.x-this.speed;
        },

        //停止方法
        stop: function () {
            this.speed = 0;
        }



    })
})();