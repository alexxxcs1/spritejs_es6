import {stage,stageprop} from '../createstage';
import {Scene,Sprite,Group} from 'spritejs';
import viewhandle from '../viewhandle';
import gameview from './gameview';

let selectfood = {
    ctn:null,
    init(){
        this.ctn = stage.layer('foodselect');
        let logo = new Sprite('logo');
        logo.attr({
            pos:[50,29],
            zIndex:500,
        })
        this.ctn.append(logo);

        this.timeline();

        //选项1
        let fooditem1 = this.createSelectItem(1);
        fooditem1.attr({
            anchor:[0.5,0],
            pos:[stageprop.width/2,248],
            zIndex:10,
            scale:0,
        })
        fooditem1.animate([
            {scale:0},
            {scale:1},
        ],{
            duration:100,
            fill:'forwards',
            delay:200,
        })
        fooditem1.on('click',()=>{
            gameview.setGameSelect(1);
            viewhandle.changeView(3);      
        });
        this.ctn.append(fooditem1);
        //选项2
        let fooditem2 = this.createSelectItem(2);
        fooditem2.attr({
            anchor:[0.5,0],
            pos:[stageprop.width/2,504],
            zIndex:10,
            scale:0,
        })
        fooditem2.animate([
            {scale:0},
            {scale:1},
        ],{
            duration:100,
            fill:'forwards',
            delay:200,
        })
        fooditem2.on('click',()=>{
            gameview.setGameSelect(2);
            viewhandle.changeView(3);
        });
        this.ctn.append(fooditem2);
        //选项3
        let fooditem3 = this.createSelectItem(3);
        fooditem3.attr({
            anchor:[0.5,0],
            pos:[stageprop.width/2,760],
            zIndex:10,
            scale:0,
        })
        fooditem3.animate([
            {scale:0},
            {scale:1},
        ],{
            duration:100,
            fill:'forwards',
            delay:200,
        })
        fooditem3.on('click',()=>{
            gameview.setGameSelect(3);
            viewhandle.changeView(3);
        });
        this.ctn.append(fooditem3);
        
    },
    timeline(){
        (async function(){

            //创建地面
            let frame2ground = new Sprite('frame2ground');
            frame2ground.attr({
                anchor:[0.5,1],
                pos:[stageprop.width/2 + 21,stageprop.height],
                zIndex:1,
            })
            frame2ground.animate([
                {scale:0},
                {scale:1},
            ],{
                duration:100,
                fill:'forwards'
            });
            selectfood.ctn.append(frame2ground);  

            //创建空中飞舞的桃心
            let frame2flyheart = new Sprite('frame2flyheart');
            frame2flyheart.attr({
                anchor:[0.5,0.5],
                pos:[stageprop.width/2,stageprop.height/2 - 54],
                zIndex:1
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
            selectfood.ctn.append(frame2flyheart);  

            //创建页面标题
            let foodselecttitle = new Sprite('foodselecttitle');
            foodselecttitle.attr({
                anchor:[0.5,0.5],
                pos:[stageprop.width/2,158],
                zIndex:2,
            })
            selectfood.ctn.append(foodselecttitle);  

        })();
    },
    createSelectItem(type){
        let ItemGroup = new Group();
        ItemGroup.attr({
            size:[540,215],
            // bgcolor:'#333',
        });
        switch (type) {
            case 1:
                //创建item背景
                let food1itembox = new Sprite('selectitembox');
                food1itembox.attr({
                    anchor:[1,1],
                    pos:[ItemGroup.attr('width'),ItemGroup.attr('height')]
                })
                ItemGroup.append(food1itembox);
                //创建item序列号
                let food1itemindex = new Sprite('food1itemindex');
                food1itemindex.attr({
                    anchor:[0.5,0.5],
                    pos:[34,33]
                })
                food1itemindex.animate([
                    {scale:0.9,},
                    {scale:1,},
                    {scale:0.9,},
                ],{
                    duration:1000,
                    iterations:Infinity,
                })
                ItemGroup.append(food1itemindex);
                //创建itemimg
                let food1itemimg = new Sprite('food1itemimg');
                food1itemimg.attr({
                    anchor:[0.5,0.5],
                    pos:[164,123]
                })
                ItemGroup.append(food1itemimg);

                //创建item名称
                let food1itemtext = new Sprite('food1itemtext');
                food1itemtext.attr({
                    anchor:[0.5,0.5],
                    pos:[389,122],
                })
                ItemGroup.append(food1itemtext);

                break;
            case 2:
                //创建item背景
                let food2itembox = new Sprite('selectitembox');
                food2itembox.attr({
                    anchor:[1,1],
                    pos:[ItemGroup.attr('width'),ItemGroup.attr('height')]
                })
                ItemGroup.append(food2itembox);

                //创建item序列号
                let food2itemindex = new Sprite('food2itemindex');
                food2itemindex.attr({
                    anchor:[0.5,0.5],
                    pos:[34,33]
                })
                food2itemindex.animate([
                    {scale:0.9,},
                    {scale:1,},
                    {scale:0.9,},
                ],{
                    duration:1000,
                    iterations:Infinity,
                })
                ItemGroup.append(food2itemindex);
                //创建itemimg
                let food2itemimg = new Sprite('food2itemimg');
                food2itemimg.attr({
                    anchor:[0.5,0.5],
                    pos:[167,123]
                })
                ItemGroup.append(food2itemimg);

                //创建item名称
                let food2itemtext = new Sprite('food2itemtext');
                food2itemtext.attr({
                    anchor:[0.5,0.5],
                    pos:[389,122],
                })
                ItemGroup.append(food2itemtext);
                break;
            case 3:
                //创建item背景
                let food3itembox = new Sprite('selectitembox');
                food3itembox.attr({
                    anchor:[1,1],
                    pos:[ItemGroup.attr('width'),ItemGroup.attr('height')]
                })
                ItemGroup.append(food3itembox);

                //创建item序列号
                let food3itemindex = new Sprite('food3itemindex');
                food3itemindex.attr({
                    anchor:[0.5,0.5],
                    pos:[34,33]
                })
                food3itemindex.animate([
                    {scale:0.9,},
                    {scale:1,},
                    {scale:0.9,},
                ],{
                    duration:1000,
                    iterations:Infinity,
                })
                ItemGroup.append(food3itemindex);
                //创建itemimg
                let food3itemimg = new Sprite('food3itemimg');
                food3itemimg.attr({
                    anchor:[0.5,0.5],
                    pos:[167,123],
                    shadow: {
                        offset: [10, 0],
                        blur: 100,
                        color: '#c86889',
                    },
                })
                ItemGroup.append(food3itemimg);
                let hotbowair = new Sprite('hotbowair');
                hotbowair.attr({
                    anchor:[0.5,0.5],
                    pos:[167,70],
                    scale:0.7,
                })
                hotbowair.animate([
                    {pos:[167,70],scale:1,opacity:1},
                    {pos:[167,40],scale:1.3,opacity:0},
                ],{
                    duration:1500,
                    iterations:Infinity,
                })
                ItemGroup.append(hotbowair);
                //创建item名称
                let food3itemtext = new Sprite('food3itemtext');
                food3itemtext.attr({
                    anchor:[0.5,0.5],
                    pos:[389,122],
                })
                ItemGroup.append(food3itemtext);
                break;
        }
        return ItemGroup;
    }
}
export default selectfood;