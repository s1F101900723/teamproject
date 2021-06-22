/**
 * ページ初期処理.
 */
function initializePage() {
    // カレンダーの設定
    $('#calendar').fullCalendar({
        height: 550,
        lang: "ja",
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'listDay'
        },
        navLinks: true,
        timeFormat: 'HH:mm',
        selectable: true,
        selectHelper: true,
        eventSources: [{
            url: 'http://localhost:8080/getCalendar',
            dataType: 'json',
            async: false,
            type : 'GET',
            error: function() {
                $('#script-warning').show();
            }
        }],
        select: function(start, end, resource) {
        // 日付選択された際のイベント
 
            // ダイアログタイトル設定
            $("#dialogTitle").text("スケジュール登録");
 
            // タイトル初期化
            $("#inputTitle").val("");
            // 備考初期化
            $("#inputDescription").val("");
            // ボタン制御
            $("#registButton").show();
            $("#updateButton").hide();
            $("#deleteButton").hide();
 
            // ダイアログ表示
            $('#inputScheduleForm').on('show.bs.modal', function (event) {
                setTimeout(function(){
                    $('#inputTitle').focus();
                }, 500);
            }).modal("show");
 
            // 日付ピッカーの設定
            $('#inputYmdFrom').datetimepicker({locale: 'ja', format : 'YYYY年MM月DD日', useCurrent: false });
            $('#inputYmdTo').datetimepicker({locale: 'ja', format : 'YYYY年MM月DD日', useCurrent: false });
            $('.ymdHm').datetimepicker({
                locale: 'ja',
                format : 'YYYY年MM月DD日 HH時mm分'
            });
 
            // 開始終了が逆転しないように制御
            $("#inputYmdFrom").on("dp.change", function (e) {
                $('#inputYmdTo').data("DateTimePicker").minDate(e.date);
            });
            $("#inputYmdTo").on("dp.change", function (e) {
                $('#inputYmdFrom').data("DateTimePicker").maxDate(e.date);
            });
 
            if (this.name == "month") {
                $('.ymdHm').hide()
                $('.ymd').show()
 
                // 終日チェックボックス
                $('#allDayCheck').prop("checked", true);
                // 選択された日付をフォームにセット
                // FullCalendar の仕様で、終了が翌日の00:00になるため小細工
                var startYmd = moment(start);
                var endYmd = moment(end);
                if (endYmd.diff(startYmd, 'days') > 1) {
                    endYmd = endYmd.add(-1, "days");
                } else {
                    endYmd = startYmd;
                }
                $('#inputYmdFrom').val(startYmd.format("YYYY年MM月DD日"));
                $('#inputYmdFrom').data("DateTimePicker").date(startYmd.format("YYYY年MM月DD日"));
                $('#inputYmdTo').val(endYmd.format("YYYY年MM月DD日"));
                $('#inputYmdTo').data("DateTimePicker").date(endYmd.format("YYYY年MM月DD日"));
            } else {
                $('.ymdHm').show();
                $('.ymd').hide();
 
                // 終日チェックボックス
                $('#allDayCheck').prop("checked", false);
                var startYmd = moment(start);
                var endYmd = moment(end);
                $('#inputYmdHmFrom').val(startYmd.format("YYYY年MM月DD日 HH時mm分"));
                $('#inputYmdHmFrom').data("DateTimePicker").date(startYmd.format("YYYY年MM月DD日 HH時mm分"));
                $('#inputYmdHmTo').val(endYmd.format("YYYY年MM月DD日 HH時mm分"));
                $('#inputYmdHmTo').data("DateTimePicker").date(endYmd.format("YYYY年MM月DD日 HH時mm分"));
            }
 
        },
        eventClick: function(event) {
        // 予定クリック時のイベント
            $("#dialogTitle").text("スケジュール詳細");
 
            // ユーザーCD設定
            $("#userCd").val(event.user_cd);
            // スケジュールID設定
            $("#scheduleId").val(event.id);
            // タイトル設定
            $("#inputTitle").val(event.title);
            // 備考設定
            $("#inputDescription").val(event.description);
 
            // ボタン制御
            $("#registButton").hide();
            $("#updateButton").show();
            $("#deleteButton").show();
 
            // ダイアログ表示
            $('#inputScheduleForm').on('show.bs.modal', function (event) {
                setTimeout(function(){
                    $('#inputTitle').focus();
                }, 500);
            }).modal("show");
 
            // 日付ピッカーの設定
            $('#inputYmdFrom').datetimepicker({locale: 'ja', format : 'YYYY年MM月DD日', useCurrent: false });
            $('#inputYmdTo').datetimepicker({locale: 'ja', format : 'YYYY年MM月DD日', useCurrent: false });
            $('.ymdHm').datetimepicker({
                locale: 'ja',
                format : 'YYYY年MM月DD日 HH時mm分'
            });
 
            // 開始終了が逆転しないように制御
            $("#inputYmdFrom").on("dp.change", function (e) {
                $('#inputYmdTo').data("DateTimePicker").minDate(e.date);
            });
            $("#inputYmdTo").on("dp.change", function (e) {
                $('#inputYmdFrom').data("DateTimePicker").maxDate(e.date);
            });
 
            // 終日チェックボックス
            $('#allDayCheck').prop("checked", true);
 
            // 選択された日付をフォームにセット
            if (this.name == "month") {
                $('.ymdHm').hide()
                $('.ymd').show()
 
                // 終日チェックボックス
                $('#allDayCheck').prop("checked", true);
                // 選択された日付をフォームにセット
                // FullCalendar の仕様で、終了が翌日の00:00になるため小細工
                var startYmd = moment(start);
                var endYmd = moment(end);
                if (endYmd.diff(startYmd, 'days') > 1) {
                    endYmd = endYmd.add(-1, "days");
                } else {
                    endYmd = startYmd;
                }
                $('#inputYmdFrom').val(startYmd.format("YYYY年MM月DD日"));
                $('#inputYmdFrom').data("DateTimePicker").date(startYmd.format("YYYY年MM月DD日"));
                $('#inputYmdTo').val(endYmd.format("YYYY年MM月DD日"));
                $('#inputYmdTo').data("DateTimePicker").date(endYmd.format("YYYY年MM月DD日"));
            } else {
                $('.ymdHm').show();
                $('.ymd').hide();
 
                // 終日チェックボックス
                $('#allDayCheck').prop("checked", false);
                var startYmd = moment(event.start);
                var endYmd = moment(event.end);
                $('#inputYmdHmFrom').val(startYmd.format("YYYY年MM月DD日 HH時mm分"));
                $('#inputYmdHmFrom').data("DateTimePicker").date(startYmd.format("YYYY年MM月DD日 HH時mm分"));
                $('#inputYmdHmTo').val(endYmd.format("YYYY年MM月DD日 HH時mm分"));
                $('#inputYmdHmTo').data("DateTimePicker").date(endYmd.format("YYYY年MM月DD日 HH時mm分"));
            }
        },
        editable: true,
        eventLimit: true
    });
}
 
