/*! For license information please see module.js.LICENSE.txt */
define(["react","@grafana/ui","@grafana/runtime","@grafana/data","lodash"],(function(t,e,n,r,o){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=55)}({0:function(e,n){e.exports=t},1:function(t,e,n){"use strict";n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i})),n.d(e,"g",(function(){return a})),n.d(e,"b",(function(){return c})),n.d(e,"d",(function(){return s})),n.d(e,"i",(function(){return u})),n.d(e,"f",(function(){return l})),n.d(e,"h",(function(){return f})),n.d(e,"e",(function(){return d}));var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var i=function(){return(i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function a(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n}function c(t,e,n,r){return new(n||(n=Promise))((function(o,i){function a(t){try{s(r.next(t))}catch(t){i(t)}}function c(t){try{s(r.throw(t))}catch(t){i(t)}}function s(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}s((r=r.apply(t,e||[])).next())}))}function s(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}Object.create;function u(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function l(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}function f(t,e){for(var n=0,r=e.length,o=t.length;n<r;n++,o++)t[o]=e[n];return t}function d(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t}Object.create},10:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o})),function(t){t.Probes="probes",t.Checks="checks"}(r||(r={}));var o,i={queryType:r.Probes};!function(t){t.dns="dns",t.dns_basic="dns_basic",t.http="http",t.http_basic="http_basic",t.http_ssl="http_ssl",t.http_ssl_basic="http_ssl_basic",t.ping="ping",t.ping_basic="ping_basic",t.tcp="tcp",t.tcp_basic="tcp_basic",t.tcp_ssl="tcp_ssl",t.tcp_ssl_basic="tcp_ssl_basic"}(o||(o={}))},11:function(t,e){t.exports=o},16:function(t,e,n){"use strict";var r=n(1),o=n(0),i=n.n(o),a=n(3),c=n(6),s=function(t){var e=t.info,n=c.config.datasources[e.grafanaName];return n?i.a.createElement("div",{className:"add-data-source-item",onClick:function(){"synthetic-monitoring-datasource"===(null==n?void 0:n.type)?Object(c.getLocationSrv)().update({partial:!1,path:"a/grafana-synthetic-monitoring-app/"}):Object(c.getLocationSrv)().update({partial:!1,path:"datasources/edit/"+(null==n?void 0:n.id)+"/",query:{}})}},i.a.createElement("img",{className:"add-data-source-item-logo",src:n.meta.info.logos.small}),i.a.createElement("div",{className:"add-data-source-item-text-wrapper"},i.a.createElement("span",{className:"add-data-source-item-text"},n.name),i.a.createElement("span",{className:"add-data-source-item-desc"},n.type))):i.a.createElement(a.Spinner,null)},u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(r.c)(e,t),e.prototype.render=function(){var t=this.props.settings;return t?i.a.createElement("div",null,i.a.createElement("h2",null,"Linked Data Sources"),i.a.createElement(a.Container,{margin:"sm"},i.a.createElement(s,{info:t.metrics}),i.a.createElement(s,{info:t.logs}))):i.a.createElement("div",null,"Loading...")},e}(o.PureComponent);n.d(e,"a",(function(){return u}))},3:function(t,n){t.exports=e},55:function(t,e,n){"use strict";n.r(e);var r=n(7),o=n(1),i=n(10),a=n(6),c=function(t){function e(e){var n=t.call(this,e)||this;return n.instanceSettings=e,n}return Object(o.c)(e,t),e.prototype.getMetricsDS=function(){return a.config.datasources[this.instanceSettings.jsonData.metrics.grafanaName]},e.prototype.query=function(t){return Object(o.b)(this,void 0,Promise,(function(){var e,n,a,c,s,u,l,f,d,p,h;return Object(o.d)(this,(function(b){switch(b.label){case 0:e=[],b.label=1;case 1:b.trys.push([1,8,9,10]),n=Object(o.i)(t.targets),a=n.next(),b.label=2;case 2:return a.done?[3,7]:(c=a.value).queryType!==i.b.Probes?[3,4]:[4,this.listProbes()];case 3:return s=b.sent(),(l=new r.ArrayDataFrame(s)).setFieldType("onlineChange",r.FieldType.time,(function(t){return 1e3*t})),l.setFieldType("created",r.FieldType.time,(function(t){return 1e3*t})),l.setFieldType("modified",r.FieldType.time,(function(t){return 1e3*t})),l.refId=c.refId,e.push(l),[3,6];case 4:return c.queryType!==i.b.Checks?[3,6]:[4,this.listChecks()];case 5:u=b.sent(),(l=new r.ArrayDataFrame(u)).setFieldType("created",r.FieldType.time,(function(t){return 1e3*t})),l.setFieldType("modified",r.FieldType.time,(function(t){return 1e3*t})),l.refId=c.refId,f=Object(o.a)(Object(o.a)({},l),{fields:l.fields,length:u.length}),e.push(f),b.label=6;case 6:return a=n.next(),[3,2];case 7:return[3,10];case 8:return d=b.sent(),p={error:d},[3,10];case 9:try{a&&!a.done&&(h=n.return)&&h.call(n)}finally{if(p)throw p.error}return[7];case 10:return[2,{data:e}]}}))}))},e.prototype.getCheckInfo=function(){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(t){return[2,Object(a.getBackendSrv)().fetch({method:"GET",url:this.instanceSettings.url+"/sm/checks/info"}).toPromise().then((function(t){return t.data}))]}))}))},e.prototype.listProbes=function(){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(t){return[2,Object(a.getBackendSrv)().fetch({method:"GET",url:this.instanceSettings.url+"/sm/probe/list"}).toPromise().then((function(t){return t.data}))]}))}))},e.prototype.addProbe=function(t){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(e){return[2,Object(a.getBackendSrv)().fetch({method:"POST",url:this.instanceSettings.url+"/sm/probe/add",data:t}).toPromise().then((function(t){return t.data}))]}))}))},e.prototype.deleteProbe=function(t){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(e){return[2,Object(a.getBackendSrv)().fetch({method:"DELETE",url:this.instanceSettings.url+"/sm/probe/delete/"+t}).toPromise().then((function(t){return t.data}))]}))}))},e.prototype.updateProbe=function(t){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(e){return[2,Object(a.getBackendSrv)().fetch({method:"POST",url:this.instanceSettings.url+"/sm/probe/update",data:t}).toPromise().then((function(t){return t.data}))]}))}))},e.prototype.resetProbeToken=function(t){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(e){return[2,Object(a.getBackendSrv)().fetch({method:"POST",url:this.instanceSettings.url+"/sm/probe/update?reset-token=true",data:t}).toPromise().then((function(t){return t.data}))]}))}))},e.prototype.listChecks=function(){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(t){return[2,Object(a.getBackendSrv)().fetch({method:"GET",url:this.instanceSettings.url+"/sm/check/list"}).toPromise().then((function(t){return Array.isArray(t.data)?t.data:[]}))]}))}))},e.prototype.addCheck=function(t){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(e){return[2,Object(a.getBackendSrv)().fetch({method:"POST",url:this.instanceSettings.url+"/sm/check/add",data:t}).toPromise().then((function(t){return t.data}))]}))}))},e.prototype.deleteCheck=function(t){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(e){return[2,Object(a.getBackendSrv)().fetch({method:"DELETE",url:this.instanceSettings.url+"/sm/check/delete/"+t}).toPromise().then((function(t){return t.data}))]}))}))},e.prototype.updateCheck=function(t){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(e){return[2,Object(a.getBackendSrv)().fetch({method:"POST",url:this.instanceSettings.url+"/sm/check/update",data:t}).toPromise().then((function(t){return t.data}))]}))}))},e.prototype.getTenant=function(){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(t){return[2,Object(a.getBackendSrv)().fetch({method:"GET",url:this.instanceSettings.url+"/sm/tenant"}).toPromise().then((function(t){return t.data}))]}))}))},e.prototype.disableTenant=function(){return Object(o.b)(this,void 0,Promise,(function(){var t;return Object(o.d)(this,(function(e){switch(e.label){case 0:return[4,this.getTenant()];case 1:return t=e.sent(),[2,Object(a.getBackendSrv)().fetch({method:"POST",url:this.instanceSettings.url+"/sm/tenant/update",data:Object(o.a)(Object(o.a)({},t),{status:1})}).toPromise().then((function(t){return t.data}))]}}))}))},e.prototype.normalizeURL=function(t){return t.startsWith("http://")||t.startsWith("https://")?t:"https://"+t},e.prototype.registerInit=function(t,e){return Object(o.b)(this,void 0,Promise,(function(){var n,r;return Object(o.d)(this,(function(i){switch(i.label){case 0:return n=Object(a.getBackendSrv)(),r=Object(o.a)(Object(o.a)({},this.instanceSettings),{jsonData:{apiHost:this.normalizeURL(t)},access:"proxy"}),[4,n.put("api/datasources/"+this.instanceSettings.id,r)];case 1:return i.sent(),[2,n.fetch({method:"POST",url:this.instanceSettings.url+"/sm/register/init",data:{apiToken:e},headers:{"X-Grafana-NoCache":"true"}}).toPromise().then((function(t){return t.data}))]}}))}))},e.prototype.onOptionsChange=function(t){return Object(o.b)(this,void 0,void 0,(function(){var e;return Object(o.d)(this,(function(n){switch(n.label){case 0:return e=Object(o.a)(Object(o.a)({},this.instanceSettings),{jsonData:t,access:"proxy"}),[4,Object(a.getBackendSrv)().put("api/datasources/"+this.instanceSettings.id,e)];case 1:return n.sent(),[2]}}))}))},e.prototype.registerSave=function(t,e,n){return Object(o.b)(this,void 0,Promise,(function(){var r;return Object(o.d)(this,(function(i){switch(i.label){case 0:return r=Object(o.a)(Object(o.a)({},this.instanceSettings),{jsonData:e,secureJsonData:{accessToken:n},access:"proxy"}),[4,Object(a.getBackendSrv)().put("api/datasources/"+this.instanceSettings.id,r)];case 1:return i.sent(),[4,Object(a.getBackendSrv)().fetch({method:"POST",url:this.instanceSettings.url+"/sm/register/save",headers:{"X-Grafana-NoCache":"true"},data:{apiToken:t,metricsInstanceId:e.metrics.hostedId,logsInstanceId:e.logs.hostedId}})];case 2:return[2,i.sent()]}}))}))},e.prototype.getViewerToken=function(t,e){return Object(o.b)(this,void 0,Promise,(function(){return Object(o.d)(this,(function(n){return[2,Object(a.getBackendSrv)().fetch({method:"POST",url:this.instanceSettings.url+"/sm/register/viewer-token",data:{apiToken:t,id:e.id,type:e.type}}).toPromise().then((function(t){var e;return null===(e=t.data)||void 0===e?void 0:e.token}))]}))}))},e.prototype.testDatasource=function(){return Object(o.b)(this,void 0,void 0,(function(){var t;return Object(o.d)(this,(function(e){switch(e.label){case 0:return[4,this.listProbes()];case 1:return(t=e.sent()).length?[2,{status:"OK",mesage:"Found "+t.length+" probes"}]:[2,{status:"Error",mesage:"unable to connect"}]}}))}))},e}(r.DataSourceApi),s=n(0),u=n.n(s),l=n(3),f=n(16),d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.onAccessTokenChange=function(t){var n=e.props,r=n.onOptionsChange,i=n.options;r(Object(o.a)(Object(o.a)({},i),{secureJsonData:{accessToken:t.target.value}}))},e.onResetAccessToken=function(){var t=e.props,n=t.onOptionsChange,r=t.options;n(Object(o.a)(Object(o.a)({},r),{secureJsonFields:Object(o.a)(Object(o.a)({},r.secureJsonFields),{accessToken:!1}),secureJsonData:Object(o.a)(Object(o.a)({},r.secureJsonData),{accessToken:""})}))},e}return Object(o.c)(e,t),e.prototype.render=function(){var t=this.props.options,e=t.secureJsonFields,n=t.secureJsonData||{};function r(){return e&&e.accessToken}return u.a.createElement("div",null,function(t){if(!t)return!1;var e=t.apiHost,n=t.metrics,r=t.logs;if(!(e&&n&&n.grafanaName&&n.hostedId))return!1;if(!r||!r.grafanaName||!r.hostedId)return!1;return!0}(t.jsonData)&&r()&&u.a.createElement(f.a,{settings:t.jsonData}),u.a.createElement("br",null),u.a.createElement("div",{className:"gf-form-group"},u.a.createElement("div",{className:"gf-form-inline"},u.a.createElement("div",{className:"gf-form"},u.a.createElement(l.LegacyForms.SecretFormField,{isConfigured:r(),value:n.accessToken||"",label:"Access Token",placeholder:"access token saved on the server",labelWidth:10,inputWidth:20,onReset:this.onResetAccessToken,onChange:this.onAccessTokenChange})))))},e}(s.PureComponent);var p=n(11),h=[{label:"Probes",value:i.b.Probes},{label:"Checks",value:i.b.Checks}],b=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.onQueryTypeChanged=function(t){var n=e.props,r=n.onChange,i=n.onRunQuery,a=n.query;r(Object(o.a)(Object(o.a)({},a),{queryType:t.value})),i()},e}return Object(o.c)(e,t),e.prototype.onComponentDidMount=function(){},e.prototype.render=function(){var t=Object(p.defaults)(this.props.query,i.c);return u.a.createElement("div",{className:"gf-form"},u.a.createElement(l.Select,{options:h,value:h.find((function(e){return e.value===t.queryType})),onChange:this.onQueryTypeChanged}))},e}(s.PureComponent);n.d(e,"plugin",(function(){return m}));var m=new r.DataSourcePlugin(c).setConfigEditor(d).setQueryEditor(b)},6:function(t,e){t.exports=n},7:function(t,e){t.exports=r}})}));
//# sourceMappingURL=module.js.map