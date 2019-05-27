import {stage,stageprop} from '../createstage';
import {Scene,Sprite,Group} from 'spritejs';
import viewhandle from '../viewhandle';

let movie = {
    ctn:null,
    showmask:false,
    init(){
        this.ctn = stage.layer('endview');
    },
}

export default movie