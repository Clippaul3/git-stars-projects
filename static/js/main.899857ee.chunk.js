(this["webpackJsonpgit-stars-projects"]=this["webpackJsonpgit-stars-projects"]||[]).push([[0],{111:function(e,a,t){},112:function(e,a,t){},132:function(e,a,t){},155:function(e,a,t){},156:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),l=t(19),i=t.n(l),o=(t(92),t(13)),r=t(14),c=t(16),m=t(15),u=(t(93),t(94),t(11)),g=t.n(u),p=t(32),d=(t(111),t(112),t(29),t(30),t(8)),h=t(3),v=function(e){Object(c.a)(t,e);var a=Object(m.a)(t);function t(){var e;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=a.call.apply(a,[this].concat(s))).state={projects:[],language:"",page:1,isLoading:!0,isSwitching:!1},e.switchLanguage=function(a){e.setState({language:a,isSwitching:!0},(function(){a?e.props.history.push({pathname:"/",search:"?language=".concat(a)}):e.props.history.push({pathname:"/"}),window.localStorage.language=a,e.props.onChange(a)}))},e}return Object(r.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.state;e.projects,e.isLoading,e.isSwitching;console.log("\u884c\u4e0d\u884c",this.props.location.search.split("=")[1]);var a=this.props.location.search.split("=")[1];return s.a.createElement("div",{className:"git-stars",ref:"isReachBottom"},s.a.createElement("div",{className:"git-stars-languages"},s.a.createElement("div",{className:"git-stars-languages-item ".concat(!a&&"active"),onClick:this.switchLanguage.bind(this,"")},"All"),s.a.createElement("div",{className:"git-stars-languages-item ".concat("javascript"==a&&"active"),onClick:this.switchLanguage.bind(this,"javascript")},"javascript"),s.a.createElement("div",{className:"git-stars-languages-item ".concat("ruby"==a&&"active"),onClick:this.switchLanguage.bind(this,"ruby")},"ruby"),s.a.createElement("div",{className:"git-stars-languages-item ".concat("java"==a&&"active"),onClick:this.switchLanguage.bind(this,"java")},"java"),s.a.createElement("div",{className:"git-stars-languages-item ".concat("css"==a&&"active"),onClick:this.switchLanguage.bind(this,"css")},"css"),s.a.createElement("div",{className:"git-stars-languages-item ".concat("python"==a&&"active"),onClick:this.switchLanguage.bind(this,"python")},"python")))}}]),t}(n.Component),y=Object(h.f)(v),b=t(159),E=t(17),w=function(e){Object(c.a)(t,e);var a=Object(m.a)(t);function t(){var e;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=a.call.apply(a,[this].concat(s))).state={projects:[],language:"",page:1,isLoading:!1,isSwitching:!1,isWrongPage:!1},e.handle=function(){var a=e.state,t=a.page,n=a.isLoading,s=e.refs.isReachBottom.clientHeight,l=document.documentElement.clientHeight,i=document.documentElement.scrollTop;(l>s||s<=l+i)&&!n&&(t++,e.setState({page:t},(function(){e.loadData()})))},e.loadData=function(){var a=e.state.page,t=e.props.location.search.split("=")[1];e.setState({isLoading:!0},(function(){g.a.get("https://api.github.com/search/repositories?q=stars:%3E1+language:".concat(t,"&sort=stars&order=desc&type=Repositories&page=").concat(a)).then((function(t){if(console.log("\u9875\u9762\u67e5\u8be2\u7ed3\u679c",t),200!=t.status)e.setState({isLoading:!1,isSwitching:!1,isWrongPage:!0});else if(1==a)e.setState({projects:t.data.items,isLoading:!1,isSwitching:!1,isWrongPage:!1});else{var n=e.state.projects.concat(t.data.items);e.setState({projects:n,isLoading:!1,isSwitching:!1,isWrongPage:!1})}e.refs.isReachBottom&&e.refs.isReachBottom.addEventListener("mousewheel",e.handle.bind(Object(p.a)(e)))})).catch((function(a){console.log("\u9519\u8bef\u4fe1\u606f",a,typeof a.message),e.setState({isWrongPage:!0,isLoading:!1,isSwitching:!1,errMsg:a.message})}))}))},e.switchLanguage=function(a){e.state.isSwitching||e.setState({language:a,page:1,isSwitching:!0},(function(){e.loadData()}))},e}return Object(r.a)(t,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"componentDidCatch",value:function(e,a){console.log("\u9519\u5566"),console.log(a,e)}},{key:"render",value:function(){var e=this.state,a=e.projects,t=(e.language,e.isLoading),n=e.isSwitching,l=e.isWrongPage;return s.a.createElement("div",null,l?s.a.createElement("div",{className:"wrong-page"},s.a.createElement("div",null,s.a.createElement(d.a,{className:"wrong-page-icon",icon:E.e})),s.a.createElement("div",{className:"wrong-page-content"},"\u9875\u9762\u9519\u8bef\uff0c\u8bf7",s.a.createElement("a",{onClick:this.loadData.bind(this)},"\u5237\u65b0"),"\u91cd\u8bd5"),s.a.createElement("div",null,"\u9519\u8bef\u4fe1\u606f:"),s.a.createElement("div",null,this.state.errMsg),s.a.createElement("div",{className:"spin-container"},s.a.createElement(b.a,{spinning:t,size:"large",tip:"\u52a0\u8f7d\u4e2d..."}))):s.a.createElement("div",{className:"git-stars",ref:"isReachBottom"},n&&s.a.createElement("div",{className:"switch-container"},s.a.createElement(b.a,{spinning:t,size:"large",tip:"\u52a0\u8f7d\u4e2d..."})),s.a.createElement(y,{onChange:this.switchLanguage.bind(this)}),s.a.createElement("div",{className:"git-stars-body"},a.map((function(e,a){return s.a.createElement("div",{key:a,className:"git-stars-item"},s.a.createElement("div",{className:"git-stars-item-no"},"#",a),s.a.createElement("div",{className:"git-stars-logo"},s.a.createElement("img",{className:"git-stars-img",src:e.owner.avatar_url})),s.a.createElement("div",{className:"git-stars-name"},e.name),s.a.createElement("div",{className:"git-stars-info"},s.a.createElement("div",{className:"git-stars-info-name"},s.a.createElement(d.a,{className:"icon",icon:E.d}),e.name),s.a.createElement("div",{className:"git-stars-star-count"},s.a.createElement(d.a,{className:"icon",icon:E.c}),e.stargazers_count),s.a.createElement("div",{className:"git-stars-forks"},s.a.createElement(d.a,{className:"icon",icon:E.b}),e.forks_count),s.a.createElement("div",{className:"git-stars-issues"},s.a.createElement(d.a,{className:"icon",icon:E.a}),e.open_issues_count)))})),s.a.createElement("div",{className:"spin-container"},s.a.createElement(b.a,{spinning:t,size:"large",tip:"\u52a0\u8f7d\u4e2d..."})))))}}]),t}(n.Component),f=t(43),N=(t(132),t(158)),S=t(27),O=function(e){Object(c.a)(t,e);var a=Object(m.a)(t);function t(){var e;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=a.call.apply(a,[this].concat(s))).state={player1:"",player2:"",isPlayerOneShowed:!1,isPlayerTwoShowed:!1,isPlayerOneLoading:!1,isPlayerTwoLoading:!1,playerOneResult:{},playerTwoResult:{},isButtonOneDisabled:!0,isButtonTwoDisabled:!0,playerOneNotFound:!1,playerTwoNotFound:!1},e.handlePlayerChange=function(a,t){"player1"==a?(t.target.value?e.setState({isButtonOneDisabled:!1}):e.setState({isButtonOneDisabled:!0}),e.refs.input1.value=t.target.value,e.setState(Object(f.a)({},a,t.target.value))):"player2"==a&&(t.target.value?e.setState({isButtonTwoDisabled:!1}):e.setState({isButtonTwoDisabled:!0}),e.refs.input2.value=t.target.value,e.setState(Object(f.a)({},a,t.target.value)))},e.doSearch=function(a){var t=e.state,n=t.player1,s=t.player2,l=t.isPlayerOneLoading,i=t.isPlayerTwoLoading;"player1"==a&&n&&!l?e.setState({isPlayerOneLoading:!0},(function(){g.a.get("https://api.github.com/users/".concat(n)).then((function(a){console.log(a),e.setState({playerOneResult:a.data,isPlayerOneLoading:!1,isPlayerOneShowed:!0,playerOneNotFound:!1})})).catch((function(a){console.log(a),e.setState({isPlayerOneLoading:!1,player1:"",isButtonOneDisabled:!0,playerOneNotFound:!0})}))})):"player2"==a&&s&&!i?e.setState({isPlayerTwoLoading:!0},(function(){g.a.get("https://api.github.com/users/".concat(s)).then((function(a){console.log(a),e.setState({playerTwoResult:a.data,isPlayerTwoLoading:!1,isPlayerTwoShowed:!0,playerTwoNotFound:!1})})).catch((function(a){console.log(a),e.setState({isPlayerTwoLoading:!1,player2:"",isButtonTwoDisabled:!0,playerTwoNotFound:!0})}))})):(console.log("\u7a7a "),N.b.error("\u7a7a"))},e.doClear=function(a){e.setState(Object(f.a)({},a,"")),"player1"==a?e.setState({isPlayerOneShowed:!1,playerOneResult:{},isButtonOneDisabled:!0}):"player2"==a&&e.setState({isPlayerTwoShowed:!1,playerTwoResult:{},isButtonTwoDisabled:!0})},e.doBattle=function(a,t,n,s){var l=window.localStorage;l.player1=a,l.player2=t,l.followers1=n,l.followers2=s,e.props.history.push({pathname:"/result",state:{player1:a,player2:t,followers1:n,followers2:s},search:"?player1=".concat(a,"&player2=").concat(t)})},e}return Object(r.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.state,a=e.player1,t=e.player2,n=e.isPlayerOneLoading,l=e.isPlayerOneShowed,i=e.isPlayerTwoLoading,o=e.isPlayerTwoShowed,r=e.playerOneResult,c=e.playerTwoResult,m=e.isButtonOneDisabled,u=e.isButtonTwoDisabled,g=e.playerOneNotFound,p=e.playerTwoNotFound;return console.log("res",r),s.a.createElement("div",{className:"battle"},s.a.createElement("div",{className:"battle-title"},"Instructions"),s.a.createElement("div",{className:"battle-items"},s.a.createElement("div",{className:"battle-item"},s.a.createElement("div",{className:"battle-item-title"},"Enter two Github"),s.a.createElement("div",{className:"battle-item-icon"},s.a.createElement(d.a,{icon:S.c,className:"users-icon"}))),s.a.createElement("div",{className:"battle-item"},s.a.createElement("div",{className:"battle-item-title"},"Battle"),s.a.createElement("div",{className:"battle-item-icon"},s.a.createElement(d.a,{icon:S.a,className:"jet-icon"}))),s.a.createElement("div",{className:"battle-item"},s.a.createElement("div",{className:"battle-item-title"},"See The Winner"),s.a.createElement("div",{className:"battle-item-icon"},s.a.createElement(d.a,{icon:S.b,className:"trophy-icon"})))),s.a.createElement("div",{className:"battle-input"},s.a.createElement("div",{className:"battle-input-player"},s.a.createElement("div",{className:"battle-input-player-title"},"Player One"),s.a.createElement("form",null,!l&&!n&&s.a.createElement("div",{className:"battle-input-player-area"},s.a.createElement("input",{className:"input-item ".concat(g&&"not-found-input"),placeholder:"github username",type:"text",ref:"input1",value:a,onChange:this.handlePlayerChange.bind(this,"player1"),onSubmit:this.doSearch.bind(this,"player1")}),s.a.createElement("button",{onClick:this.doSearch.bind(this,"player1"),disabled:m,className:"submit ".concat(m?"disabled":"")},"Submit")),g&&!n&&s.a.createElement("div",{className:"not-found"},"\u62b1\u6b49\uff0c\u65e0\u6cd5\u627e\u5230\u8be5\u7528\u6237"),n&&s.a.createElement("div",{className:"loading"},"loading......"),l&&s.a.createElement("div",{className:"battle-input-result"},s.a.createElement("img",{className:"battle-input-result-image",src:r.avatar_url}),s.a.createElement("div",{className:"battle-input-result-name"},r.login),s.a.createElement("div",{className:"battle-input-result-clear",onClick:this.doClear.bind(this,"player1")},"X")))),s.a.createElement("div",{className:"battle-input-player"},s.a.createElement("div",{className:"battle-input-player-title"},"Player Two"),s.a.createElement("form",null,!o&&!i&&s.a.createElement("div",{className:"battle-input-player-area"},s.a.createElement("input",{className:"input-item ".concat(p&&"not-found-input"),placeholder:"github username",type:"text",ref:"input2",value:t,onChange:this.handlePlayerChange.bind(this,"player2"),onSubmit:this.doSearch.bind(this,"player2")}),s.a.createElement("button",{onClick:this.doSearch.bind(this,"player2"),disabled:u,className:"submit ".concat(u?"disabled":"")},"Submit")),p&&!i&&s.a.createElement("div",{className:"not-found"},"\u62b1\u6b49\uff0c\u65e0\u6cd5\u627e\u5230\u8be5\u7528\u6237"),i&&s.a.createElement("div",{className:"loading"},"loading......"),o&&s.a.createElement("div",{className:"battle-input-result"},s.a.createElement("img",{className:"battle-input-result-image",src:c.avatar_url}),s.a.createElement("div",{className:"battle-input-result-name"},c.login),s.a.createElement("div",{className:"battle-input-result-clear",onClick:this.doClear.bind(this,"player2")},"X"))))),s.a.createElement("div",{className:"battle-begin"},l&&o&&s.a.createElement("button",{onClick:this.doBattle.bind(this,a,t,r.followers,c.followers)},"BATTLE")))}}]),t}(n.Component),j=(t(155),function(e){Object(c.a)(t,e);var a=Object(m.a)(t);function t(){var e;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=a.call.apply(a,[this].concat(s))).state={player1:"",player2:"",winner:{},loser:{},isWrongPlayer:!1},e.doReset=function(){e.setState({player1:"",player2:"",winner:{},loser:{}},(function(){window.localStorage.removeItem("player1"),window.localStorage.removeItem("player2"),window.localStorage.removeItem("followers1"),window.localStorage.removeItem("followers2"),e.props.history.push("/battle")}))},e}return Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("\u54ce",this.props.location.search.split("?")[1].split("&"));var a=this.props.location.search.split("?")[1].split("&");a.length<2?this.setState({isWrongPlayer:!0},(function(){window.localStorage.removeItem("player1"),window.localStorage.removeItem("player2"),window.localStorage.removeItem("followers1"),window.localStorage.removeItem("followers2")})):this.setState({isWrongPlayer:!1});var t={};a.forEach((function(e){console.log("\u666e\u62c9\u59c6",e),t[e.split("=")[0]]=e.split("=")[1]})),console.log("\u666e\u96f7\u5384\u65af",t);var n=window.localStorage.player1;if(this.props.history.location.state||n){var s=this.props.history.location.state||window.localStorage,l=s.player1,i=s.player2;s.followers1>=s.followers2?(g.a.get("https://api.github.com/users/".concat(l)).then((function(a){console.log(a),e.setState({winner:a.data})})),g.a.get("https://api.github.com/users/".concat(i)).then((function(a){console.log(a),e.setState({loser:a.data})}))):(g.a.get("https://api.github.com/users/".concat(l)).then((function(a){console.log(a),e.setState({loser:a.data})})),g.a.get("https://api.github.com/users/".concat(i)).then((function(a){console.log(a),e.setState({winner:a.data})})))}else this.props.history.push({pathname:"/battle"})}},{key:"render",value:function(){var e=this.state,a=e.winner,t=e.loser,n=e.isWrongPlayer;return console.log("winner",a),console.log("loser",t),console.log("\u8363\u6069\u666e\u857e\u5c14",n),s.a.createElement("div",null,n?s.a.createElement("div",{className:"wrong-page"},s.a.createElement("div",null,s.a.createElement(d.a,{className:"wrong-page-icon",icon:E.e})),s.a.createElement("div",{className:"wrong-page-content"},"\u53c2\u6570\u9519\u8bef\uff0c\u8bf7",s.a.createElement("a",{onClick:this.doReset.bind(this)},"\u8fd4\u56de"))):s.a.createElement("div",{className:"result"},s.a.createElement("div",{className:"result-players"},s.a.createElement("div",{className:"result-player"},s.a.createElement("div",{className:"result-player-title"},"Winner"),s.a.createElement("div",{className:"result-player-avatar"},a&&s.a.createElement("img",{src:a.avatar_url})),s.a.createElement("div",{className:"result-player-name"},a&&a.login),s.a.createElement("div",{className:"result-player-score"},"score:1")),s.a.createElement("div",{className:"result-player"},s.a.createElement("div",{className:"result-player-title"},"Loser"),s.a.createElement("div",{className:"result-player-avatar"},t&&s.a.createElement("img",{src:t.avatar_url})),s.a.createElement("div",{className:"result-player-name"},t&&t.login),s.a.createElement("div",{className:"result-player-score"},"score:0"))),s.a.createElement("div",{className:"reset",onClick:this.doReset},"Reset")))}}]),t}(n.Component)),P=t(28),L=function(e){Object(c.a)(t,e);var a=Object(m.a)(t);function t(){var e;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=a.call.apply(a,[this].concat(s))).state={},e}return Object(r.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return s.a.createElement("div",{className:"git-app"},s.a.createElement(P.a,null,s.a.createElement("div",{className:"links"},s.a.createElement(P.b,{to:"/",className:"navigate"},"Popular"),s.a.createElement(P.b,{to:"/battle",className:"navigate"},"Battle")),s.a.createElement(h.c,null,s.a.createElement(h.a,{exact:!0,path:"/",component:w}),s.a.createElement(h.a,{path:"/battle",component:O}),s.a.createElement(h.a,{path:"/result",component:j}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},87:function(e,a,t){e.exports=t(156)},92:function(e,a,t){},93:function(e,a,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},94:function(e,a,t){}},[[87,1,2]]]);
//# sourceMappingURL=main.899857ee.chunk.js.map