/**
 * 予定入力フォームの登録ボタンクリックイベント.
 */
function registSchedule() {
 
    // 開始終了日付の調整
    var startYmd = moment(formatNengappi($('#inputYmdFrom').val() + "00時00分00", 1));
    var endYmd = moment(formatNengappi($('#inputYmdTo').val() + "00時00分00", 1));
    var allDayCheck = $('#allDayCheck').prop("checked");
    if (!allDayCheck) {
        startYmd = moment(formatNengappi($('#inputYmdHmFrom').val() + "00", 1));
        endYmd = moment(formatNengappi($('#inputYmdHmTo').val() + "00", 1));
    }
    if (endYmd.diff(startYmd, 'days') > 0) {
        endYmd = endYmd.add(+1, "days");
    }
 
    // 非同期でサーバーにリクエストを送信
    var eventData = {
            title: $('#inputTitle').val(),
            start: startYmd.format("YYYY-MM-DDTHH:mm:ss"),
            end: endYmd.format("YYYY-MM-DDTHH:mm:ss"),
            allDay: allDayCheck,
            description: $('#inputDescription').val()
        };
    sendAjaxRequest("regist", eventData);
}
 
/**
 * 予定入力フォームの更新ボタンクリックイベント.
 */
function updateSchedule() {
 
    // 開始終了日付の調整
    var startYmd = moment(formatNengappi($('#inputYmdFrom').val() + "00時00分00", 1));
    var endYmd = moment(formatNengappi($('#inputYmdTo').val() + "00時00分00", 1));
    var allDayCheck = $('#allDayCheck').prop("checked");
    if (!allDayCheck) {
        startYmd = moment(formatNengappi($('#inputYmdHmFrom').val(), 1));
        endYmd = moment(formatNengappi($('#inputYmdHmTo').val(), 1));
    }
    if (endYmd.diff(startYmd, 'days') > 0) {
        endYmd = endYmd.add(+1, "days");
    }
 
    // 非同期でサーバーにリクエストを送信
    var eventData = {
            user_cd: $("#userCd").val(),
            id: $("#scheduleId").val(),
            title: $('#inputTitle').val(),
            start: startYmd.format("YYYY-MM-DDTHH:mm:ss"),
            end: endYmd.format("YYYY-MM-DDTHH:mm:ss"),
            allDay: allDayCheck,
            description: $('#inputDescription').val()
        };
    sendAjaxRequest("update", eventData);
}
 
