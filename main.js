import { Player } from './player.js';
import { JobManager } from './jobManager.js';
import { SaveManager } from './saveManager.js';
import { Enemy } from './enemy.js';
import { BattleManager } from './battleManager.js';

const player = new Player();
const jobManager = new JobManager();
const saveManager = new SaveManager();
const battleManager = new BattleManager();

// 画面を更新する関数
function updateUI() {
    if(document.getElementById('display-lv')) document.getElementById('display-lv').innerText = player.lv;
    if(document.getElementById('display-exp')) document.getElementById('display-exp').innerText = player.exp;
    if(document.getElementById('display-str')) document.getElementById('display-str').innerText = player.str;
    if(document.getElementById('display-talent')) document.getElementById('display-talent').innerText = player.talent.toFixed(1);
    if(document.getElementById('display-hp')) document.getElementById('display-hp').innerText = player.hp;
    if(document.getElementById('display-max-hp')) document.getElementById('display-max-hp').innerText = player.maxHp;
    if(document.getElementById('display-gold')) document.getElementById('display-gold').innerText = player.gold;
    if(document.getElementById('display-job')) {
        const jobInfo = jobManager.jobTable[player.currentJob];
        if (jobInfo) {
            document.getElementById('display-job').innerText = jobInfo.name;
        } else {
            document.getElementById('display-job').innerText = "ノービス";
            player.currentJob = "novice";
        }
    }
}

// 起動時の初期化＆イベントリスナー設置
function initGame() {
    console.log("【システム】量子バトルシーケンス開始...");
    
    saveManager.load(player);
    updateUI();

    // ボタン①：戦闘訓練
    const trainBtn = document.getElementById('btn-train');
    if (trainBtn) {
        trainBtn.addEventListener('click', () => {
            player.gainExp(15);
            updateUI();
            saveManager.save(player);
        });
    }

    // ★新設ボタン②：エリア探索（本物の戦闘モード！）
    const exploreBtn = document.getElementById('btn-explore');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            // プレイヤーのレベルに応じた敵をランダム生成
            const enemy = battleManager.generateEnemy(player.lv);
            // 決闘実行！
            const result = battleManager.executeBattle(player, enemy);
            
            // 画面のステータスを更新（経験値が入っている可能性があるため）
            updateUI();
            saveManager.save(player);

            // 戦闘ログをHTMLの専用エリアに流し込む（改行コードを<br>に変換）
            const logConsole = document.getElementById('log-console');
            if (logConsole) {
                logConsole.innerHTML = result.log.join('<br>');
                // ログが増えたら自動で一番下までスクロールさせるスマホ向け親切設計だぜ
                logConsole.scrollTop = logConsole.scrollHeight;
            }
        });
    }

    // ボタン③：転職
    const warriorBtn = document.getElementById('btn-warrior');
    if (warriorBtn) {
        warriorBtn.addEventListener('click', () => {
            const jobName = jobManager.changeJob(player, "warrior");
            if (jobName) {
                alert(`ジョブチェンジ！ 【${jobName}】 になったぜ！`);
                updateUI();
                saveManager.save(player);
            }
        });
    }

    // ボタン④：転生
    const reincarnateBtn = document.getElementById('btn-reincarnate');
    if (reincarnateBtn) {
        reincarnateBtn.addEventListener('click', () => {
            const success = jobManager.reincarnate(player);
            if (success) {
                alert("★魂の転生完了★ レベル1から再スタートだぜ！");
                updateUI();
                saveManager.save(player);
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}