import {stage,stageprop} from '../createstage';
import {Scene,Sprite,Group,Label} from 'spritejs';
import viewhandle from '../viewhandle'

let indexframe = {
    ctn:null,
    init(){
        this.ctn = stage.layer('indexframe');

        let logo = new Sprite('logo');
        logo.attr({
            pos:[50,29],
            zIndex:500,
        })
        this.ctn.append(logo);
        
        //创建主要元素
        this.createMainCouple();

        //创建首页文字
        let indextext = new Sprite('indextext');
        indextext.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,1082]
        })
        indextext.animate([
            {opacity:0},
            {opacity:1}
        ],{
            duration:500,
            fill:'forwards'
        })
        this.ctn.append(indextext);

        //创建云朵
        this.createCloud();
        
        
        let text1 = new Label('审批编号：CN-17106');
        let text2 = new Label('有效期：2020-8-7');

        text1.attr({
            fillColor: '#fff',
            anchor:[0,1],
            pos:[10,stageprop.height - 30]
        })
        text2.attr({
            fillColor: '#fff',
            anchor:[0,1],
            pos:[10,stageprop.height - 10]
        })
        this.ctn.append(text1);
        
        this.ctn.append(text2);

    },
    createMainCouple(){
        //----
        let groundgroup = new Group();
        groundgroup.attr({
            size:[750,339],
            anchor:[0.5,0.5],
            pos:[-581,723],
            // bgcolor:'#333',
        });

        //-----创建地面
        let ground = new Sprite('ground');
        let gress = new Sprite('groundgress');
        ground.attr({
            anchor:[0.5,1],
            pos:[groundgroup.attr('width')/2 - 5,groundgroup.attr('height')-21]
        })
        gress.attr({        //创建草
            anchor:[0.5,1],
            zIndex:2,
            pos:[groundgroup.attr('width')/2+ 16,groundgroup.attr('height')-21]
        })
        groundgroup.append(ground);
        groundgroup.append(gress);
        //----创建大树
        let tree1 = new Sprite('tree1');
        let tree2 = new Sprite('tree2');

        tree1.attr({
            anchor:[94/tree1.texturesSize[0],1],
            pos:[groundgroup.attr('width')/2-143,groundgroup.attr('height')-31],
            zIndex:1,
        })
        tree2.attr({
            anchor:[116/tree2.texturesSize[0],1],
            pos:[groundgroup.attr('width')/2+159,groundgroup.attr('height')-24],
            zIndex:1,
        })        
        groundgroup.append(tree1);
        groundgroup.append(tree2);

        //创建云
        let smcloud1 = new Sprite('smcloud1');
        let smcloud2 = new Sprite('smcloud2');
        let smcloud3 = new Sprite('smcloud3');
        smcloud1.attr({
            anchor:[0.5,0.5],
            pos:[groundgroup.attr('width')/2-258,177],
            zIndex:3,
        });
        smcloud2.attr({
            anchor:[0.5,0.5],
            pos:[groundgroup.attr('width')/2-68,66.5],
            zIndex:3,
        });
        smcloud3.attr({
            anchor:[0.5,0.5],
            pos:[groundgroup.attr('width')/2+266,46],
            zIndex:3,
        });
        groundgroup.append(smcloud1);
        groundgroup.append(smcloud2);
        groundgroup.append(smcloud3);

        //创建长凳
        let bench = new Sprite('bench');
        bench.attr({
            anchor:[0.5,0.5],
            pos:[groundgroup.attr('width')/2 - 15,283]
        })
        groundgroup.append(bench);

        //创建恋人
        let couple = new Sprite('couple');
        couple.attr({
            anchor:[0.5,1],
            pos:[groundgroup.attr('width')/2 - 12,groundgroup.attr('height')]
        })
        groundgroup.append(couple);

        //创建飞舞的爱心
        let flyheart = new Sprite('flyheart');
        flyheart.attr({
            anchor:[0.5,1],
            pos:[groundgroup.attr('width')/2-110,269]
        })
        flyheart.animate([
            {pos:[groundgroup.attr('width')/2-110,269]},
            {pos:[groundgroup.attr('width')/2-110,259]},
            {pos:[groundgroup.attr('width')/2-110,269]},
        ],{
            duration:1000,
            iterations: Infinity,   //循环动画 无回调
        })
        groundgroup.append(flyheart);
        
        groundgroup.animate([
            {pos:[stageprop.width/2,723],}
        ],{
            duration:500,
            fill:'forwards'
        }).finished.then(function(){
            let Slogan = indexframe.createSlogan();
            indexframe.ctn.append(Slogan);
        })
        this.ctn.append(groundgroup);
    },
    createSlogan(){
        let SloganGroup = new Group();
        //创建slogan桃心
        let loveheart = new Sprite('loveheart');
        loveheart.attr({
            scale:0,
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,376],
            zIndex:1
        });
        
        loveheart.animate([
            {scale:0,pos:[stageprop.width/2,765]},
            {scale:1,pos:[stageprop.width/2,376]}
        ],{
            duration:300,
            fill:'forwards',
        }).finished.then(()=>{
            //创建爱心蒙层
            let loveheartmask = new Sprite('loveheartmask');
            loveheartmask.attr({
                anchor:[0.5,0.5],
                pos:[stageprop.width/2,376],
                zIndex:3,
            })
            SloganGroup.append(loveheartmask);

            //创建箭头
            let arrow = new Sprite('heartarrow');
            arrow.attr({
                anchor:[0.5,0.5],
                pos:[stageprop.width/2,310],
                zIndex:2
            });
            SloganGroup.append(arrow);
            arrow.animate([
                {pos:[stageprop.width + arrow.texturesSize[0]/2,310- arrow.texturesSize[1]]},
                {pos:[stageprop.width/2,310]}
            ],{
                duration:300,
                fill:'forwards',
                
            }).finished.then(()=>{
                //创建Slogan
                let slogan = new Sprite('frame1indextitle');
                slogan.attr({
                    anchor:[0.5,0.5],
                    pos:[stageprop.width/2,346],
                    zIndex:4,
                })
                slogan.animate([
                    {scale:10,opacity:0,},
                    {scale:1,opacity:1,}
                ],{
                    duration:500,
                    fill:'forwards',
                })
                SloganGroup.append(slogan);
                //slogan let top
                let juice = new Sprite('juice');
                juice.attr({
                    anchor:[0.5,1],
                    pos:[76,225],
                    opacity:0
                })
                juice.animate([
                    {rotate:180,opacity:0,},
                    {rotate:0,opacity:1,}
                ],{
                    duration:300,
                    fill:'forwards',
                    delay:500,
                }).finished.then(()=>{
                    indexframe.createNextButton();
                })
                SloganGroup.append(juice);
                
            });    
        });
        SloganGroup.append(loveheart);
        return SloganGroup;
    },
    createCloud(){
        let cloud1 = new Sprite('frameindexcloud1');
        let cloud2 = new Sprite('frameindexcloud2');
        console.log(cloud1);
        
        cloud1.attr({
            pos:[-cloud1.texturesSize[0],473]
        });
        cloud1.animate([
            {pos:[21,473]}
        ],{
            duration: 500, //总运动时间
            fill: 'forwards', //动画结束保持最后的状态
            // iterations: Infinity,   //循环动画 无回调
        }).finished.then(()=>{
            cloud1.animate([
                {x:cloud1.attr('x')},
                {x:0},
                {x:cloud1.attr('x')},
            ],{
                duration: 3000, //总运动时间
                // fill: 'forwards', //动画结束保持最后的状态
                iterations: Infinity,   //循环动画 无回调
            });
        })

        cloud2.attr({
            anchor:[0,0],
            pos:[stageprop.width + cloud2.texturesSize[0],-6]
        })

        cloud2.animate([
            {pos:[611,-6]}
        ],{
            duration: 500, //总运动时间
            fill: 'forwards', //动画结束保持最后的状态
            // iterations: Infinity,   //循环动画 无回调
        }).finished.then(()=> {
            cloud2.animate([
                {x:cloud2.attr('x')},
                {x:cloud2.attr('x')+21},
                {x:cloud2.attr('x')},
            ],{
                duration: 3000, //总运动时间
                // fill: 'forwards', //动画结束保持最后的状态
                iterations: Infinity,   //循环动画 无回调
            });
        })
        this.ctn.append(cloud1);
        this.ctn.append(cloud2);
    },
    createNextButton(){
        let indexbutton = new Sprite('indexbutton');
        indexbutton.attr({
            anchor:[0.5,0.5],
            pos:[stageprop.width/2,945]
        })
        indexbutton.animate([
            {scale:0},
            {scale:1},
        ],{
            easing: 'ease-in-out',
            duration:200,
            fill:'forwards'
        }).finished.then(()=>{
            // indexbutton.animate([
            //     {scale:1},
            //     {scale:1.05},
            //     {scale:1},
            // ],{
            //     duration:1000,
            //     iterations: Infinity,
            // })
            indexbutton.animate([
                {rotate:-5},
                {rotate:5},
                {rotate:-5},
            ],{
                duration:300,
                iterations: Infinity,
            })
        })
        indexbutton.on('click',()=>{
            viewhandle.changeView(2);
        })
        this.ctn.append(indexbutton);

        let clicktips = new Sprite('clicktips');
        clicktips.attr({
            anchor:[0.5,0],
            pos:[stageprop.width/2,980],
            opacity:0,
        })
        clicktips.animate([
            {pos:[stageprop.width/2,980],opacity:0,},
            {pos:[stageprop.width/2,945],opacity:1,},
            {pos:[stageprop.width/2,980],opacity:0,},
        ],{
            duration:1000,
            delay:500,
            iterations:Infinity,
        })
        // this.ctn.append(clicktips);
    }
}

export default indexframe