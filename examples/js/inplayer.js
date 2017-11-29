!function(e,n,t,r){(t=e.createElement("script")).async=1,t.src="//"+(location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",(r=e.getElementsByTagName("script")[0]).parentNode.insertBefore(t,r)}(document),function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.InPlayer=n()}(this,function(){"use strict";function e(e){return new Promise(function(n,t){function r(i,c){try{var a=e[c?"throw":"next"](i)}catch(e){return void t(e)}a.done?n(a.value):Promise.resolve(a.value).then(r,o)}function o(e){r(e,1)}r()})}var n=function(e,n){return n={exports:{}},e(n,n.exports),n.exports}(function(e,n){!function(n){if(e.exports=n(),!!0){var t=window.Cookies,r=window.Cookies=n();r.noConflict=function(){return window.Cookies=t,r}}}(function(){function e(){for(var e=arguments,n=0,t={};n<arguments.length;n++){var r=e[n];for(var o in r)t[o]=r[o]}return t}function n(t){function r(n,o,i){var c,a=this;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(i=e({path:"/"},r.defaults,i)).expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*i.expires),i.expires=s}i.expires=i.expires?i.expires.toUTCString():"";try{c=JSON.stringify(o),/^[\{\[]/.test(c)&&(o=c)}catch(e){}o=t.write?t.write(o,n):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=(n=(n=encodeURIComponent(String(n))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var u="";for(var d in i)i[d]&&(u+="; "+d,!0!==i[d]&&(u+="="+i[d]));return document.cookie=n+"="+o+u}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],f=/(%[0-9A-Z]{2})+/g,l=0;l<p.length;l++){var m=p[l].split("="),y=m.slice(1).join("=");a.json||'"'!==y.charAt(0)||(y=y.slice(1,-1));try{var h=m[0].replace(f,decodeURIComponent);if(y=t.read?t.read(y,h):t(y,h)||y.replace(f,decodeURIComponent),a.json)try{y=JSON.parse(y)}catch(e){}if(n===h){c=y;break}n||(c[h]=y)}catch(e){}}return c}}return r.set=r,r.get=function(e){return r.call(r,e)},r.getJSON=function(){return r.apply({json:!0},[].slice.call(arguments))},r.defaults={},r.remove=function(n,t){r(n,"",e(t,{expires:-1}))},r.withConverter=n,r}return n(function(){})})}),t=n.get,r=n.set,o=n.remove,i="https://staging-v2.inplayer.com",c="inplayer_token",a={signIn:i+"/accounts/login",signOut:i+"/accounts/logout",signUp:i+"/accounts",requestNewPassword:i+"/accounts/forgot-password",setNewPassword:function(e){return i+"/accounts/forgot-password/"+e},getAccountInfo:i+"/accounts",social:function(e){return i+"/accounts/social?state="+e}},s=function(){};s.prototype.signIn=function(n){return e(function*(){var e=new FormData;e.append("email",n.email),e.append("password",n.password),e.append("merchant_uuid",n.merchant_uuid),e.append("referrer",n.referrer);try{var t=yield(yield fetch(a.signIn,{method:"POST",body:e})).json();return t.access_token&&r(c,t.access_token),t}catch(e){return!1}}())},s.prototype.signOut=function(){return e(function*(){var e=t(c);try{return(yield(yield fetch(a.signOut,{headers:{Authorization:"Bearer "+e}})).json()).explain&&o(c),!0}catch(e){return!1}}())},s.prototype.signUp=function(n){return e(function*(){var e=new FormData;e.append("full_name",n.full_name),e.append("email",n.email),e.append("password",n.password),e.append("password_confirmation",n.password_confirmation),e.append("merchant_uuid",n.merchant_uuid),e.append("type",n.type),e.append("referrer",n.referrer);try{return yield(yield fetch(a.signUp,{method:"POST",body:e})).json()}catch(e){return!1}}())},s.prototype.requestNewPassword=function(n){return e(function*(){var e=new FormData;e.append("email",n.email),e.append("merchant_uuid",n.merchant_uuid);try{return yield(yield fetch(a.requestNewPassword,{method:"POST",body:e})).json()}catch(e){return!1}}())},s.prototype.setNewPassword=function(n,t){return e(function*(){var e="password="+n.password+"&password_confirmation="+n.password_confirmation;try{return yield(yield fetch(a.setNewPassword(t),{method:"PUT",body:e,headers:{"Content-Type":"x-www-form-urlencoded"}})).json()}catch(e){return!1}}())},s.prototype.getAccountInfo=function(n){return e(function*(){try{var e=yield(yield fetch(a.getAccountInfo,{method:"GET",headers:{Authorization:"Bearer "+n}})).json();if(e)return e}catch(e){return!1}}())},s.prototype.getSocialLoginUrls=function(n){return e(function*(){try{var e=yield(yield fetch(a.social(n),{method:"GET"})).json();if(e)return e}catch(e){return!1}}())};return new function(){this.User=new s}});