/**
 * 予定入力フォームの削除ボタンクリックイベント.
 */
function deleteSchedule() {
 
    // リクエストパラメータの設定
    var eventData = {
            user_cd: $("#userCd").val(),
            id: $("#scheduleId").val(),
        };
 
    sendAjaxRequest("delete", eventData);
}
 
/**
 * リクエスト送信.
 */
function sendAjaxRequest(method, eventData) {
 
    var cal = $("#calendar").fullCalendar("getView");
    eventData.searchStart = cal.start;
    eventData.searchEnd = cal.end;
 
    // 処理名を設定
    var methodName = "登録";
    if (method == "update") {
        methodName = "更新"
    } else if (method == "delete") {
        methodName = "削除"
    }
 
    $.ajax({
        url: "http://localhost:8080/" + method,
        type: "POST",
        data: JSON.stringify(eventData),
        success: function(jsonResponse) {
            // カレンダー再描画
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar').fullCalendar('renderEvents', $.parseJSON(jsonResponse) )
            $('#inputScheduleForm').modal('hide');
            alert("予定を" + methodName + "しました。");
        },
        error: function() {
            alert("予定の" + methodName + "に失敗しました。");
        }
    });
    $('#calendar').fullCalendar('unselect');
}
 
/**
 * 終日チェックボックスクリックイベント.
 * 入力フィールドの表示切替と設定された日時の同期を実施.
 *
 */
function allDayCheckClick(element) {
    if (element && element.checked) {
 
        // 日付に変換して設定
        var startYmdHm = formatNengappi($("#inputYmdHmFrom").val() + "00", 1);
        var endYmdHm = formatNengappi($("#inputYmdHmTo").val() + "00", 1);
        var startYmd = moment(startYmdHm);
        var endYmd = moment(endYmdHm);
        $("#inputYmdFrom").val(startYmd.format("YYYY年MM月DD日"));
        $("#inputYmdTo").val(endYmd.format("YYYY年MM月DD日"));
 
        // 表示切替
        $('.ymdHm').hide();
        $('.ymd').show();
 
    } else {
        // 日時に変換して設定
        var startYmd = formatNengappi($("#inputYmdFrom").val(), 0);
        var endYmd = formatNengappi($("#inputYmdTo").val(), 0);
        var startYmdHm = moment(startYmd + "T" + moment().format("HH") + ":00:00");
        var endYmdHm = moment(startYmd + "T" + moment().format("HH") + ":00:00").add(1, "hours");
        $("#inputYmdHmFrom").val(startYmdHm.format("YYYY年MM月DD日 HH時mm分"));
        $("#inputYmdHmTo").val(endYmdHm.format("YYYY年MM月DD日 HH時mm分"));
 
        // 表示切替
        $('.ymdHm').show();
        $('.ymd').hide();
    }
}
 
/**
 * 年月日の形式を変換する.
 */
function formatNengappi(nengappi, flg) {
    var ret = nengappi.replace("年", "-").replace("月", "-").replace("日", "");
    if (flg == 1){
        ret = nengappi.replace("年", "-").replace("月", "-").replace("日", "T").replace("時",":").replace("分",":").replace(" ","");
    }
    return ret;
}