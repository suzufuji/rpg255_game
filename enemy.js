export class Enemy {
    constructor(name, hp, atk, expReward) {
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.atk = atk;
        this.expReward = expReward;
    }

    // ダメージを受けるメソッド
    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
    }

    // 生存確認
    isDead() {
        return this.hp <= 0;
    }
}