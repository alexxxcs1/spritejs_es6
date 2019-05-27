import {stage,stageprop} from '../createstage';
import {Scene,Sprite,Group} from 'spritejs';
import viewhandle from '../viewhandle';

let endview = {
    ctn:null,
    showmask:false,
    init(){
        this.ctn = stage.layer('endview');

        let logo = new Sprite('logo');
        logo.attr({
            pos:[50,29],
            zIndex:500,
        })
        this.ctn.append(logo);

        //创建地面
        let frame2ground = new Sprite('frame2ground');
        frame2ground.attr({
            anchor:[0.5,1],
            pos:[stageprop.width/2 + 21,stageprop.height],
        })
        frame2ground.animate([
            {scale:0},
            {scale:1},
        ],{
            duration:100,
            fill:'forwards'
        });
        this.ctn.append(frame2ground);  

        //创建空中飞舞的桃心
        let frame2flyheart = new Sprite('frame2flyheart');
        frame2flyheart.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,stageprop.height/2 - 54],

        })
        frame2flyheart.animate([
            {scale:0},
            {scale:1},
        ],{
            duration:200,
            fill:'forwards',
        }).finished.then(()=>{
            frame2flyheart.animate([
                {pos:[stageprop.width/2,stageprop.height/2 - 20]},
                {pos:[stageprop.width/2,stageprop.height/2]},
                {pos:[stageprop.width/2,stageprop.height/2 - 20]},
            ],{
                duration:2000,
                iterations: Infinity,
            })
        })
        this.ctn.append(frame2flyheart);  

        this.createTitle();
        this.createIcon();
        this.createBtn();

        
    },
    createTitle(){
        let TitleGroup = new Group();

        //创建静态标题
        let titlestatic = new Sprite('endframetitlestatic');
        titlestatic.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,204]
        })
        TitleGroup.append(titlestatic);

        //创建动态胃
        let scalewei = new Sprite('scalewei');
        scalewei.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2 - 87,204]
        })
        scalewei.animate([
            {scale:1,},
            {scale:0.9,},
            {scale:1,},
        ],
        {
            duration:1000,
            iterations:Infinity,
        })
        TitleGroup.append(scalewei);

        //创建护卫介绍

        let endframeabout = new Sprite('endframeabout');
        endframeabout.attr({
            anchor:[0.5,0],
            pos:[stageprop.width/2,295],
        })
        TitleGroup.append(endframeabout);

        this.ctn.append(TitleGroup);
    },
    createIcon(){
        for (let z = 1; z <= 4; z++) {
            let tmpIcon = new Sprite('endicon'+z);
            tmpIcon.attr({
                anchor:[0.5,0.5],
                pos:[stageprop.width/2 + ((z%2)==1?-164:164),500 + parseInt(z/2-0.5)*276],
                scale:1,
            })
            tmpIcon.animate([
                {scale:0},
                {scale:1},
            ],{
                duration:300,
                fill:'forwards'
            })
            this.ctn.append(tmpIcon);
        }
    },
    createBtn()
    {
        let sharebtn = new Sprite('sharebtn');
        sharebtn.attr({
            anchor:[0.5,0.5],
            pos:[208,1074],
        })
        sharebtn.animate([
            {scale:0},
            {scale:1},
        ],{
            duration:300,
            fill:'forwards'
        })
        sharebtn.on('click',()=>{
            if(this.showmask) return;

            this.createShareMask();
        })
        this.ctn.append(sharebtn);

        let playagainbtn = new Sprite('playagainbtn');
        playagainbtn.attr({
            anchor:[0.5,0.5],
            pos:[539,1074],
        })
        playagainbtn.animate([
            {scale:0},
            {scale:1},
        ],{
            duration:300,
            fill:'forwards'
        })
        playagainbtn.on('click',()=>{
            if(this.showmask) return;
            viewhandle.changeView(1);
        })
        this.ctn.append(playagainbtn);
    },
    createShareMask(){
        this.showmask = true;
        let sharegroup = new Group();
        sharegroup.attr({
            zIndex:999,
        })
        let mask = new Sprite();
        mask.attr({
            size:[stageprop.width,stageprop.height],
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,stageprop.height/2],
            bgcolor:'#000',
            opacity:0.8,
            scale:10,
        });
        sharegroup.append(mask);


        let coupleend = new Sprite('coupleend');
        coupleend.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2 + 50,stageprop.height/2 -74],
        })
        sharegroup.append(coupleend);

        let startdate = new Sprite('startdate');
        startdate.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,stageprop.height/2 + 250 -74],
        })
        sharegroup.append(startdate);

        let heart1 = new Sprite('heart');
        heart1.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2 - 2,stageprop.height/2 -99],
            rotate:120,
            scale:0.4,
        })
        heart1.animate([
            {pos:[stageprop.width/2 - 2,stageprop.height/2 -99],rotate:120,scale:0.4,},
            {pos:[stageprop.width/2 + 41,stageprop.height/2 - 199],rotate:180,scale:0.6,},
            {pos:[stageprop.width/2 + 100,stageprop.height/2 - 350],rotate:120,scale:0.8,},
            {pos:[stageprop.width/2 + 253,stageprop.height/2 - 502],rotate:180,scale:1.2,},
            {opacity:0,}
        ],{
            duration:1000,
            iterations:Infinity,
        })
        sharegroup.append(heart1);

        let heart2 = new Sprite('heart');
        heart2.attr({
            anchor:[0.5,0.5],
            opacity:0,
        })
        heart2.animate([
            {opacity:1,pos:[stageprop.width/2 - 2,stageprop.height/2 -99],rotate:120,scale:0.4,},
            {pos:[stageprop.width/2 + 41,stageprop.height/2 - 199],rotate:180,scale:0.6,},
            {pos:[stageprop.width/2 + 100,stageprop.height/2 - 350],rotate:120,scale:0.8,},
            {pos:[stageprop.width/2 + 253,stageprop.height/2 - 502],rotate:180,scale:1.2,},
            {opacity:0,}
        ],{
            duration:1000,
            iterations:Infinity,
            delay:500,
        })
        sharegroup.append(heart2);

        // let heart3 = new Sprite('heart');
        // heart3.attr({
        //     anchor:[0.5,0.5],
        //     pos:[stageprop.width/2 + 100,stageprop.height/2 - 350],
        //     rotate:120,
        //     scale:0.8,
        // })
        // sharegroup.append(heart3);

        // let heart4 = new Sprite('heart');
        // heart4.attr({
        //     anchor:[0.5,0.5],
        //     pos:[stageprop.width/2 + 253,stageprop.height/2 - 502],
        //     rotate:180,
        //     scale:1.2,
        // })
        // sharegroup.append(heart4);
        
        let shareclose = new Sprite('shareclose');
        shareclose.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2 + 307,stageprop.height/2 - 366],
            scale:1.2
        })
        shareclose.on('click',()=>{
            this.showmask = false,
            this.ctn.removeChild(sharegroup);
        })
        sharegroup.append(shareclose);

        
        this.ctn.append(sharegroup);
    }
}

export default endview