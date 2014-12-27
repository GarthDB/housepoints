(function(t,n,r){n[t]=r.call(n);if(typeof module!=="undefined"&&module.exports){module.exports=n[t]}else if(typeof define=="function"&&define.amd){define(function(){return n[t]})}})("Primus",this,function e(){"use strict";function t(e,t,n){this.fn=e;this.context=t;this.once=n||false}function n(){}function r(t,n){if(t instanceof e)return;var r=new Error("Primus#"+n+"'s context should called with a Primus instance");if("function"!==typeof t.listeners||!t.listeners("error").length){throw r}t.emit("error",r)}function e(t,r){if(!(this instanceof e))return new e(t,r);if("function"!==typeof this.client){var s="The client library has not been compiled correctly, "+"see https://github.com/primus/primus#client-library for more details";return this.critical(new Error(s))}if("object"===typeof t){r=t;t=r.url||r.uri||i}else{r=r||{}}var u=this;r.queueSize="queueSize"in r?r.queueSize:Infinity;r.timeout="timeout"in r?r.timeout:1e4;r.reconnect="reconnect"in r?r.reconnect:{};r.ping="ping"in r?r.ping:25e3;r.pong="pong"in r?r.pong:1e4;r.strategy="strategy"in r?r.strategy:[];r.transport="transport"in r?r.transport:{};u.buffer=[];u.writable=true;u.readable=true;u.url=u.parse(t||i);u.readyState=e.CLOSED;u.options=r;u.timers={};u.attempt=null;u.socket=null;u.latency=0;u.stamps=0;u.disconnect=false;u.transport=r.transport;u.transformers={outgoing:[],incoming:[]};if("string"===typeof r.strategy){r.strategy=r.strategy.split(/\s?\,\s?/g)}if(false===r.strategy){r.strategy=[]}else if(!r.strategy.length){r.strategy.push("disconnect","online");if(!this.authorization)r.strategy.push("timeout")}r.strategy=r.strategy.join(",").toLowerCase();if(!o)n.call(u);if("websockets"in r){u.AVOID_WEBSOCKETS=!r.websockets}if("network"in r){u.NETWORK_EVENTS=r.network}if(!r.manual)u.timers.open=setTimeout(function(){u.clearTimeout("open").open()},0);u.initialise(r)}n.prototype._events=undefined;n.prototype.listeners=function(t){if(!this._events||!this._events[t])return[];if(this._events[t].fn)return[this._events[t].fn];for(var n=0,r=this._events[t].length,i=new Array(r);n<r;n++){i[n]=this._events[t][n].fn}return i};n.prototype.emit=function(t,n,r,i,s,o){if(!this._events||!this._events[t])return false;var u=this._events[t],a=arguments.length,f,l;if("function"===typeof u.fn){if(u.once)this.removeListener(t,u.fn,true);switch(a){case 1:return u.fn.call(u.context),true;case 2:return u.fn.call(u.context,n),true;case 3:return u.fn.call(u.context,n,r),true;case 4:return u.fn.call(u.context,n,r,i),true;case 5:return u.fn.call(u.context,n,r,i,s),true;case 6:return u.fn.call(u.context,n,r,i,s,o),true}for(l=1,f=new Array(a-1);l<a;l++){f[l-1]=arguments[l]}u.fn.apply(u.context,f)}else{var c=u.length,h;for(l=0;l<c;l++){if(u[l].once)this.removeListener(t,u[l].fn,true);switch(a){case 1:u[l].fn.call(u[l].context);break;case 2:u[l].fn.call(u[l].context,n);break;case 3:u[l].fn.call(u[l].context,n,r);break;default:if(!f)for(h=1,f=new Array(a-1);h<a;h++){f[h-1]=arguments[h]}u[l].fn.apply(u[l].context,f)}}}return true};n.prototype.on=function(n,r,i){var s=new t(r,i||this);if(!this._events)this._events={};if(!this._events[n])this._events[n]=s;else{if(!this._events[n].fn)this._events[n].push(s);else this._events[n]=[this._events[n],s]}return this};n.prototype.once=function(n,r,i){var s=new t(r,i||this,true);if(!this._events)this._events={};if(!this._events[n])this._events[n]=s;else{if(!this._events[n].fn)this._events[n].push(s);else this._events[n]=[this._events[n],s]}return this};n.prototype.removeListener=function(t,n,r){if(!this._events||!this._events[t])return this;var i=this._events[t],s=[];if(n){if(i.fn&&(i.fn!==n||r&&!i.once)){s.push(i)}if(!i.fn)for(var o=0,u=i.length;o<u;o++){if(i[o].fn!==n||r&&!i[o].once){s.push(i[o])}}}if(s.length){this._events[t]=s.length===1?s[0]:s}else{delete this._events[t]}return this};n.prototype.removeAllListeners=function(t){if(!this._events)return this;if(t)delete this._events[t];else this._events={};return this};n.prototype.off=n.prototype.removeListener;n.prototype.addListener=n.prototype.on;n.prototype.setMaxListeners=function(){return this};var i;try{if(location.origin){i=location.origin}else{i=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"")}}catch(s){i="http://127.0.0.1"}e.require=function(t){if("function"!==typeof require)return undefined;return!("function"===typeof define&&define.amd)?require(t):undefined};var o,u;try{e.Stream=o=e.require("stream");u=e.require("url").parse;e.require("util").inherits(e,o)}catch(s){e.Stream=n;e.prototype=new n;u=function(t){var n=document.createElement("a"),r={},i;n.href=t;for(i in n){if("string"===typeof n[i]||"number"===typeof n[i]){r[i]=n[i]}}r.href=encodeURI(decodeURI(r.href));if(!r.port){var s=(r.href||"").split("/");if(s.length>2){var o=s[2],u=o.lastIndexOf("@");if(~u)o=o.slice(u+1);s=o.split(":");if(s.length===2)r.port=s[1]}}if(!r.protocol||":"===r.protocol){r.protocol=r.href.substr(0,r.href.indexOf(":")+1)}if("0"===r.port)r.port="";if(~r.href.indexOf("@")&&!r.auth){var a=r.protocol.length+2;r.auth=r.href.slice(a,r.href.indexOf(r.pathname,a)).split("@")[0]}return r}}e.OPENING=1;e.CLOSED=2;e.OPEN=3;e.prototype.AVOID_WEBSOCKETS=false;e.prototype.NETWORK_EVENTS=false;e.prototype.online=true;try{if(e.prototype.NETWORK_EVENTS="onLine"in navigator&&(window.addEventListener||document.body.attachEvent)){if(!navigator.onLine){e.prototype.online=false}}}catch(s){}e.prototype.ark={};e.prototype.plugin=function(t){r(this,"plugin");if(t)return this.ark[t];var n={};for(t in this.ark){n[t]=this.ark[t]}return n};e.prototype.reserved=function(t){return/^(incoming|outgoing)::/.test(t)||t in this.reserved.events};e.prototype.reserved.events={readyStateChange:1,reconnecting:1,reconnected:1,reconnect:1,offline:1,timeout:1,online:1,error:1,close:1,open:1,data:1,end:1};e.prototype.initialise=function(n){function o(){if(!r.online)return;r.online=false;r.emit("offline");r.end();r.clearTimeout("reconnect");r.attempt=null}function u(){if(r.online)return;r.online=true;r.emit("online");if(~r.options.strategy.indexOf("online"))r.reconnect()}var r=this,i;r.on("outgoing::open",function(){var n=r.readyState;r.readyState=e.OPENING;if(n!==r.readyState){r.emit("readyStateChange","opening")}i=+(new Date)});r.on("incoming::open",function(){var n=r.readyState,s=r.attempt;if(r.attempt)r.attempt=null;r.writable=true;r.readable=true;if(!r.online){r.online=true;r.emit("online")}r.readyState=e.OPEN;if(n!==r.readyState){r.emit("readyStateChange","open")}r.latency=+(new Date)-i;r.emit("open");if(s)r.emit("reconnected");r.clearTimeout("ping","pong").heartbeat();if(r.buffer.length){var o=r.buffer.slice(),u=o.length,a=0;r.buffer.length=0;for(;a<u;a++){r._write(o[a])}}});r.on("incoming::pong",function(t){r.online=true;r.clearTimeout("pong").heartbeat();r.latency=+(new Date)-t});r.on("incoming::error",function(t){var n=r.timers.connect,i=t;if(r.attempt)return r.reconnect();if("string"===typeof t){i=new Error(t)}else if(!(t instanceof Error)&&"object"===typeof t){i=new Error(t.message||t.reason);for(var s in t){if(t.hasOwnProperty(s))i[s]=t[s]}}if(r.listeners("error").length)r.emit("error",i);if(n){if(~r.options.strategy.indexOf("timeout"))r.reconnect();else r.end()}});r.on("incoming::data",function(t){r.decoder(t,function(n,i){if(n)return r.listeners("error").length&&r.emit("error",n);if(r.protocol(i))return;r.transforms(r,r,"incoming",i,t)})});r.on("incoming::end",function(){var n=r.readyState;if(r.disconnect){r.disconnect=false;return r.end()}r.readyState=e.CLOSED;if(n!==r.readyState){r.emit("readyStateChange","end")}if(r.timers.connect)r.end();if(n!==e.OPEN){return r.attempt?r.reconnect():false}this.writable=false;this.readable=false;for(var i in this.timers){this.clearTimeout(i)}r.emit("close");if(~r.options.strategy.indexOf("disconnect")){return r.reconnect()}r.emit("outgoing::end");r.emit("end")});r.client();for(var s in r.ark){r.ark[s].call(r,r,n)}if(!r.NETWORK_EVENTS)return r;if(window.addEventListener){window.addEventListener("offline",o,false);window.addEventListener("online",u,false)}else if(document.body.attachEvent){document.body.attachEvent("onoffline",o);document.body.attachEvent("ononline",u)}return r};e.prototype.protocol=function(t){if("string"!==typeof t||t.indexOf("primus::")!==0)return false;var n=t.indexOf(":",8),r=t.slice(n+2);switch(t.slice(8,n)){case"pong":this.emit("incoming::pong",r);break;case"server":if("close"===r){this.disconnect=true}break;case"id":this.emit("incoming::id",r);break;default:return false}return true};e.prototype.transforms=function(t,n,r,i,s){var o={data:i},u=t.transformers[r];(function a(e,t){var r=u[e++];if(!r)return t();if(1===r.length){if(false===r.call(n,o)){return}return a(e,t)}r.call(n,o,function(i,s){if(i)return n.emit("error",i);if(false===s)return;a(e,t)})})(0,function(){if("incoming"===r)return n.emit("data",o.data,s);n._write(o.data)});return this};e.prototype.id=function(t){if(this.socket&&this.socket.id)return t(this.socket.id);this._write("primus::id::");return this.once("incoming::id",t)};e.prototype.open=function(){r(this,"open");if(!this.attempt&&this.options.timeout)this.timeout();this.emit("outgoing::open");return this};e.prototype.write=function(t){r(this,"write");this.transforms(this,this,"outgoing",t);return true};e.prototype._write=function(n){var r=this;if(e.OPEN!==r.readyState){if(this.buffer.length===this.options.queueSize){this.buffer.splice(0,1)}this.buffer.push(n);return false}r.encoder(n,function(t,n){if(t)return r.listeners("error").length&&r.emit("error",t);r.emit("outgoing::data",n)});return true};e.prototype.heartbeat=function(){function n(){t.clearTimeout("pong");if(!t.online)return;t.online=false;t.emit("offline");t.emit("incoming::end")}function r(){var e=+(new Date);t.clearTimeout("ping")._write("primus::ping::"+e);t.emit("outgoing::ping",e);t.timers.pong=setTimeout(n,t.options.pong)}var t=this;if(!t.options.ping)return t;t.timers.ping=setTimeout(r,t.options.ping);return this};e.prototype.timeout=function(){function r(){n.removeListener("error",r).removeListener("open",r).removeListener("end",r).clearTimeout("connect")}var n=this;n.timers.connect=setTimeout(function(){r();if(n.readyState===e.OPEN||n.attempt)return;n.emit("timeout");if(~n.options.strategy.indexOf("timeout"))n.reconnect();else n.end()},n.options.timeout);return n.on("error",r).on("open",r).on("end",r)};e.prototype.clearTimeout=function(){for(var t=arguments,n=0,r=t.length;n<r;n++){if(this.timers[t[n]])clearTimeout(this.timers[t[n]]);delete this.timers[t[n]]}return this};e.prototype.backoff=function(t,n){n=n||{};var r=this;if(n.backoff)return r;n.maxDelay="maxDelay"in n?n.maxDelay:Infinity;n.minDelay="minDelay"in n?n.minDelay:500;n.retries="retries"in n?n.retries:10;n.attempt=(+n.attempt||0)+1;n.factor="factor"in n?n.factor:2;if(n.attempt>n.retries){t(new Error("Unable to retry"),n);return r}n.backoff=true;n.timeout=n.attempt!==1?Math.min(Math.round((Math.random()+1)*n.minDelay*Math.pow(n.factor,n.attempt)),n.maxDelay):n.minDelay;r.timers.reconnect=setTimeout(function(){n.backoff=false;r.clearTimeout("reconnect");t(undefined,n)},n.timeout);r.emit("reconnecting",n);return r};e.prototype.reconnect=function(){var t=this;t.attempt=t.attempt||t.clone(t.options.reconnect);t.backoff(function(n,r){if(n){t.attempt=null;return t.emit("end")}t.emit("reconnect",r);t.emit("outgoing::reconnect")},t.attempt);return t};e.prototype.end=function(n){r(this,"end");if(this.readyState===e.CLOSED&&!this.timers.connect){if(this.timers.reconnect){this.clearTimeout("reconnect");this.attempt=null;this.emit("end")}return this}if(n!==undefined)this.write(n);this.writable=false;this.readable=false;var i=this.readyState;this.readyState=e.CLOSED;if(i!==this.readyState){this.emit("readyStateChange","end")}for(var s in this.timers){this.clearTimeout(s)}this.emit("outgoing::end");this.emit("close");this.emit("end");return this};e.prototype.clone=function(t){return this.merge({},t)};e.prototype.merge=function(t){var n=Array.prototype.slice.call(arguments,1);for(var r=0,i=n.length,s,o;r<i;r++){o=n[r];for(s in o){if(o.hasOwnProperty(s))t[s]=o[s]}}return t};e.prototype.parse=u;e.prototype.querystring=function(t){var n=/([^=?&]+)=([^&]*)/g,r={},i;for(;i=n.exec(t);r[decodeURIComponent(i[1])]=decodeURIComponent(i[2]));return r};e.prototype.querystringify=function(t){var n=[];for(var r in t){if(t.hasOwnProperty(r)){n.push(encodeURIComponent(r)+"="+encodeURIComponent(t[r]))}}return n.join("&")};e.prototype.uri=function(t){var n=this.url,r=[],i=false;if(t.query)i=true;t=t||{};t.protocol="protocol"in t?t.protocol:"http";t.query=n.search&&"query"in t?n.search.charAt(0)==="?"?n.search.slice(1):n.search:false;t.secure="secure"in t?t.secure:n.protocol==="https:"||n.protocol==="wss:";t.auth="auth"in t?t.auth:n.auth;t.pathname="pathname"in t?t.pathname:this.pathname.slice(1);t.port="port"in t?+t.port:+n.port||(t.secure?443:80);t.host="host"in t?t.host:n.hostname||n.host.replace(":"+n.port,"");this.emit("outgoing::url",t);var s=443!==t.port&&80!==t.port?t.host+":"+t.port:t.host;var o=this.querystring(t.query||"");o._primuscb=+(new Date)+"-"+this.stamps++;t.query=this.querystringify(o);r.push(t.secure?t.protocol+"s:":t.protocol+":","");if(t.auth)r.push(t.auth+"@"+s);else r.push(s);if(t.pathname)r.push(t.pathname);if(i)r.push("?"+t.query);else delete t.query;if(t.object)return t;return r.join("/")};e.prototype.emits=function(t,n){var r=this;return function(i){var s=n?n.apply(r,arguments):i;setTimeout(function(){r.emit("incoming::"+t,s)},0)}};e.prototype.transform=function(t,n){r(this,"transform");if(!(t in this.transformers)){return this.critical(new Error("Invalid transformer type"))}this.transformers[t].push(n);return this};e.prototype.critical=function(t){if(this.listeners("error").length){this.emit("error",t);return this}throw t};e.connect=function(n,r){return new e(n,r)};e.EventEmitter=n;e.prototype.client=function(){var n=this,r;var i=function(){if("undefined"!==typeof WebSocket)return WebSocket;if("undefined"!==typeof MozWebSocket)return MozWebSocket;try{return e.require("ws")}catch(n){}return undefined}();if(!i)return n.critical(new Error("Missing required `ws` module. Please run `npm install --save ws`"));n.on("outgoing::open",function(){n.emit("outgoing::end");try{var t=n.url.protocol==="ws+unix:"?"ws+unix":"ws",s=t==="ws";if(i.length===3){n.socket=r=new i(n.uri({protocol:t,query:s}),[],n.transport)}else{n.socket=r=new i(n.uri({protocol:t,query:s}))}}catch(o){return n.emit("error",o)}r.binaryType="arraybuffer";r.onopen=n.emits("open");r.onerror=n.emits("error");r.onclose=n.emits("end");r.onmessage=n.emits("data",function(t){return t.data})});n.on("outgoing::data",function(t){if(!r||r.readyState!==i.OPEN)return;try{r.send(t)}catch(s){n.emit("incoming::error",s)}});n.on("outgoing::reconnect",function(){n.emit("outgoing::open")});n.on("outgoing::end",function(){if(!r)return;r.onerror=r.onopen=r.onclose=r.onmessage=function(){};r.close();r=null})};e.prototype.authorization=false;e.prototype.pathname="/primus";e.prototype.encoder=function(t,n){var r;try{t=JSON.stringify(t)}catch(i){r=i}n(r,t)};e.prototype.decoder=function(t,n){var r;if("string"!==typeof t)return n(r,t);try{t=JSON.parse(t)}catch(i){r=i}n(r,t)};e.prototype.version="2.4.12";if("object"===typeof JSON&&"function"===typeof JSON.stringify&&JSON.stringify(["\u2028\u2029"])==='["\u2028\u2029"]'){JSON.stringify=function(t){var n=/\u2028/g,r=/\u2029/g;return function(i,s,o){var u=t.call(this,i,s,o);if(u){if(~u.indexOf("\u2028"))u=u.replace(n,"\\u2028");if(~u.indexOf("\u2029"))u=u.replace(r,"\\u2029")}return u}}(JSON.stringify)}if("undefined"!==typeof document&&"undefined"!==typeof navigator){if(document.addEventListener){document.addEventListener("keydown",function(t){if(t.keyCode!==27||!t.preventDefault)return;t.preventDefault()},false)}var a=(navigator.userAgent||"").toLowerCase(),f=a.match(/.+(?:rv|it|ra|ie)[\/: ](\d+)\.(\d+)(?:\.(\d+))?/)||[],l=+[f[1],f[2]].join(".");if(!~a.indexOf("chrome")&&~a.indexOf("safari")&&l<534.54){e.prototype.AVOID_WEBSOCKETS=true}}return e})