export class Player {
    constructor() {
        this.lv = 1;
        this.exp = 0;
        this.str = 5;
        this.vit = 5; // 体力（これが最大HPの基準になるぜ）
        this.bp = 0;
        this.talent = 1.0;
        this.currentJob = "novice"; 
        
        // ★新設：初期状態の生命力と資金
        this.maxHp = this.vit * 10; // 最大HPはVITの10倍！
        this.hp = this.maxHp;       // 現在のHP
        this.gold = 0;              // 獲得したゴールド
    }

    // 経験値を獲得するメソッド
    gainExp(amount) {
        this.exp += amount;
        while (this.exp >= 100) {
            this.exp -= 100;
            this.lv++;
            this.str += 2;
            this.vit += 1; // レベルアップで耐久力も成長！
            this.maxHp = this.vit * 10; // 最大HPを再計算
            this.hp = this.maxHp;       // レベルアップ時は全回復の親切設計だぜ！
            console.log(`【システム】レベルアップ！ Lv${this.lv} になったのぜ！`);
        }
    }

    // ★新設：ダメージを受ける窓口
    damage(amount) {
        this.hp = Math.max(0, this.hp - amount);
    }

    // ★新設：宿屋や休息での回復窓口
    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    // ★本物の生存確認ロジックへ進化！
    isDead() {
        return this.hp <= 0;
    }
}