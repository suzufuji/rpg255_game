import { Player } from './Player.js';
import { JobManager } from './JobManager.js';
import { SaveManager } from './SaveManager.js'; // ★新メンバー合流！

const player = new Player();
const jobManager = new JobManager();
const saveManager = new SaveManager(); // ★インスタンス生成だぜ

function updateUI() {
    document.getElementById('display-lv').innerText = player.lv;
    document.getElementById('display-exp').innerText = player.exp;
    document.getElementById('display-str').innerText = player.str;
    document.getElementById('display-job').innerText = jobManager.jobTable[player.currentJob].name;
    document.getElementById('display-talent').innerText = player.talent.toFixed(1);
}

// ボタンアクション：戦闘訓練（押した瞬間にオートセーブ！）
window.trainPlayer = function() {
    player.gainExp(15);
    updateUI();
    saveManager.save(player); // ★経験値が入るたびに自動保存！
};

// ボタンアクション：転生実行
window.triggerReincarnate = function() {
    const success = jobManager.reincarnate(player);
    if (success) {
        alert("★魂の転生完了★ 才能が覚醒し、レベル1から再スタートだぜ！");
        updateUI();
        saveManager.save(player); // ★転生の偉業も即座に保存！
    }
};

// ボタンアクション：転職
window.becomeWarrior = function() {
    const jobName = jobManager.changeJob(player, "warrior");
    if (jobName) {
        alert(`ジョブチェンジ！ 【${jobName}】 になったぜ！`);
        updateUI();
        saveManager.save(player); // ★転職履歴も保存だ！
    }
};

// 起動時の処理（ブラウザが開いた瞬間に自動ロード！）
window.onload = () => {
    saveManager.load(player); // ★過去のデータを自動で読み込むのぜ！
    updateUI();
};