// 2つの異なるクラスファイルをインポートして統合するぜ！
import { Player } from './Player.js';
import { JobManager } from './JobManager.js';

const player = new Player();
const jobManager = new JobManager();

function updateUI() {
    document.getElementById('display-lv').innerText = player.lv;
    document.getElementById('display-exp').innerText = player.exp;
    document.getElementById('display-str').innerText = player.str;
    // 現在の職業名を表示
    document.getElementById('display-job').innerText = jobManager.jobTable[player.currentJob].name;
    // 才能値を表示（小数点第1位まで）
    document.getElementById('display-talent').innerText = player.talent.toFixed(1);
}

// ボタンアクション：戦闘訓練
window.trainPlayer = function() {
    player.gainExp(15);
    updateUI();
};

// ボタンアクション：転生実行
window.triggerReincarnate = function() {
    const success = jobManager.reincarnate(player);
    if (success) {
        alert("★魂の転生完了★ 才能が覚醒し、レベル1から再スタートだぜ！");
    }
    updateUI();
};

// ボタンアクション：転職（戦士へ）
window.becomeWarrior = function() {
    const jobName = jobManager.changeJob(player, "warrior");
    if (jobName) {
        alert(`ジョブチェンジ！ 【${jobName}】 になったぜ！`);
    }
    updateUI();
};

window.onload = () => {
    updateUI();
};