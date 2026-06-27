// 拡張子の .js は絶対に省略しちゃダメだぜ！
import { Player } from './Player.js';

// プレイヤーの実体（インスタンス）を生成
const player = new Player();

// 画面を更新する関数
function updateUI() {
    document.getElementById('display-lv').innerText = player.lv;
    document.getElementById('display-exp').innerText = player.exp;
    document.getElementById('display-str').innerText = player.str;
}

// ボタンを押したときの戦闘訓練処理
window.trainPlayer = function() {
    // 15Expを獲得させてみる
    const isLevelUp = player.gainExp(15);
    
    if (isLevelUp) {
        alert(`★レベルアップ演算成功★：Lv ${player.lv} になったぜ！`);
    }
    updateUI();
};

// 起動時に初期画面を表示
window.onload = () => {
    updateUI();
};