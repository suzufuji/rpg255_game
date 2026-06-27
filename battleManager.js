import { Enemy } from './enemy.js';

export class BattleManager {
    constructor() {
        this.battleLog = [];
    }

    // 敵をランダムで生成する（ファクトリー関数）
    generateEnemy(playerLv) {
        const dice = Math.random();
        if (dice < 0.6) {
            // 60%の確率でスライム
            return new Enemy("デジタルスライム", 15 + playerLv * 2, 3 + playerLv, 10);
        } else if (dice < 0.9) {
            // 30%の確率でゴブリン
            return new Enemy("サイバーゴブリン", 30 + playerLv * 4, 6 + playerLv * 2, 25);
        } else {
            // 10%の確率でボス
            return new Enemy("プロトタイプ・ドラゴン", 100 + playerLv * 10, 15 + playerLv * 5, 100);
        }
    }

    // 決闘開始メソッド（決着がつくまで一瞬で処理するぜ）
    executeBattle(player, enemy) {
        this.battleLog = [];
        this.battleLog.push(`【遭遇】${enemy.name}が現れた！`);

        let turn = 1;
        while (!player.isDead() && !enemy.isDead() && turn <= 20) {
            // 1. プレイヤーの攻撃（STRがそのままダメージ）
            const pDamage = player.str;
            enemy.takeDamage(pDamage);
            this.battleLog.push(`ターン${turn}: プレイヤーの攻撃！ ${enemy.name}に ${pDamage} のダメージ！`);

            if (enemy.isDead()) {
                this.battleLog.push(`【勝利】${enemy.name}を撃破した！`);
                player.gainExp(enemy.expReward);
                return { success: true, log: this.battleLog };
            }

            // 2. 敵の攻撃（簡易的にプレイヤーのHPを減らす処理。今回はまだプレイヤーにHPを定義していないから、後ほど拡張するか、今はログだけに留めるぜ）
            // ※今回は一旦、敵の攻撃は「空振り」か「防いだ」ことにしてログだけ流すぜ！
            this.battleLog.push(`ターン${turn}: ${enemy.name}の反撃！ プレイヤーは身軽に身をかわした！`);
            
            turn++;
        }

        return { success: false, log: this.battleLog };
    }
}