// 今後の拡張を見据えたセーブマネージャークラスのプロトタイプだぜ！
export class SaveManager {
    constructor(saveKey = "rpg255_class_save") {
        this.saveKey = saveKey;
    }

    // プレイヤーのオブジェクトをJSONという文字列に変換して倉庫にブチ込む！
    save(player) {
        const saveData = {
            lv: player.lv,
            exp: player.exp,
            str: player.str,
            vit: player.vit,
            bp: player.bp,
            talent: player.talent,
            currentJob: player.currentJob
        };
        localStorage.setItem(this.saveKey, JSON.stringify(saveData));
        console.log("【システム】量子記憶の定着に成功したのぜ。");
    }

    // 倉庫から文字列を取り出して、プレイヤーの数値に復元（デプロイ）する！
    load(player) {
        const json = localStorage.getItem(this.saveKey);
        if (!json) return false;

        const data = JSON.parse(json);
        player.lv = data.lv;
        player.exp = data.exp;
        player.str = data.str;
        player.vit = data.vit;
        player.bp = data.bp;
        player.talent = data.talent;
        player.currentJob = data.currentJob;
        
        console.log("【システム】過去の深淵からデータをサルベージしたぜ。");
        return true;
    }
}