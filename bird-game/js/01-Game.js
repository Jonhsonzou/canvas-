
// 1 中介者, 全局, 所有对象类都和他关联

// 2 开始游戏: run
// 3 运行循环: runLoop
// 4 结束游戏: gameOver
// 5 退出游戏: stop


// 1 创建中介者
(function () {
    // 父类
    window.Game = Class.extend({
     init: function (option) {
         var self = this;

         // 01 指定的帧数
         this.fps = option.fps || 50;
         // 02 帧类工具 ..  实例化
         this.frameUtil = new FrameUtil();
         // 03 获取上下文
         this.canvas = document.getElementById(option.canvasId);
         // 04 获取canvas上下文
         this.canvas = document.getElementById(option.canvasId);
         this.ctx = this.canvas.getContext("2d");

         // 05 加载图片
         this. Resource = new Resource();

         // 06 保存所有图片
         this.allImageObj = {};

         // 07 加载图片
         //返回  所有图片对象, 所有图片的个数, 已经加载的图片个数
         this.Resource.loadImage("r.json", function (allImageObj, allImageCount, loadImageCount)
         {
             //console.log(allImageObj, allImageCount, loadImageCount);

             if(allImageCount == loadImageCount){
                 // 保存图片对象
                 self.allImageObj = allImageObj;

                 // 开始游戏
                 self.run();
             }
         })

     },

     // 2 开始游戏
     run: function () {
         // 备份指针
         var self = this;

         // 定时器, 每一帧时间的间隔
         this.timer = setInterval(function () {
             self.runLoop()
         },1000/self.fps);         //计算每帧需要的时间: 1000/this.fps

     // 3 创建背景对象
         // 01 创建背景房子对象
         this.fangzi = new Background({
             img:self.allImageObj["fangzi"],
             y:self.canvas.height-356,
             width:300,
             height:256,
             speed:2,
         });

         // 02 创建背景树对象
         this.shu = new Background({
             img:self.allImageObj["shu"],
             y:self.canvas.height-216-48,
             width:300,
             height:216,
             speed:3,
         });

         // 03 创建背景地板对象
         this.diban = new Background({
             img:self.allImageObj["diban"],
             y:self.canvas.height-48,
             width:48,
             height:48,
             speed:4,
         });

         // 4 创建管道数组
         this.pipeArr = [new Pipe()];

         // 5 创建小鸟
         this.bird = new Bird();

     },



     // 3 运行循环
     runLoop: function () {
         // 这里就是运行的环境,需要把绘制的图形显示出来

         // 00 清屏
         this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

         // 01 计算帧数
         this.frameUtil.countFps();

         // 02 绘制文字
         this.ctx.fillText("FPS:"+this.frameUtil.realFrame,15,15);
         this.ctx.fillText("FNO:"+this.frameUtil.currentFrame,15,30);

         // 03 更新和绘制房子
         this.fangzi.updata();
         this.fangzi.render();

         // 04 更新和绘制树
         this.shu.updata();
         this.shu.render();

         // 05 更新和绘制地板
         this.diban.updata();
         this.diban.render();

         // 06 每隔100帧创建一个管道
         if(this.frameUtil.currentFrame % 100 == 0){
             this.pipeArr.push(new Pipe())
         }
         //console.log(this.pipeArr);
         // 07 更新和绘制管道
         this.pipeArr.forEach(function (item, index) {
             item.updata();
             item.render();

         })

         // 08 更新和绘制小鸟
         this.bird.updata();
         this.bird.render();






     },

     // 4 结束游戏
     gameOver: function () {
         //console.log("游戏结束");
         this.fangzi.stop();
         this.shu.stop();
         this.diban.stop();


         // 管道停止
         this.pipeArr.forEach(function (item, index) {
             item.stop();
         });

         this.bird.die = true;

     },

     // 5 退出游戏
        pause:function () {
            // 绘制游戏结束
            this.ctx.drawImage(this.allImageObj["gameover"],(game.canvas.width - 626) * 0.5, (game.canvas.height - 144) *0.5);
            clearInterval(this.timer);
        }

    })
})();