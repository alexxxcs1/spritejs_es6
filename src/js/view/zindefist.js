import {stage,stageprop} from '../createstage';
import {Scene,Sprite,Group,Label} from 'spritejs';
import tool from '../tool';

let other = {
    ctn:null,
    
    init(){
        this.ctn = stage.layer('other');
        this.ctn.zIndex=1500;
        let music = new Sprite('musicon');
        music.attr({
            anchor:[0.5,0.5],
            pos:[700,52]
        })
        this.ctn.append(music);
        music.on('click',()=>{
            let audio = document.getElementById('bkg');
            // console.log(audio.paused);
            if (audio.paused) {
                tool.audioAutoPlay('bkg');
                music.attr({
                    textures:'musicon'
                })
            }else{
                audio.pause();
                music.attr({
                    textures:'musicoff'
                })
            }
            
        })
    },
}
export default other;