import { Enemy } from './enemy.js';

export class BattleManager {
    constructor() {
        this.battleLog = [];
    }

    generateEnemy(playerLv) {
        const dice = Math.random();
        if (dice < 0.6) {
            // 名前, HP, 攻撃力, 経験値, 報酬ゴールド
            return new Enemy("デジタルスライム", 15 + playerLv * 2, 3 + playerLv, 10, 5);
        } else if (dice < 0.9) {
            return new Enemy("サイバーゴブリン", 30 + playerLv * 4, 6 + playerLv * 2, 25, 20);
        } else {
            return new Enemy("プロトタイプ・ドラゴン", 100 + playerLv * 10, 15 + playerLv * 5, 100, 100);
        }
    }

    executeBattle(player, enemy) {
        this.battleLog = [];
        
        // ★もし最初からプレイヤーのHPが0なら戦闘を拒否する防壁
        if (player.isDead()) {
            this.battleLog.push("【警告】HPが0のまま探索するのは無謀だぜ！宿屋で休むのぜ！");
            return { success: false, log: this.battleLog };
        }

        this.battleLog.push(`【遭遇】${enemy.name}が現れた！`);

        let turn = 1;
        // どちらかが倒れるか、20ターン経つまで激突！
        while (!player.isDead() && !enemy.isDead() && turn <= 20) {
            // 1. プレイヤーの先制攻撃
            const pDamage = player.str;
            enemy.takeDamage(pDamage);
            this.battleLog.push(`ターン${turn}: プレイヤーの攻撃！ ${enemy.name}に ${pDamage} のダメージ！`);

            if (enemy.isDead()) {
                this.battleLog.push(`【勝利】${enemy.name}を撃破した！`);
                player.gainExp(enemy.expReward);
                
                // ★ゴールド報酬の獲得（enemy側にも変数を追加したぜ）
                const goldReward = enemy.goldReward || 5; 
                player.gold += goldReward;
                this.battleLog.push(`【報酬】${enemy.expReward}のExpと、${goldReward}のGを手に入れた！`);
                return { success: true, log: this.battleLog };
            }

            // 2. 敵の猛烈な反撃！プレイヤーのHPを実際に減らすぜ！
            const eDamage = enemy.atk;
            player.damage(eDamage);
            this.battleLog.push(`ターン${turn}: ${enemy.name}の反撃！ プレイヤーは ${eDamage} のダメージを受けた！`);

            if (player.isDead()) {
                this.battleLog.push(`【敗北】プレイヤーは力尽きてしまった……無念だぜ。`);
                return { success: false, log: this.battleLog };
            }
            
            turn++;
        }

        if (turn > 20) {
            this.battleLog.push(`【時間切れ】決着がつかず、敵は霧の彼方に消え去った。`);
        }

        return { success: false, log: this.battleLog };
    }
}