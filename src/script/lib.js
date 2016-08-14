/*
* @Author: kevinli
* @Date:   2016-08-14 23:43:26
* @Last Modified by:   kevinli
* @Last Modified time: 2016-08-15 01:37:35
*/

import Vue from 'vue';
import App from './app';

 new Vue({
  el: 'body',
  components: { App },
  ready:function(){
    console.log('hello word')
  }
});



