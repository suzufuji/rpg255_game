import { Player } from './Player.js';
import { JobManager } from './JobManager.js';
import { SaveManager } from './SaveManager.js';

const player = new Player();
const jobManager = new JobManager();
const saveManager = new SaveManager();

// 画面を更新する関数
function updateUI() {
    // 念のため、要素が存在するかチェックしながら安全に書き換えるぜ
    if(document.getElementById('display-lv')) document.getElementById('display-lv').innerText = player.lv;
    if(document.getElementById('display-exp')) document.getElementById('display-exp').innerText = player.exp;
    if(document.getElementById('display-str')) document.getElementById('display-str').innerText = player.str;
    if(document.getElementById('display-job')) document.getElementById('display-job').innerText = jobManager.jobTable[player.currentJob].name;
    if(document.getElementById('display-talent')) document.getElementById('display-talent').innerText = player.talent.toFixed(1);
}

// ★最重要：HTMLからいつでも呼べるように、即座にwindowオブジェクトに登録するぜ！
window.trainPlayer = function() {
    console.log("【デバッグ】戦闘訓練ボタンが押されたのぜ！");
    player.gainExp(15);
    updateUI();
    saveManager.save(player); 
};

window.triggerReincarnate = function() {
    console.log("【デバッグ】転生ボタンが押されたのぜ！");
    const success = jobManager.reincarnate(player);
    if (success) {
        alert("★魂の転生完了★ 才能が覚醒し、レベル1から再スタートだぜ！");
        updateUI();
        saveManager.save(player);
    }
};

window.becomeWarrior = function() {
    console.log("【デバッグ】転職ボタンが押されたのぜ！");
    const jobName = jobManager.changeJob(player, "warrior");
    if (jobName) {
        alert(`ジョブチェンジ！ 【${jobName}】 になったぜ！`);
        updateUI();
        saveManager.save(player);
    }
};

// 起動時の初期化処理
function initGame() {
    console.log("【デバッグ】ゲーム起動シーケンス開始...");
    const hasSave = saveManager.load(player);
    if (hasSave) {
        console.log("【デバッグ】セーブデータの自動ロードに成功したのぜ！");
    } else {
        console.log("【デバッグ】セーブデータは存在しない（ゼロ）だぜ。");
    }
    updateUI();
}

// ページの読み込みが完了したら即座に初期化を実行！
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}