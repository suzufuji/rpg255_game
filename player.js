export class Player {
    constructor() {
        this.lv = 1;
        this.exp = 0;
        this.str = 5;
        this.vit = 5;
        this.bp = 0;
        this.talent = 1.0;
        this.currentJob = "novice"; 
    }

    // 経験値を獲得するメソッド
    gainExp(amount) {
        this.exp += amount;
        // レベルアップの簡易ロジック（累計ではなく、100溜まるごとにLvアップ）
        while (this.exp >= 100) {
            this.exp -= 100;
            this.lv++;
            this.str += 2; // レベルアップで力が2上がるぜ！
            console.log(`【システム】レベルアップ！ Lv${this.lv} になったのぜ！`);
        }
    }

    // ★今回のバグの息の根を止める新設メソッドだぜ！
    // 現状はまだプレイヤーにHPの概念を作っていないから、
    // 「常にfalse（絶対に死んでないぜ！）」と返して、戦闘を最後まで続行させるのぜ！
    isDead() {
        return false;
    }
}