
monthTable= new Array(31,28,31,30,31,30,31,31,30,31,30,31); 
baseDate = new Date();
//祝日いじるときはフォーマットは以下のような感じで
//case 月-1:
//  Holiday( year, 月, 日, "祝日名<br>" );
//  Holiday( year, 月, calDate( 年, 月, 週, 曜日0(sun)..6(sat)), "祝日名<br>" );
//  break;
function setHolliday( year, month, len ){
    var i, tmp;
    
    //振替休日，国民の休日計算用領域確保
    holDate  = new Array(MAXEVENT);
    hi = 0;
    
    for(i=0; i<=len; i++){
      switch( month ){
      case  0:
        Holiday( year, 1, 1, "元日<br>" );
        Holiday( year, 1, calDate(year, 1, 2, 1), "成人の日<br>" ); //1月第2月曜日
        break;
      case  1:
        Holiday( year, 2, 11, "建国記念の日<br>" );
        break;
      case  2:
        Holiday( year, 3, vernal(year), "春分の日<br>" );
        break;
      case  3:
        Holiday( year, 4, 29, "昭和の日<br>" );
        break;
      case  4:
        Holiday( year, 5, 3, "憲法記念日<br>" );
        Holiday( year, 5, 4, "みどりの日<br>" );
        Holiday( year, 5, 5, "こどもの日<br>" );
        break;
      case  6:
        Holiday( year, 7, calDate(year, 7, 3, 1), "海の日<br>" ); //7月第3月曜日
        break;
      case  8:
        Holiday( year, 9, calDate(year, 9, 3, 1), "敬老の日<br>" ); //9月第3月曜日
        Holiday( year, 9, autumn(year), "秋分の日<br>" );
        break;
      case  9:
        Holiday( year, 10, calDate(year, 10, 2, 1), "スポーツの日<br>" ); //10月第2月曜日
        break;
      case 10:
        Holiday( year, 11,  3, "文化の日<br>" );
        Holiday( year, 11, 23, "勤労感謝の日<br>" );
        break;
      case 11:
        Holiday( year, 2, 23, "天皇誕生日<br>" );
        break;
      //case 12:
        //Holiday(2020, 7, 23, "海の日（オリンピック）<br>" );
        //break;
      //case 13:
        //Holiday(2020, 7, 24, "スポーツの日（オリンピック）<br>" );
        //break;//2020年はオリンピックの関係で祝日が変わっている
      }
      year = year + Math.floor((month+1)/12);
      month = (month+1)%12;
    }
    
    for(i=0; i<hi; i++){
      if( holDate[i].getDay() == 0 ){
         tmp = moveDate(holDate[i],1);
         i++;
         while( i<hi && 
                tmp.getDate()  == holDate[i].getDate()  &&
                tmp.getMonth() == holDate[i].getMonth() &&
                tmp.getYear()  == holDate[i].getYear()  ){
           tmp = moveDate(tmp,1);
           i++;
         }
         newEvent( tmp, HOLIDAY, "振替休日<br>" );
         i--;
      }
    }
    
    for(i=1; i<hi; i++){
      tmp = moveDate(holDate[i-1], 2);
      if( tmp.getDate()  == holDate[i].getDate()  &&
          tmp.getMonth() == holDate[i].getMonth() &&
          tmp.getYear()  == holDate[i].getYear()  ){
        tmp = tmp.getDay();
        if( tmp!=1 && tmp!=2 ){
          tmp = moveDate(holDate[i-1], 1);
          newEvent( tmp, HOLIDAY, "国民の休日<br>" );
        }
      }
    }
  }
  
  
  
  //year年month月 第week day曜日の計算
  function calDate( year, month, week, day ){
   var tmp, day1;
   
   tmp = new Date(year, month-1, 1);
   day1 = tmp.getDay();
   tmp = 1 + day - day1 + week*7;
   if( day - day1 >= 0 ) tmp = tmp - 7;
   return tmp;
  }
  
  // 春分の日を求める(2000～2099) 確実である保証はないと思う
  function vernal( year ){
   var tmp = Math.floor( 20.69115 + 0.242194 * (year - 2000)
                         - Math.floor((year - 2000)/4) );
   return tmp;
  }
  
  // 秋分の日を求める(2000～2099) 確実である保証はないと思う
  function autumn( year ){
   var tmp = Math.floor( 23.09 + 0.242194 * (year - 2000)
                         - Math.floor((year - 2000)/4) );
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
  
  function Holiday( year, month, date, name ){
    var i, tmp;
    month--;
    tmp = new Date( year, month, date );
    newEvent( tmp, HOLIDAY, name );
    
    //振替休日、国民の休日計算用データ登録
    if( hi >= MAXEVENT ) return;
    //インサーションソート
    for( i=hi-1;
         i>=0 && holDate[i].getMonth() == month && holDate[i].getDate() > date;
         i-- ){
      holDate[i+1]  =  holDate[i];
    }
    holDate[i+1]  =  tmp;
    hi++;
  }
  
  //dateを基準にdis日動かした日を返す
  function moveDate( date, dis ){
    var d, m, y;
    
    d = date.getDate();
    m = date.getMonth();
    y = date.getFullYear();
    if ( ((y%4)==0 && (y%100)!=0) || (y%400)==0 ) //うるうの判定(2000～)
          monthTable[1] = 29;
    else  monthTable[1] = 28;
    
    d = d + dis;
    while( d > monthTable[m]){
      d = d - monthTable[m];
      m++;
      if( m > 11 ){
        m=0;
        y++;
        if ( ((y%4)==0 && (y%100)!=0) || (y%400)==0 ) //うるうの判定(2000～)
              monthTable[1] = 29;
        else  monthTable[1] = 28;
      }
    }
    while( d < 0 ){
      m--;
      if( m < 0 ){
        m=11;
        y--;
        if ( ((y%4)==0 && (y%100)!=0) || (y%400)==0 ) //うるうの判定(2000～)
              monthTable[1] = 29;
        else  monthTable[1] = 28;
      }
      d = d + monthTable[m];
    }
    return (new Date(y,m,d));
  }
  
  //Main関数
  function showCalendar( argDate ){
    var i, j, k, tmpDate;
    
    tmp = argDate.getMonth() + 1;
    document.formSdlCal.dateInput.value = argDate.getFullYear() + "/" + tmp + "/" + argDate.getDate();
    
    //スケジュール登録用領域確保
    sdlDate  = new Array(MAXEVENT);
    sdlSel   = new Array(MAXEVENT);
    sdlName  = new Array(MAXEVENT);
    si = 0;
    
    //覚えとく
    gBaseDate = argDate;
    //argDateの週の日曜日から表示する
    tmpDate = moveDate( argDate, -argDate.getDay() );
    //"今日"を記憶
    toDate = new Date();
    
    //表示する可能性のある (SHOWWEEK/4)+2ヶ月先まで祝日を登録
    setHolliday( tmpDate.getFullYear(), tmpDate.getMonth(), Math.floor(SHOWWEEK/4)+2 );
    
    //スケジュールを登録
    setSchedules();
    
    
    //描画用コード開始
    docubuf = "<table border='3' cellspacing='0' " + DEFAULT + ">";
    //曜日
    docubuf += "<tr>";
    for(i=0; i<7; i++){
      docubuf += "<td align='center' ";
      if(i==0)      docubuf += SUN + "><strong>" + weekTable[i] + "<\/strong>";
      else if(i==6) docubuf += SAT + "><strong>" + weekTable[i] + "<\/strong>";
      else          docubuf += MON + "><strong>" + weekTable[i] + "<\/strong>";
      docubuf += "<\/td>";
    }
    docubuf += "<\/tr>";
    
    //日付
    for(i=0; i<SHOWWEEK; i++){
      docubuf += "<tr valign='top' height='" + HEIGHT + "'>";
      for(j=0; j<7; j++){
        docubuf += "<td width='" + WIDTH + "' ";
        
        //セル色は最後に登録したの優先．
        for(k=si-1; k>=0; k--)
          if( sdlDate[k].getDate()  == tmpDate.getDate()  &&
              sdlDate[k].getMonth() == tmpDate.getMonth() &&
              sdlDate[k].getYear()  == tmpDate.getYear() &&
              sdlSel[k] != ""
            )
            break;
        
        //セル色設定
        if( tmpDate.getDate()  == toDate.getDate()  &&
            tmpDate.getMonth() == toDate.getMonth() )
                          docubuf += TODAY     + ">";
                          //別に１年前の今日に色付けてもいいか
        else if( k >= 0 ) docubuf += sdlSel[k] + ">";
        else if(j==0)     docubuf += HOLIDAY   + ">";
        else if(j==6)     docubuf += SATURDAY  + ">";
        else              docubuf += USUALDAY  + ">";
        
        //日付表示
        docubuf += "<strong>";
        //年初めは年から表示
        if( tmpDate.getDate()==1 && tmpDate.getMonth()==0 )
          docubuf += tmpDate.getFullYear() + "/";
        //最初と月初めは月から表示
        if( tmpDate.getDate()==1 || (i==0 && j==0) )
          docubuf += tmpDate.getMonth()+1 + "/";
        //普通は日だけ表示
        docubuf += tmpDate.getDate() + "<\/strong><br>";
        
        //スケジュール埋め込み．複数あったら全部．登録順．
        for(k=0; k<si; k++)
          if( sdlDate[k].getDate()  == tmpDate.getDate()
              && sdlDate[k].getMonth() == tmpDate.getMonth()
              && sdlDate[k].getYear()  == tmpDate.getYear()
            )
            docubuf += sdlName[k];
        
        //日を進める
        tmpDate = moveDate( tmpDate, 1 );
        
        docubuf += "<\/td>";
      }
      docubuf += "<\/tr>";
    }
    docubuf += "<\/table>";
    
    divSdlCal.innerHTML = docubuf;
  
  }
