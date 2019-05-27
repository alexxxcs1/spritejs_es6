import {stage,stageprop} from '../createstage';
import {Scene,Sprite,Group} from 'spritejs';

let bkg = {
    ctn:null,
    bkg:null,
    init(){
        this.ctn = stage.layer('bkg');
        this.ctn.zIndex=-1;
        this.bkg = new Sprite('mainbkg');
        this.ctn.append(this.bkg);
        this.createWave();
    },
    createWave(){
        let wave = new Sprite('bkgwave');
        wave.attr({
            anchor:[0,1],
            opacity:0,
            pos:[0,stageprop.height + wave.texturesSize[0] ]
        })
        wave.animate([
            {
                pos:[0,stageprop.height],
                opacity:1,
            }
        ],{
            duration: 500, //总运动时间
            fill: 'forwards', //动画结束保持最后的状态
            // iterations: Infinity,   //循环动画 无回调
        }).finished.then(()=>{
            // wave.animate([
            //     {pos:[0,stageprop.height],},
            //     {pos:[0,stageprop.height+30],},
            //     {pos:[0,stageprop.height],},
            // ],{
            //     duration: 3000, //总运动时间
            //     // fill: 'forwards', //动画结束保持最后的状态
            //     iterations: Infinity,   //循环动画 无回调
            // })
        })
        this.ctn.append(wave);
    }
}

export default bkg