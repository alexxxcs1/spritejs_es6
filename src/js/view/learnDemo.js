//spritejs es6学习笔记

import {stage} from '../createstage';
import {Scene,Sprite,Group} from 'spritejs';

const learnDemo = {
    ctn:null,
    init(){
        this.ctn = stage.layer();
        const a1 = new Sprite('bench');
        this.ctn.append(a1);
        const a2 = new Sprite('bench');
        a2.attr({
            
            // rotate:0.1,
            // filter:{
            //     blur:'10px'
            // },
            // shadow: {
            //   },
        });
        //  const a1t = a1.transition(1.0);
        //  a1t.attr({
        //     filter:{
        //             blur:'1px'
        //     }
        //  })
        const blur = []
        for (let z = 100; z > -100 ; z--) {
            var f = {filter:{
                blur: z +'px'
            }};
            blur.push(f);
        }
        let rot = 0;
        requestAnimationFrame(function next()   //通过webapi调用动画
        {
            requestAnimationFrame(next);
            // group.attr({
            //     rotate:rot++,
            // })
        });
        //async/await 用法
        async function test(){  //创建异步函数
            await new Promise((resolve) => {        //等待promise
                setTimeout(() => {
                    resolve()   //执行成功回调，否则不会进行下一步
                    console.log('里面结束了1');
                }, 3000);
            });
            await new Promise((resolve) => {        //等待promise
                setTimeout(() => {
                    resolve()   //执行成功回调，否则不会进行下一步
                    console.log('里面结束了2');
                }, 3000);
            });
            console.log('外面结束了');
        }
        test();

        //普通无异步写法调用
        // console.log(a1.animate(blur,{         
        //     duration: 1000,         //总运动时间
        //     fill:'forwards',        //动画结束保持最后的状态
        //     // iterations: Infinity,   //循环动画
        // }).finished.then(function(){
        //     console.log('回调');
        // }))
        //异步调用animate
        (async function (){ //异步调用动画
            console.log(blur);
            
            await a1.animate(blur,{         //等待动画结束——顺序执行
                    duration: 3000,
                    fill:'forwards',
                    // iterations: Infinity,
            }).finished;
            await a1.animate(
                [
                    {x:a1.attr('x')},
                    {y:a1.attr('x')+100,x:a1.attr('x')+300}
                ],{
                duration: 1000,
                fill:'forwards',
                // iterations: Infinity,
            }).finished;
        })()
        //
        let group = new Group();
        group.append(a1);
        group.append(a2);
        group.attr({
            anchor:[0.5,0.5],
            pos:[stage.width/2,stage.height/2],
            size:[stage.width,stage.height],
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            // rotate:10,
        })
        this.ctn.append(a1);
    }
}

export default learnDemo