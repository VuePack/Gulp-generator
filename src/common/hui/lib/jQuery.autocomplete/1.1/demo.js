$(function(){
	var url = "http://www.72xuan.com/suggest/search/casesSuggest?callback=?";
	var searchURL = "/cases/search.action";
	var isClicked = false;
	var defauntkeyword = "请输入关键词";
	$("#search_text").autocomplete(url, {
		scroll:false,
		selectFirst:false,
		delay:5,
		dataType:"jsonp",//ajax的跨域，必须用jsonp,jQuery自动会加一个callback参数,后台要获得callback参数，并写回来
			//自定义提示
		tips:function(data) {
				//这里的data是跟formatItem 的data是一样的，所以格式也一样
			return data.pinyin;
		},
		parse: function(data) {
			if(data==null||typeof(data)=="undefined"||data.length==0){
				return null;
			}

			data = data.keylist;
			var rows = [];
			for(var i=0; i<data.length; i++){
				rows[rows.length] = {
					data:data[i],//这里data是对象数组，格式[{key:aa,address:nn},{key:aa,address:nn}]
					value:data[i].key,
					result:data[i].key
				};
			}
			return rows;
		},
		extraParams: {query:function (){return $('#search_text').val();}},
		formatItem: function(data, i, total) {  //就是下拉框显示的内容，可以有格式之类的
			return "<p>"+data.key+"</p>";
		},
		formatMatch: function(data, i, total) {  //要匹配的内容
			return data.key;
		},
		formatResult: function(data) {  //最终在inputText里显示的内容，就是以后要搜索的内容
			return data.key;
		}
	}).result(function(e, data) {
		if(!isClicked) {
			startSearch();
		}
	});

	$("#search_text").keydown(function(e) {
		if(e.keyCode==13){
			e.preventDefault();
			if(!isClicked) {
				startSearch();
			}
		}
	});
	$("#search_button").click(function() {
		startSearch();
		return false;
	});
	function startSearch() {
		var keys = trim($("#search_text").val());
		keys = trim(keys);
		if(keys==defauntkeyword||keys==''){
			window.location.href='/pic/lists-10-w11/';
		}else{
			window.location.href="/pic/lists-10-w11-k"+encodeURIComponent(keys)+"/";
		}
	}
	function trim(m){
		while((m.length>0)&&(m.charAt(0)==' ')){
			m = m.substring(1, m.length);
		}
		while((m.length>0)&&(m.charAt(m.length-1)==' ')){
			m = m.substring(0, m.length-1);
		}
		return m;
	}
});