/*jquery:true */
(function () {
    'use strict';

    const CATEGORY_NUM = 4;
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
    var chatText = '';

    chrome.storage.sync.get(["templates"], function(model) {
        if (model.templates == undefined) {
            model.templates = DEFAULT_TEMPLATES;
        }
        for (var i=0;i<CATEGORY_NUM;i++) {
            var selectItem = '<li><select class="template-box form-control" data-index="' + i + '">';
            $.each(model.templates[i].TEMPLATES, function(j, value) {
                if (value) {
                    selectItem += '<option value="' + value.TEMPLATE + '">' + value.TITLE + '</option>';
                }
            });
            selectItem += '<option class="template-item" value="" selected>' + model.templates[i].CATEGORY + '</option></select></li>';
            $('#_chatSendTool').append(selectItem);
        }


        $('.template-box').click(function(){
            chatText = $('#_chatText').val();
        });

        $('.template-box').change(function(){
            $('#_chatText').val($(this).val() + '\n' + chatText);
            $(this).val("");
        });
    });
}());
