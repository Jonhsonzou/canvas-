/**
 * Created by Administrator on 2017/8/14.
 */

// 管道类
(function(){

    window.Pipe = Class.extend({
        init:function(){
            // 随机方向, 口往下:0  ,  口往上:1 .
            this.dir = _.random(0,1);

            // 宽高
            this.width = 148;
            this.height = _.random(80,game.canvas.height*0.6);

            // //根据口的方向,计算y
            this.x = game.canvas.width;
            this.y = this.dir ==0? 0: game.canvas.height-this.height-48;

            // 速度
            this.speed = game.diban.speed;
        },
        
        // 绘制
        render: function () {
            // 判断口的方向, 绘制
            if(this.dir ==0){      // 口往下
                game.ctx.drawImage(game.allImageObj['pipe1'], 0, 1664-this.height, this.width,this.height,   this.x,this.y,this.width,this.height);
            }else if(this.dir ==1){      // 口往上
                game.ctx.drawImage(game.allImageObj['pipe0'], 0,0, this.width,this.height,   this.x, this.y,this.width, this.height);
            }
        },
        
        // 更新
        updata: function () {
            this.x -= this.speed;
            if(this.x<= -this.width){
                game.pipeArr = _.without(game.pipeArr,this)
            };

            // 碰撞测试
            if((game.bird.x>this.x-game.bird.width)&&(game.bird.x<this.x+this.width)){
                // 以上判断是X方向是否发生碰撞
                if(this.dir == 0){       // 管道口向下
                    if(game.bird.y < this.height){   //Y方向碰撞
                        game.gameOver();
                    }
                }else if(this.dir ==1){  // 管道口向上
                    if(game.bird.y > this.y-game.bird.height){
                        game.gameOver();
                    }
                }

            }

        },

        // 停止
        stop: function () {
            this.speed = 0;
        }

    })

})()