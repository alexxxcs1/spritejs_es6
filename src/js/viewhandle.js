import learnDemo from './view/learnDemo'
import indexframe from './view/index'
import selectfood from './view/selectfood';
import gameview from './view/gameview';
import bkg from './view/bkg'
import {stage} from './createstage';
import endview from './view/endview';
import other from './view/zindefist';

const viewhandle = {
    viewindex:null,
    nowViewLayer:null,
    init(){
        bkg.init();
        this.changeView(1);
        other.init();
    },
    changeView(index){
        if(this.nowViewLayer){
            stage.removeLayer(this.nowViewLayer.id);
        };
        this.viewindex = index;
        switch (this.viewindex) {
            case 1:
                indexframe.init();
                this.nowViewLayer = indexframe.ctn;
                break;
            case 2:
                selectfood.init();
                this.nowViewLayer = selectfood.ctn;
                break;
            case 3:
                gameview.init();
                this.nowViewLayer = gameview.ctn;
                break;
            case 4:
                endview.init();
                this.nowViewLayer = endview.ctn;
                break;
            default:
                learnDemo.init();
                this.nowViewLayer = learnDemo.ctn;
                break;
        }
    }
}

export default viewhandle