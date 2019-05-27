import {stage,stageprop} from '../createstage';
import {Scene,Sprite,Group} from 'spritejs';
import viewhandle from '../viewhandle';

import tool from '../tool';

let gameview = {
    ctn:null,
    gamestatus:null,
    playRate:0,
    animatelist:[],
    press:false,
    gamestart:false,
    barfull:null,
    barbox:null,
    CountdownNum:3,
    gameSelect:null,
    setGameSelect(value){
        this.gameSelect = value; 
    },
    init(){
        this.ctn = stage.layer('gameview');
        this.gamestart=false,
        this.press = false,
        this.animatelist=[];

        let logo = new Sprite('logo');
        logo.attr({
            pos:[50,29],
            zIndex:500,
        })
        this.ctn.append(logo);

        // this.createFlyheart();
        this.createTimer();
        this.createRandomTree();
        this.createTimeBar();
        this.createPerson();
        this.createfastclickbtn();
        
        requestAnimationFrame(function next()   //通过webapi调用动画
        {
            for (let z = 0; z < gameview.animatelist.length; z++) {
                // gameview.press&&
                if (gameview.press&&gameview.gamestart) {
                    gameview.animatelist[z].play();
                }else{
                    gameview.animatelist[z].pause();
                }
            }
            if (gameview.barfull.attr('width')+1 >= gameview.barbox.texturesSize[0]) {
                // viewhandle.changeView(2);
                clearTimeout(gameovertimeout);
                gameview.createEndTime();
            }else{
                // gameview.barfull.attr({
                //     size:[Math.max(Math.min(gameview.barfull.attr('width'),gameview.barbox.texturesSize[0]),30),gameview.barfull.attr('height')]
                // })
                requestAnimationFrame(next);
            }
        });
    },
    createFlyheart(){
        let gameviewflyheart = new Sprite('gameviewflyheart');
        gameviewflyheart.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,stageprop.height/2],
        })
        gameviewflyheart.animate([
            {pos:[stageprop.width/2,stageprop.height/2 - 20]},
            {pos:[stageprop.width/2,stageprop.height/2]},
            {pos:[stageprop.width/2,stageprop.height/2 - 20]},
        ],{
            duration:2000,
            iterations: Infinity,
        })
        this.ctn.append(gameviewflyheart);
    },
    createTimer(){
        this.CountdownNum=3;
        let gamestartmask = new Sprite();
        gamestartmask.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,stageprop.height/2],
            size:[stageprop.width,stageprop.height],
            scale:5,
            bgcolor:'#333',
            opacity:0.9,
            zIndex:998,
        })
        this.ctn.append(gamestartmask);

        let timernum = new Sprite('timernum'+this.CountdownNum);
        timernum.attr({
            
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,489],
            opacity:0,
            zIndex:1000,
        })
        timernum.animate([
            {scale:10,opacity:0,},
            {scale:1,opacity:1,},
        ],{
            duration:300,
            fill:'forwards',
        }).finished.then(()=>{
            setTimeout(() => {
                this.CountdownNum--;
                timernum.attr({
                    textures:'timernum'+this.CountdownNum,
                    opacity:0,
                })
                timernum.animate([
                    {scale:10,opacity:0,},
                    {scale:1,opacity:1,},
                ],{
                    duration:300,
                    fill:'forwards',
                }).finished.then(()=>{
                    setTimeout(() => {
                        this.CountdownNum--;
                        timernum.attr({
                            textures:'timernum'+this.CountdownNum,
                            opacity:0,
                        })
                        timernum.animate([
                            {scale:10,opacity:0,},
                            {scale:1,opacity:1,},
                        ],{
                            duration:300,
                            fill:'forwards',
                        }).finished.then(()=>{
                            setTimeout(() => {
                                timernum.attr({
                                    textures:'timernumgo',
                                    opacity:0,
                                })
                                timernum.animate([
                                    {scale:10,opacity:0,},
                                    {scale:1,opacity:1,},
                                ],{
                                    duration:300,
                                    fill:'forwards',
                                }).finished.then(()=>{
                                    setTimeout(() => {
                                        this.gamestart = true;
                                        this.ctn.removeChild(gamestartmask);
                                        this.ctn.removeChild(timernum);
                                        gameovertimeout = setTimeout(() => {
                                            gameview.createEndTime();
                                        }, 10000);
                                    }, 750);
                                    tool.audioAutoPlay('cutdowntime');
                                })
                                
                            }, 750);
                            tool.audioAutoPlay('cutdowntime');
                        });
                    
                    }, 750);
                    tool.audioAutoPlay('cutdowntime');
                });
                
            }, 750);
            tool.audioAutoPlay('cutdowntime');
        });
        this.ctn.append(timernum);
    },
    createRandomTree(){
        //小树组
        let smtreegroup = new Group();
        smtreegroup.attr({
            size:[3000,250],
            // bgcolor:'#333',
            pos:[0,749]
        });
        //创建小树
        for (let z = 0; z < 15; z++) {
            let tmptree = new Sprite('randomsmTree'+parseInt(Math.random()*3+1));
            tmptree.attr({
                anchor:[0.5,1],
                pos:[z * (smtreegroup.attr('width')/15) - (Math.random()*100-50),smtreegroup.attr('height') - (50 * Math.random()) ],
            })
            smtreegroup.append(tmptree);
        }
        this.animatelist.push(smtreegroup.animate([
            {pos:[0,749]},
            {pos:[-smtreegroup.attr('width'),749]},
        ],{
            duration:10000,
            fill:'both',
            iterations:Infinity,
        }))
        this.ctn.append(smtreegroup);
        //大树组
        let bgtreegroup = new Group();
        bgtreegroup.attr({
            size:[6000,504],
            // bgcolor:'#333',
            pos:[0,567]
        });
        for (let j = 0; j < 20; j++) {
            let tmptree = new Sprite('randombgtree'+parseInt(Math.random()*6+1));
            tmptree.attr({
                anchor:[0.5,1],
                scale:Math.max(Math.random(),0.8),
                pos:[j * (bgtreegroup.attr('width')/20) - (Math.random()*100-50),bgtreegroup.attr('height') - (20 * Math.random()) ],
            })
            bgtreegroup.append(tmptree);
        }
        this.animatelist.push(bgtreegroup.animate([
            {pos:[0,567]},
            {pos:[-bgtreegroup.attr('width'),567]},
        ],{
            duration:10000,
            fill:'both',
            iterations:Infinity,
        }))
        this.ctn.append(bgtreegroup);
    },
    createTimeBar(){
        let TimeBarGroup = new Group();
        TimeBarGroup.attr({
            size:[stageprop.width,50],
            // bgcolor:'#333',
            pos:[0,1069]
        })

        //创建进度条盒子
        this.barbox = new Sprite('barbox');
        this.barbox.attr({
            anchor:[0.5,0.5],
            pos:[TimeBarGroup.attr('width')/2,TimeBarGroup.attr('height')/2],
        })
        TimeBarGroup.append(this.barbox);

        //创建进度条本体
        this.barfull = new Sprite();
        this.barfull.attr({
            size:[30,this.barbox.texturesSize[1]],
            bgcolor:'#00c0e6',
            anchor:[0,0.5],
            pos:[TimeBarGroup.attr('width')-this.barbox.texturesSize[0]>>1,TimeBarGroup.attr('height')/2],
            opacity:0.6,
            borderRadius: 20,
            scale:1,
        })
        TimeBarGroup.append(this.barfull);

        //创建进度条指示
        let barleftnum = new Sprite('barleftnum');
        barleftnum.attr({
            pos:[52,TimeBarGroup.attr('height') - barleftnum.texturesSize[1]>>1]
        })
        TimeBarGroup.append(barleftnum);

        let barrightnum = new Sprite('barrightnum');
        barrightnum.attr({
            pos:[666,TimeBarGroup.attr('height') - barrightnum.texturesSize[1]>>1]
        })
        TimeBarGroup.append(barrightnum);

        this.ctn.append(TimeBarGroup);
    },
    createPerson(){
        let personGroup = new Group();
        //创建云层
        let personridecloud = new Sprite('personridecloud');
        personridecloud.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2-36,stageprop.height/2 + 205],
        })
        personGroup.append(personridecloud);

        //创建速度指示器
        let speedwind1 = new Sprite('speedwind');
        speedwind1.attr({
            anchor:[1,0.5],
            scale:[1,1],
            pos:[stageprop.width/2 - 90,stageprop.height/2 -5],
        })
        this.animatelist.push(speedwind1.animate([
            {scale:[1,1]},
            {scale:[0.5,1]},
            {scale:[1,1]},
        ],{
            duration:500,
            iterations:Infinity,
            delay:300,
        }))
        personGroup.append(speedwind1);

        let speedwind2 = new Sprite('speedwind');
        speedwind2.attr({
            anchor:[1,0.5],
            scale:[0.8,1],
            pos:[stageprop.width/2 - 90,stageprop.height/2 -15],
        })
        this.animatelist.push(speedwind2.animate([
            {scale:[1,1]},
            {scale:[0.5,1]},
            {scale:[1,1]},
        ],{
            duration:500,
            iterations:Infinity,
            delay:600,
        }))
        personGroup.append(speedwind2);

        let speedwind3 = new Sprite('speedwind');
        speedwind3.attr({
            anchor:[1,0.5],
            scale:[0.5,1],
            pos:[stageprop.width/2 - 90,stageprop.height/2 -25],
        })
        this.animatelist.push(speedwind3.animate([
            {scale:[1,1]},
            {scale:[0.5,1]},
            {scale:[1,1]},
        ],{
            duration:500,
            iterations:Infinity,
            delay:900,
        }));
        personGroup.append(speedwind3);
        
        //创建人物
        let mainperson = new Sprite('mainperson');
        mainperson.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,stageprop.height/2],
            shadow: {
                offset: [-15, -10],
                blur: 30,
                color: '#efa6c5',
            },
        })
        personGroup.append(mainperson);
        // let handrotatejson=[
        //     {rotate:0},
        //     {rotate:60},
        //     {rotate:0},
        // ];
        // let legrotatejson=[
        //     {rotate:15},
        //     {rotate:-15},
        //     {rotate:15},
        // ]

        // let personbody = new Sprite('personbody');
        // personbody.attr({
        //     anchor:[0.5,0.5],
        //     pos:[stageprop.width/2,stageprop.height/2 - 90],
        //     zIndex:3,
        // })
        // personGroup.append(personbody);

        // let personlefthand = new Sprite('personlefthand');
        // personlefthand.attr({
        //     anchor:[0.,0],
        //     pos:[stageprop.width/2,stageprop.height/2 - 115],
        //     zIndex:1,
        // })
        // this.animatelist.push(personlefthand.animate(handrotatejson,{
        //     duration:1000,
        //     iterations:Infinity,
        // }));
        // personGroup.append(personlefthand);

        // let personrighthand = new Sprite('personrighthand');
        // personrighthand.attr({
        //     anchor:[0.5,0],
        //     pos:[stageprop.width/2 ,stageprop.height/2 - 115],
        //     zIndex:5,
        // })
        // this.animatelist.push(personrighthand.animate(handrotatejson,{
        //     duration:1000,
        //     iterations:Infinity,
        //     delay:500,
        // }));
        // personGroup.append(personrighthand);

        // let personrightleg = new Sprite('personrightleg');
        // personrightleg.attr({
        //     anchor:[0.8,0],
        //     pos:[stageprop.width/2-5,stageprop.height/2 - 25],
        //     zIndex:4,
        // })
        // this.animatelist.push(personrightleg.animate(legrotatejson,{
        //     duration:1000,
        //     iterations:Infinity,
        //     delay:500
        // }));
        // personGroup.append(personrightleg);

        // let personleftleg = new Sprite('personleftleg');
        // personleftleg.attr({
        //     anchor:[0.23,0],
        //     pos:[stageprop.width/2+5,stageprop.height/2 - 20],
        //     zIndex:3,
        // })
        // this.animatelist.push(personleftleg.animate(legrotatejson,{
        //     duration:1000,
        //     iterations:Infinity,
        // }));
        // personGroup.append(personleftleg);

        // //创建喊话
        let crymylover = new Sprite('crymylover');
        crymylover.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2 + 190,stageprop.height/2-247 ]
        })
        this.animatelist.push(crymylover.animate([
            {scale:1},
            {scale:1.05},
            {scale:1},
        ],{
            duration:600,
            iterations:Infinity,
        }))
        personGroup.append(crymylover);


        personGroup.attr({
            size:[stageprop.width,stageprop.height],
            anchor:[0.5,0.5],
            pos:[219,392],
        })
        this.animatelist.push(personGroup.animate([
            {pos:[219,392],},
            {pos:[219,372],},
            {pos:[219,392],},
        ],{
            duration:1000,
            iterations:Infinity,
        }))
        
        this.ctn.append(personGroup);
    },
    createfastclickbtn(){
        let fastclickbtn = new Sprite('fastclickbtn');
        fastclickbtn.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,810],
            zIndex:999,
        });
        fastclickbtn.animate([
            {scale:1,},
            {scale:1.05,},
            {scale:1,},
        ],{
            duration:500,
            iterations:Infinity
        })
        let lr = false;
        fastclickbtn.on('click',()=>{
            if(!this.gamestart) return;
            this.press = true;
            clearTimeout(timeout);
            clearTimeout(gameovertimeout);
            gameovertimeout = setTimeout(() => {
                gameview.createEndTime();
            }, 10000);
            timeout = setTimeout(() => {
                this.press = false;
            }, 800);

            this.barfull.animate([
                {size:[Math.max(Math.min(this.barfull.attr('width')+this.barbox.texturesSize[0]/10,gameview.barbox.texturesSize[0]),30),this.barfull.attr('height')]}
            ],{
                duration:500,
                fill: 'forwards',
            });

            // for (let z = 0; z < parseInt(Math.random()*5+1); z++) {
                
                let growheart = new Sprite('growheart');
                growheart.attr({
                    anchor:[0.5,0.5],
                    pos:[stageprop.width/2,810],
                    scale:1.1,
                    rotate:Math.random()*60 - 30,
                })
                
                growheart.animate([
                    {pos:[stageprop.width/2 + (lr?50:-50),810]},
                    {pos:[stageprop.width/2 + (Math.random()*(lr?150:-150)),500],opacity:0.1,}
                ],{
                    duration:1000,
                    fill:'forwards',
                    delay:Math.random()*300,
                }).finished.then(()=>{
                    this.ctn.removeChild(growheart);
                })
                lr = !lr;
                this.ctn.append(growheart);
            // }
            
        })
        this.ctn.append(fastclickbtn);
    },
    createEndTime(){
        this.gamestart = false;
        gameview.barfull.attr({
            size:[gameview.barbox.texturesSize[0],gameview.barfull.attr('height')]
        });
        if (this.gameSelect==1) {
            tool.audioAutoPlay('success');
        }else{
            tool.audioAutoPlay('fail');
        }
        let EndGroup = new Group();
        EndGroup.attr({
            zIndex:1002,
        })
        
        let Mask = new Sprite();
        Mask.attr({
            size:[stageprop.width,stageprop.height],
            anchor:[0.5,0.5],
            scale:5,
            bgcolor:'#000',
            opacity:0.9,
        });
        EndGroup.append(Mask);

        let ResultTips = new Sprite('select'+this.gameSelect+'result');
        ResultTips.attr({
            anchor:[0.5,0],
            pos:[stageprop.width/2,214],
        })
        EndGroup.append(ResultTips);

        let button = new Sprite(this.gameSelect == 1?'nextbtn':'reselectbtn');
        button.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,946],
        })
        button.on('click',()=>{
            if (this.gameSelect == 1) {
                //nextview
                viewhandle.changeView(4);
            }else{
                viewhandle.changeView(2);
            }
            
        })
        EndGroup.append(button);

        let close = new Sprite('closebtn');
        close.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2+288,239],
        })
        close.on('click',()=>{
            if (this.gameSelect == 1) {
                //nextview
                viewhandle.changeView(4);
            }else{
                viewhandle.changeView(2);
            }
        })
        EndGroup.append(close);

        this.ctn.append(EndGroup);
    }
}
let timeout;
let gameovertimeout;
export default gameview