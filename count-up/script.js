$(function () {
  // カウントアップする数字
  let countNum;

  // カードのシャッフル用配列
  let cardArray;

  // 経過時間
  let time;

  // タイマー用の変数
  let timer;

  // 関数の実行
  init();

  // 初期設定用の関数init
  function init() {
    // 変数、配列の初期化
    countNum = 1;
    cardArray = [];
    time = 0;

    // cardArray = [0, 1, 2, ... 24]に
    for (let i = 0; i <= 24; i++) {
      cardArray.push(i);
    }

    // cardArrayをシャッフルする
    for (let i = 0; i < cardArray.length; i++) {
      // i番目の要素をtmpNum（一時的な数字）に保存
      let tmpNum = cardArray[i];
      // 0 ~ 24の乱数を生成
      let r = Math.floor(Math.random() * cardArray.length);

      cardArray[i] = cardArray[r];
      cardArray[r] = tmpNum;
    }

    // #numbersの中身を空にする
    $("#numbers").html("");

    // #numbersの中にカードを生成
    for (let i = 0; i <= 24; i++) {
      let cardNum = cardArray[i] + 1;
      $("#numbers").prepend("<div>" + cardNum + "</div>");
    }
  }

  // スタートボタンをクリック
  $("#startScene button").click(function() {
    // スタート画面を非表示に
    $("#startScene").hide();

    // カードを選択
    $("#numbers div").click(function() {
      let num = $(this).html();

      // 変数numと変数countNumを比較
      if (num == countNum) {
        // 正解時の処理
        // カードのスタイル変更
        $(this).addClass("hit");
        // 数字を1増やす
        countNum++;

        // 変数countNumが26であれば、ゲームクリア
        if (countNum == 26) {
          // タイマー停止
          clearInterval(timer);

          // プレイ時間の表示
          $("#startScene p").html("Your Record : " + $("#timer span").html());

          // ボタンのテキスト変更
          $("#startScene button").html("PLAY AGAIN");

          // スタート画面を表示
          $("#startScene").show();

          // プレイ時間の比較
          if ($("#record span").html() - $("#timer span").html() > 0 || $("#record span").html() == 0) {
            // 記録の更新
            $("#record span").html($("#timer span").html());
          }

          // 初期設定の関数initを実行
          init();
        }
      }
    });

    // タイマー開始
    timerFunc();
    timer = setInterval(timerFunc, 10);
  });

  // タイマーの関数（プレイ時間計測用）
  function timerFunc() {
    // 変数timeの値を更新して、#timer spanに表示
    time++;
    $("#timer span").html(time);
  }
});