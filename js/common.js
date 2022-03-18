const baseURL="http://192.168.1.145:3344/";
var indexUrl=window.location.search;
// var localTicket=localStorage.getItem("Ticket");
var localTicket="";
var localMaxTicket=localStorage.getItem("MaxTicket");
//以下程序为单点登录使用
var outerSearch="";
if(indexUrl.indexOf("ticket=")>=0){
	outerSearch=indexUrl.split("ticket=")[1];
	if(outerSearch.indexOf("&")>0){
		outerSearch=outerSearch.split("&")[0]
	}
	localStorage.setItem('Ticket',outerSearch);
}
localTicket=localStorage.getItem("Ticket");
var TicketStr="Bearer "+localTicket;
var timeSpace=15;//最短时间间隔
var loginInfo="";
var ticketStr1="";
var reg = new RegExp( '-' , "g" );
var reg1 = new RegExp( '_' , "g" );
var newTicketStr1 ="";
if(localStorage.getItem("Ticket")!=null&&localStorage.getItem("Ticket")!=""&&localStorage.getItem("Ticket").indexOf(".")>=0){
	ticketStr1=localStorage.getItem("Ticket").split(".")[1];
	newTicketStr1 = ticketStr1.replace( reg , '+' ).replace(reg1, '/' );
	loginInfo=eval("("+window.atob(newTicketStr1)+")");
}
//var loginUserName=window.atob()
//访问token
function getToken(){
	var companyID=document.querySelector("#companyID").value;
	var username=document.querySelector("#account").value;
	var password=document.querySelector("#password").value;
	mui.ajax(baseURL+'/api/users/gettokenbyjwt/v2',{
		data:{
			companyid:companyID,
			username:username,
			password:password
		},
		dataType:'json',
		type:'get',
		timeout:10000,
		success:function(data){
			if(data.code=="0"){
				var Ticket=data.data.Ticket;
				var MaxTicket=data.data.MaxTicket;
				localStorage.setItem('Ticket',Ticket);
				localStorage.setItem('MaxTicket',MaxTicket);
				localStorage.setItem('username',username);
			}
		},error:function(xhr){
			
		}
	})
}
//获取长token
function getMaxTicket(){
	var maxTicket="Bearer "+localStorage.getItem("MaxTicket");
	mui.ajax(baseURL+'/api/users/gettokenbyTicket/v2',{
		data:{
			token:maxTicket
		},
		dataType:'json',
		type:'get',
		timeout:10000,
		success:function(data){
			if(data.code=="0"){
				return "0"
			}else if(data.code=="30007"){
				window.location.href="../login.html";
			}else{
				window.location.href="../login.html";
			}
		},error:function(xhr){
			
		}
	})
}
function selectTimerBar(start,end,startTime,EndTime){
	var sliderStr='<div class="rangeSlider"><div class="sliderbar"></div><div class="sliderNum"><span><ins style="margin-left:-3.5px;">7</ins></span><span><ins  style="margin-left:-3.5px;">8</ins></span><span><ins  style="margin-left:-3.5px;">9</ins></span><span><ins style="margin-left:-7px;">10</ins></span><span><ins style="margin-left:-7px;">11</ins></span><span><ins style="margin-left:-7px;">12</ins></span><span><ins style="margin-left:-7px;">13</ins></span><span><ins style="margin-left:-7px;">14</ins></span><span><ins style="margin-left:-7px;">15</ins></span><span><ins style="margin-left:-7px;">16</ins></span><span><ins style="margin-left:-7px;">17</ins></span><span><ins style="margin-left:-7px;">18</ins></span><span><ins style="margin-left:-7px;">19</ins></span><span><ins style="margin-left:-7px;">20</ins></span><span><ins style="margin-left:-7px;">21</ins></span><span><ins style="margin-left:-7px;">22</ins></span><span><ins style="margin-left:-7px;">23</ins></span></div></div>';
	var tempArr=sliderStr.split("<span");
	var thum=100/(tempArr.length-2);
	for(var i=0;i<tempArr.length-1;i++){
		tempArr[i]=tempArr[i]+"<span style='left:"+thum*i+"%'";
	}
	return tempArr.join("");
}
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
function addZero(str, len, ch) { //补全的变量、补全后的长度、用什么来补
	str = String(str);
	var i = -1;
	if (!ch && ch !== 0) ch = ' ';
	len = len - str.length;
	while (++i < len) {
		str = ch + str;
	}
	return str > 0 ? str : "00";
}
//获取时间差,并返回秒数
function getTimeSec(str1,str2){
	//var date=new Date();
	var str=new Date(str2).getTime()-new Date(str1).getTime();
	return str;
}
//给一个元素设置多个属性
function setAttribute(el,attrs){
	for(var key in attrs){
		el.setAttribute(key,attrs[key]);
	}
}
//获取兄弟节点
function siblings(elm) {
	var a = [];
	var p = elm.parentNode.children;
	for(var i =0,pl= p.length;i<pl;i++) {
	if(p[i] !== elm) a.push(p[i]);
	}
	return a;
}
function backFunc(){
	// var nowSrc=document.getElementsByClassName("activeIframe")[0].getAttribute("src");
	// var nowSrcArr=[];
	// if(nowSrc.indexOf("/")>0){
	// 	nowSrcArr=nowSrc.split("/");	
	// }
	var childIframe=document.getElementsByClassName("activeIframe")[0].contentWindow.location.href;
	if(childIframe.indexOf("room/room.html")>=0){
		var roomEscape=document.getElementsByClassName("activeIframe")[0].contentWindow.document.getElementsByTagName("iframe")[0].contentWindow.document.location.href;
		//会议室及预定页面有较多iframe嵌套，需要单独处理；
		window.location.href="index.html";
		return;
	}
	//其他页面的返回按钮
	if(childIframe.indexOf("room/roomList.html")<0&&childIframe.indexOf("mine/mine.html")<0&&childIframe.indexOf("message/message.html")<0){
		history.back();
	}
}
