import { Player } from './player.js';
import { JobManager } from './jobManager.js';
import { SaveManager } from './saveManager.js';
import { BattleManager } from './battleManager.js';

const player = new Player();
const jobManager = new JobManager();
const saveManager = new SaveManager();
const battleManager = new BattleManager();

// 現在エンカウントしている敵のデータを保持する戦闘用グローバル変数だぜ
let currentEnemy = null;
let currentTurn = 0;

function updateUI() {
    if(document.getElementById('display-lv')) document.getElementById('display-lv').innerText = player.lv;
    if(document.getElementById('display-exp')) document.getElementById('display-exp').innerText = player.exp;
    if(document.getElementById('display-str')) document.getElementById('display-str').innerText = player.str;
    if(document.getElementById('display-talent')) document.getElementById('display-talent').innerText = player.talent.toFixed(1);
    
    if(document.getElementById('display-job')) {
        const jobInfo = jobManager.jobTable[player.currentJob];
        document.getElementById('display-job').innerText = jobInfo ? jobInfo.name : "ノービス";
    }
    if(document.getElementById('display-gold')) document.getElementById('display-gold').innerText = player.gold;
}

// HPバーと戦闘画面のグラフィックを更新する関数
function updateBattleUI() {
    if (!currentEnemy) return;

    // 1. ターン数表示の更新
    document.getElementById('battle-turn').innerText = `TURN ${currentTurn}`;

    // 2. プレイヤーのHPバー縮小計算 (％)
    const playerHpPercent = (player.hp / player.maxHp) * 100;
    document.getElementById('player-hp-bar').style.width = `${playerHpPercent}%`;

    // 3. 敵のHPバー縮小計算 (％)
    const enemyHpPercent = (currentEnemy.hp / currentEnemy.maxHp) * 100;
    document.getElementById('enemy-hp-bar').style.width = `${enemyHpPercent}%`;
}

// ログコンソールにテキストを1行追加する関数
function appendLog(text) {
    const logConsole = document.getElementById('log-console');
    if (logConsole) {
        logConsole.innerHTML += `<br>${text}`;
        logConsole.scrollTop = logConsole.scrollHeight;
    }
}

function initGame() {
    console.log("【システム】グラフィック量子バトル回路接続完了...");
    saveManager.load(player);
    updateUI();

    const trainBtn = document.getElementById('btn-train');
    const exploreBtn = document.getElementById('btn-explore');
    const attackBtn = document.getElementById('btn-attack');
    const stage = document.getElementById('battle-stage');

    // ボタン①：戦闘訓練
    if (trainBtn) {
        trainBtn.addEventListener('click', () => {
            player.gainExp(15);
            updateUI();
            saveManager.save(player);
            appendLog("【訓練】素振りを繰り返して体が引き締まった！（+15 Exp）");
        });
    }

    // ⚔️ボタン②：敵のエリアへ出撃（エンカウント）
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            if (player.isDead()) {
                alert("HPが0だぜ！レベルアップするか宿屋（今後実装）で回復しな！");
                return;
            }

            // 敵を出現させて戦闘モードに突入！
            currentEnemy = battleManager.generateEnemy(player.lv);
            currentTurn = 1;

            document.getElementById('enemy-name-plate').innerText = currentEnemy.name;
            document.getElementById('log-console').innerHTML = `【遭遇】${currentEnemy.name}が前方に立ち塞がった！`;
            
            // 画面のレイアウトを「戦闘中」に切り替えるのぜ！
            stage.style.display = "block";
            attackBtn.style.display = "block";
            exploreBtn.style.display = "none";
            trainBtn.style.display = "none";

            updateBattleUI();
        });
    }

    // 💥ボタン③：1ターン進める（攻撃実行とCSSアニメーションの融合！）
    if (attackBtn) {
        attackBtn.addEventListener('click', () => {
            if (!currentEnemy || player.isDead() || currentEnemy.isDead()) return;

            const charPlayer = document.getElementById('char-player');
            const charEnemy = document.getElementById('char-enemy');

            // --- プレイヤーターン ---
            // 1. 突進アニメーション発火！
            charPlayer.classList.add('attack-left');
            
            // 2. 敵にダメージ適用
            const pDamage = player.str;
            currentEnemy.takeDamage(pDamage);
            appendLog(`▼ ターン ${currentTurn}: プレイヤーの突撃！ ${currentEnemy.name}に ${pDamage} のダメージ！`);
            
            // 0.1秒後に突進から元の位置に戻るマニアックな処理だぜ
            setTimeout(() => { charPlayer.classList.remove('attack-left'); }, 100);

            // 敵の撃破チェック
            if (currentEnemy.isDead()) {
                updateBattleUI();
                appendLog(`★【勝利】${currentEnemy.name}を完全に粉砕した！`);
                
                player.gainExp(currentEnemy.expReward);
                const goldReward = currentEnemy.goldReward || 5;
                player.gold += goldReward;
                
                updateUI();
                saveManager.save(player);

                // 戦闘終了のクリーンアップ処理だぜ
                setTimeout(() => {
                    alert(`戦闘勝利！ ${currentEnemy.expReward}Exp と ${goldReward}G を獲得！`);
                    stage.style.display = "none";
                    attackBtn.style.display = "none";
                    exploreBtn.style.display = "block";
                    trainBtn.style.display = "block";
                    currentEnemy = null;
                }, 500);
                return;
            }

            // --- エネミーターン（敵が生きていればカウンター攻撃！） ---
            setTimeout(() => {
                if (!currentEnemy) return;
                
                // 1. 敵の突進アニメーション発火！
                charEnemy.classList.add('attack-right');
                
                // 2. プレイヤーに被ダメージ適用
                const eDamage = currentEnemy.atk;
                player.damage(eDamage);
                appendLog(`▲ ターン ${currentTurn}: ${currentEnemy.name}の猛反撃！ ${eDamage} の大ダメージ！`);
                
                setTimeout(() => { charEnemy.classList.remove('attack-right'); }, 100);
                updateBattleUI();

                // プレイヤーの死亡チェック
                if (player.isDead()) {
                    appendLog(`💀【敗北】プレイヤーは力尽き、量子世界に散った……`);
                    saveManager.save(player);
                    setTimeout(() => {
                        alert("敗北したのぜ……。修行し直してくるんだな！");
                        stage.style.display = "none";
                        attackBtn.style.display = "none";
                        exploreBtn.style.display = "block";
                        trainBtn.style.display = "block";
                        currentEnemy = null;
                    }, 500);
                }
                
                currentTurn++;
                document.getElementById('battle-turn').innerText = `TURN ${currentTurn}`;
            }, 300); // プレイヤーの攻撃が終わった0.3秒後に敵が殴ってくる時間差演出だぜ！
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}