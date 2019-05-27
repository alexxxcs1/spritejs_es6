import {Scene} from 'spritejs';
const stage = new Scene('#stage', {
    viewport: ['auto', 'auto'],
    resolution: [750,1205],
    stickMode: 'width',
    stickExtend :true,
}
);
const stageprop = {
    width:stage.resolution[0],
    height:stage.resolution[1],
};

export {stage,stageprop}