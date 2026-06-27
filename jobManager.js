// 職業と転生を司るマネージャークラスだぜ！
export class JobManager {
    constructor() {
        // 職業ごとの成長補正（STR, VIT）のデータテーブル
        this.jobTable = {
            novice: { name: "ノービス", strMod: 1.0, vitMod: 1.0 },
            warrior: { name: "戦士",    strMod: 1.5, vitMod: 1.2 },
            thief:   { name: "盗賊",    strMod: 1.1, vitMod: 0.9 }
        };
    }

    // プレイヤーの職業を切り替えるメソッド
    changeJob(player, newJobKey) {
        if (this.jobTable[newJobKey]) {
            player.currentJob = newJobKey;
            return this.jobTable[newJobKey].name;
        }
        return null;
    }

    // ★魂の転生システム演算★
    reincarnate(player) {
        if (player.lv < 10) {
            alert("転生するにはレベル10以上必要なのぜ！修行し直してきな！");
            return false;
        }

        // 転生ボーナス：才能（才能値）をアップさせ、レベルを1に戻す
        player.talent += 0.2; // 才能値が20%アップ！
        player.lv = 1;
        player.exp = 0;
        
        // ステータスを初期値に戻しつつ、才能値によるブーストをかける基礎値を計算
        player.str = Math.floor(5 * player.talent);
        player.vit = Math.floor(5 * player.talent);
        player.bp = 0;

        return true;
    }
}