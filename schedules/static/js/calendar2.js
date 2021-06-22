MAXEVENT = 50;  
SHOWWEEK = 6;   

WIDTH    = "80px";  
HEIGHT   = "60px";  
DEFAULT  = "bordercolor='#cc8066' bgcolor='#fff9f6' style='font-size:9pt; color:#993333;'";

TODAY    = "bgcolor='#e6fff6'";  
HOLIDAY  = "bgcolor='#ffe6e6'";  
SATURDAY = "bgcolor='#e6e6ff'";  
USUALDAY = ""; 
SUN = "bgcolor='#f9d9c3' style='color:#ff0000;'"; 
SAT = "bgcolor='#f9d9c3' style='color:#0000ff;'"; 
MON = "bgcolor='#f9d9c3'"; 

weekTable = new Array("sun","mon","tue","wed","thu","fri","sat");  
monthTable= new Array(31,28,31,30,31,30,31,31,30,31,30,31); 
/*** スケジュール登録 notice ***
予定はsetSchedules()に書く．
newSchedule( 年，月, 日，"td セルオプション", "予定" );
・日
－calDate( 年, 月, 週, 曜日0(sun)..6(sat))を使えば，
第n×曜日 形式の指定も可能です．
・td セルオプション <td ここ>
－指定なしは""で．
－悪いがフォントカラーはスタイルシート("style='color:white'")で指定してくれ．
－同じ日に複数登録したりすると効かない事があるから注意．
・"予定"
－HTMLタグ使えます．
・祝日とあわせてMAXEVENT件までスケジュールを設定可能
*** notice スケジュール登録 ***/
function setSchedules(){
  
  //サンプル予定
  newSchedule( 2004, 10, 1, "", "飲み会<br>" );
  newSchedule( 2004, 10, 8, "", "<div style='background-color:yellow;'><font color='red'>映画</font></div>" );
  newSchedule( 2004, 12, 21, "", "<span style='background-color:#00ffff; color:blue'>卒業式</span><br>" );
  newSchedule( 2004, 12, calDate(2004, 12, 3, 0), "", "掃除当番" ); 
  newSchedule( 2004, 10, 13,
               "bgcolor='#ff6699' style='color:white'",
               "ちーちゃん誕生日<br>" );
  newSchedule( 2004, 12, 7,
               "style='background-color:ff6633; color:white'",
               "誕生日<br>" );
}




