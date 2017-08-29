
// 帧类工具 -->> 计算真实的帧数
(function () {
    window.FrameUtil = Class.extend({

        init: function () {
            //1 总帧数
            this.currentFrame = 0;
            //2 开始帧数
            this.sFrame = 0;
            //3 开始时间
            this.sTime = new Date();
            //4 真实帧数
            this.realFrame = 0;
        },

        // 计算真实的帧数,每一帧调用
        countFps: function () {
            //总帧数的累加
            this.currentFrame++;
            //获取当前帧数的时间
            var nowTime = new Date();
            //判断是否走了1s,计算真实的帧数
            if( nowTime - this.sTime >=1000){
                // 每秒真实的帧数
                this.realFrame = this.currentFrame - this.sFrame;
                // 更新时间
                this.sTime = nowTime;
                // 更新帧数
                this.sFrame = this.currentFrame;
            }

        }


    })

})()