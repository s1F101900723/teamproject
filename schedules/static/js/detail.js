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




function calDate( year, month, week, day ){
   var tmp, day1;
   
   tmp = new Date(year, month-1, 1);
   day1 = tmp.getDay();
   tmp = 1 + day - day1 + week*7;
   if( day - day1 >= 0 ) tmp = tmp - 7;
   return tmp;
  }
  
function newEvent( date, sel, name ){
    if( si >= MAXEVENT ) return;
    sdlDate[si]  = date;
    sdlSel[si]   = sel;
    sdlName[si]  = name;
    si++;
  }
  
  function newSchedule( year, month, date, sel, name ){
    newEvent( new Date( year, month-1, date ), sel, name );
  }