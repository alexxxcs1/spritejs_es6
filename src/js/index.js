import "babel-polyfill";
import '../css/base.scss';
import tool from './tool';
import  './loader';

import '../audio/bkg.m4a';
import  '../audio/cutdowntime.mp3';
import  '../audio/fail.mp3';
import  '../audio/success.mp3';

window.onload = ()=>{
    tool.getShare(location.href);
    
    tool.audioAutoPlay('bkg');
    tool.audioAutoPlay('fail',0);
    tool.audioAutoPlay('success',0);
    tool.audioAutoPlay('cutdowntime',0);
}

