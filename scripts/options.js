const DEFAULT_TEMPLATES = [
	{
		'CATEGORY':'タグ',
		'TEMPLATES':[
			{
				'TITLE':'info',
				'TEMPLATE':'[info][/info]'
			},
			{
				'TITLE':'code',
				'TEMPLATE':'[code][/code]'
			}
		]
	},
	{
		'CATEGORY':'遅刻',
		'TEMPLATES':[
			{
				'TITLE':'私用で1時間',
				'TEMPLATE':'使用により1時間ほど遅刻致します。\n宜しくお願い致します。'
			}
		]
	},
	{
		'CATEGORY':'挨拶',
		'TEMPLATES':[
			{
				'TITLE':'おはようございます',
				'TEMPLATE':'おはようございます'
			}
		]
	},
	{
		'CATEGORY':'カテゴリー',
		'TEMPLATES':[
			{
				'TITLE':'ここに表示タイトル',
				'TEMPLATE':'ここに中身'
			}
		]
	}
]

const CATEGORY_NUM = 4;

function save_options() {
	var templates = [];
	for(var i=0;i<CATEGORY_NUM;i++){
		templates.push({
			'CATEGORY':'',
			'TEMPLATES':[]
		});
	}
	$(".category").each(function(i, input) {
		templates[i].CATEGORY = $(input).val();
	});
	for (var i=0;i<CATEGORY_NUM;i++) {
		$(".title" + i).each(function(j, title) {
			if ($(title).val() || $(title).next().val()) {
				templates[i].TEMPLATES.push({'TITLE':$(title).val(),'TEMPLATE':$(title).next().val()});
			}
		});
	}
	chrome.storage.sync.set({
		"templates": templates,
	}, function() {
		console.log(templates);
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
	});
}

function restore_options() {
	chrome.storage.sync.get(["templates"], function(model) {
    console.log(model.templates == undefined);
    if (model.templates == undefined) {
    	model.templates = DEFAULT_TEMPLATES;
    }
		$.each(model.templates, function(i, value) {
			$(".category").eq(i).val(value.CATEGORY);
		});
		for (var i=0;i<CATEGORY_NUM;i++) {
			$.each(model.templates[i].TEMPLATES, function(j, value) {
				$('.add[data-col-num^=' + i + ']').before('<input type="text" class="title' + i + ' form-control" placeholder="title" style="margin-bottom:5px;" value="' + value.TITLE + '" /><textarea style="height:60px" class="form-control" placeholder="template">' + value.TEMPLATE + '</textarea><br>');
			});
		}
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
$(".save").click(function(){
	save_options();
});



$(".add").click(function(){
	$(this).before('<input type="text" class="title' + $(this).attr('data-col-num') + ' form-control" placeholder="title" style="margin-bottom:5px;" /><textarea style="height:60px" id="" class="form-control" placeholder="template"></textarea><br>');
});
