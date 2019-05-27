import {stage,stageprop} from './createstage';
import {Sprite,Group} from 'spritejs';
import viewhandle from './viewhandle';

const requireContext = require.context("../img", true, /^\.\/.*\.(?:png|jpg|gif|bmp)$/);  //引入所有图片
const imgLib = requireContext.keys().map(requireContext);         //生成图片合集

import loadingbar from '../img/loadingbar.png';


const imgJson = imgLib.map(function(src,index) {    //批量配置sprite需要的loader格式
  const id = src.split('-');
  return {id:id[1],src}; 
});
const images = [    //loader配置
    ...imgJson
]
const loadinglayer = stage.layer('loader'); //创建loading页面
// const loaderbar = new Sprite({      //创建loadin进度条
//     size: [0, 30],
//     anchor:[0,15],
//     pos: [750-640 >>1,stageprop.height/2],
//     bgcolor: '#00abde',
//     borderRadius: 20,
//   })
let loaderBarlight = new Group();

let loaderbarLogo = new Sprite(loadingbar);
let loaderbarLogogray = new Sprite(loadingbar);
console.log(loaderbarLogo);

loaderBarlight.attr({
  size:[325,123],
  // bgcolor:'#333'
  anchor:[0,0.5],
  pos:[stageprop.width - 325 >>1,stageprop.height/2]
})
loaderbarLogo.attr({
  // anchor:[0.5,0.5],
  // pos:[loaderBarlight.attr('width')/2,loaderBarlight.attr('height')/2],
})
loaderbarLogogray.attr({
  anchor:[0,0.5],
  pos:[stageprop.width - 325 >>1,stageprop.height/2],
  filter:{
    grayscale:'1000%',
    brightness:'1000%'

  }
})
loaderBarlight.append(loaderbarLogo); //loading页面加入进度条

loadinglayer.append(loaderbarLogogray); //loading页面加入进度条

loadinglayer.append(loaderBarlight); //loading页面加入进度条
  async function loadRes() {        //异步加载图片资源方法
    stage.on('preload', (evt) => {  //异步加载监听
      if (evt.loaded.length/evt.resources.length == 1) {
          stage.removeLayer('loader');
      }else{
        loaderBarlight.attr({
            size: [325 * evt.loaded.length/evt.resources.length, 123],
        })
      }
      
    })
    const imgs = await stage.preload(...images);  //加载图片
    viewhandle.init();  //加载完后进入view页面
  }
loadRes();