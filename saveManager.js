// ブラウザのLocalStorageをハッキングしてデータを永続化するクラスだぜ！
export class SaveManager {
    constructor(saveKey = "rpg255_quantum_save") {
        this.saveKey = saveKey;
    }

    // プレイヤーの全ステータスを文字列（JSON）に圧縮して倉庫へブチ込む！
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
        console.log("【システム】オートセーブ成功。ローカル量子記憶を定着したぜ。");
    }

    // 倉庫からデータを取り出して、プレイヤーの肉体に再デプロイする！
    load(player) {
        const json = localStorage.getItem(this.saveKey);
        if (!json) return false; // セーブデータが「ゼロ」なら処理を飛ばすぜ

        try {
            const data = JSON.parse(json);
            player.lv = data.lv || 1;
            player.exp = data.exp || 0;
            player.str = data.str || 5;
            player.vit = data.vit || 5;
            player.bp = data.bp || 0;
            player.talent = data.talent || 1.0;
            player.currentJob = data.currentJob || "novice";
            console.log("【システム】過去の深淵からデータをサルベージしたぜ。");
            return true;
        } catch (e) {
            console.error("セーブデータの破損を検知したのぜ！", e);
            return false;
        }
    }
}