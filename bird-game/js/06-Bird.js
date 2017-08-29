/**
 * Created by Administrator on 2017/8/14.
 */

// 小鸟类
(function () {
    window.Bird = Class.extend({
        init: function () {
            this.width = 85;
            this.height = 60;

            this.x = game.canvas.width*0.5;
            this.y = 100;

            //煽动翅状态  合法值 0 , 1 , 2;
            this.swing = 0;

            //煽动翅膀的频率;  每5帧刷一次
            this.swingRate = 5;

            //下落帧数
            this.dropFrame = game.frameUtil.currentFrame;
            //下落增量
            this.dY = 0;

            //旋转角度
            this.rotateAngle = 0;

            //小鸟方向
            this.dir = 0;

            // 空气阻力
            this.nowelY = 1;

            // 鸟一创建出来就监听
            this.birdListenClick();

            // 鸟是否死亡
            this.die = false;

            // 抛热血角标
            this.animationDieIndex = 0;
        },

        // 绘制
        render: function () {
            // 00 绘制抛热血
            // 判断是否死亡
            if(this.die){
                // 截取宽高
                var sWidth = 325;
                var sHeight = 138;

                // 行列数
                var row = parseInt(this.animationDieIndex / 5);
                var col = this.animationDieIndex%5;

                // 开始绘制
                game.ctx.drawImage(game.allImageObj["blood"],col*sWidth,row*sHeight,sWidth,sHeight,  this.x-this.width,this.y, sWidth,sHeight);
                return;
            }

            // 保存环境
            game.ctx.save();
            // 开辟新的路径,
            game.ctx.beginPath();

            //小鸟中心点
            game.ctx.translate(this.x + this.width*0.5 , this.y + this.height * 0.5);
            game.ctx.rotate(this.rotateAngle*Math.PI/180);
            game.ctx.translate(-(this.x + this.width*0.5) , -(this.y + this.height * 0.5));

            game.ctx.drawImage(game.allImageObj["bird"],this.swing*this.width,0,this.width,this.height,  this.x,this.y,this.width,this.height);

            game.ctx.restore();
        },

        // 更新
        updata: function () {

            // 死亡更新
            if(this.die){
                // 判断死亡角标
                if(this.animationDieIndex == 30){

                    game.pause()
                }
                this.animationDieIndex++;
                return;

            }

            // 01 每五帧刷新一次
            if(game.frameUtil.currentFrame % this.swingRate == 0){
                // 更新翅膀状态
                this.swing++;
                if(this.swing ==3){
                    this.swing = 0;
                }
            }

            // 02 判断方向
            if(this.dir == 0){
                // 自由落体
                //h= 1/2 *g*Math.pow(t, 2)
                this.dY =0.001* 0.5*9.8*Math.pow(game.frameUtil.currentFrame - this.dropFrame,2);
                //更新角度
                this.rotateAngle++;
            }else if(this.dir == 1){
                // 往上飞
                this.nowelY++;
                //计算增量
                this.dY = -15+this.nowelY;

                // 增量增加到正数时, 小鸟就向下掉
                if(this.dY>=0){
                    // 改变小鸟方向
                    this.dir = 0;
                    // 重新计算下落的帧数
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }
            //3.更新 dY
            this.y += this.dY;

            //4.封锁上空
            if(this.y <=0){
                this.y = 0
            }

            //5.碰撞地板
            if(this.y >= game.canvas.height-48-60){
                game.gameOver();
                this.y = game.canvas.height-48-60
            }

        },

        birdListenClick: function () {
            var self = this;
            game.canvas.addEventListener("mousedown", function () {
                // 1 更改状态
                self.dir = 1;

                // 2 仰角
                self.rotateAngle = -30;

                // 3 还原阻力
                self.nowelY = 1;

            })
        },





    })
})()