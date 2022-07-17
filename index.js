// 首先封装 2 个工具函数
function $(selector) {
  // 返回第一个符合条件的元素
  return document.querySelector(selector);
}

function $$(selector) {
  // 返回所有符合条件的元素
  return document.querySelectorAll(selector);
}

// 获取 DOM 元素
var table = $(".table");
var currentScore = $(".currentScore");
var highestScore = $(".highestScore");
var time = $(".time");

// 整个表格是 4 行 3 列
var tr = 4;
var td = 3;

var score = 0; // 一开始的分数
var highScore = 0; // 最高分，一开始也是 0
var isGameOver = false; // 游戏是否结束
var stopTimer = null; // 定时器

// 时间
var millisec = 0;
var sec = 0;
var minute = 0;

/**
 * 游戏场景做一个初始化
 */
function init() {
  var tableContent = "";
  for (var i = 0; i < tr; i++) {
    tableContent += "<tr>";
    for (var j = 0; j < td; j++) {
      tableContent += "<td style='background:white;'></td>";
    }
    tableContent += "</tr>";
  }
  table.innerHTML += tableContent;
  // 接下来要随机的生成一个黑块
  for (var i = 0; i < $$(".table tr").length; i++) {
    $$(".table tr")[i].children[Math.floor(Math.random() * 3)].style.background = 'black';
  }
}


function scoreUP(){
    score++;
    if(score > highScore){
        highScore++;
        highestScore.innerHTML = "最高分数：" + highScore;
    }
    currentScore.innerHTML = "分数：" + score;
}
a
/**
 * 更新表格的行
 */
function updateTR(){
    // 核心思路：就是替换整个 table
    var trs = $$(".table tr"); // 获取所有的行
    var blackIndex = Math.floor(Math.random() * 3); // 0-2 的一个随机数
    var newTableContent = "<tr>";
     // 先生成新的一行
    for(var i=0;i<3;i++){
        // 如果是随机数摇出来的那一列，背景颜色就应该为黑色
        if(i == blackIndex){
            newTableContent += "<td style='background:black;'></td>";
        } else {
            newTableContent += "<td style='background:white;'></td>";
        }
    }
    
    // 遍历的时候除开最后一行
    for(var i=0;i<trs.length-1;i++){
        // 将最后一行的内容放到新的一行的最前面
        newTableContent += "<tr>" + trs[i].innerHTML + "</tr>";
    }

    // 更新整个 table
    table.innerHTML = newTableContent;
   
    // 更新分数
    scoreUP();
}
function updateTR(){
    var trs = $$('.table tr');
    var blackIndex = Math.floor(Math.random() * 3);
    var newTableContent = "<tr>";
    for(var i = 0 ; i < 3 ; i++){
        if(i == blackIndex){
            newTableContent += "<td style='background:black;'></td>";
        }
        else{
            newTableContent += "<td style='background:white;'></td>";
        }
    }
    for(var i=0;i<trs.length-1;i++){
        // 将最后一行的内容放到新的一行的最前面
        newTableContent += "<tr>" + trs[i].innerHTML + "</tr>";
    }
    table.innerHTML = newTableContent;
    scoreUP();
}


/**
 * 游戏结束
 */
function gameOver(){
    isGameOver = true;
    // 清除定时器
    clearInterval(stopTimer);
    if(window.confirm(`游戏结束，当前得分为 ${score}，是否要再次游戏？`)){
        // 进入此 if，说明用户要再玩一次
        // 重置游戏
        score = 0;
        currentScore.innerHTML = "分数：" + score;
        millisec = sec = minute = 0;
        $('.minute').innerHTML = "00";
        $('.sec').innerHTML = "00";
        $('.millisec').innerHTML = "00";
        stopTimer = null;
        isGameOver = false;
    }
}


function timer(){
    millisec++;
    if(millisec == 100){
        millisec = 0;
        sec++;
        if(sec == 60){
            sec = 0;
            minute++;
        }
    }
    $('.minute').innerHTML = minute < 10 ? "0" + minute : minute;
    $('.sec').innerHTML = sec < 10 ? "0" + sec : sec;
    $('.millisec').innerHTML = millisec;
}

/**
 * 绑定事件
 */
function bindEvent(){
    document.onkeydown = function(e){
        console.log(e.key);
        if(!isGameOver){
            // 进入此 if，说明当前游戏没有结束
            // 可以做后面的操作

            if(!stopTimer){
                stopTimer = setInterval(timer, 10);
            }


            var trs = $$('.table tr');

            // 判断按键的类型
            switch(e.key){   
                case 'a':
                case 'ArrowLeft':
                case 'A':{
                    // 用户按下的是 a 或者 A
                    if(trs[trs.length-1].children[0].style.background == 'black'){
                        // 游戏继续
                        updateTR();
                    } else {
                        // 游戏结束
                        gameOver();
                    }
                    break;
                }
                case 's':
                case 'ArrowDown':
                case 'ArrowUp':
                case 'S':{
                    // 用户按下的是 s 或者 S
                    if(trs[trs.length-1].children[1].style.background == 'black'){
                        // 游戏继续
                        updateTR();
                    } else {
                        // 游戏结束
                        gameOver();
                    }
                    break;
                }
                case 'd':
                case 'ArrowRight':
                case 'D':{
                    if(trs[trs.length-1].children[2].style.background == 'black'){
                        // 游戏继续
                        updateTR();
                    } else {
                        // 游戏结束
                        gameOver();
                    }
                    // 用户按下的是 d 或者 D
                    break;
                }
            }
        }
    }
}


// 程序的主函数
function main() {
  // 初始化
  init();
  // 绑定事件
  bindEvent();
}

main();
