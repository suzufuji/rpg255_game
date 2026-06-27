// exportをつけて外部から呼べるようにするぜ
export class Player {
    constructor() {
        this.lv = 1;
        this.exp = 0;
        this.str = 5;
        this.vit = 5;
        this.bp = 0;
        this.talent = 1.0; // 才能値
    }

    // 経験値獲得とレベルアップのロジックをプレイヤー自身に持たせる
    gainExp(amount) {
        this.exp += amount;
        let leveledUp = false;
        
        // レベルアップのループ演算（省略なしだぜ）
        while (this.exp >= this.lv * 10) {
            this.exp -= this.lv * 10;
            this.lv++;
            this.bp += 3;
            this.str += 1;
            this.vit += 1;
            leveledUp = true;
        }
        return leveledUp; // レベルアップしたらtrueを返す
    }
}