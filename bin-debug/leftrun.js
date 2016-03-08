/**
 * Created by Administrator on 2016/3/3.
 */
var leftrun = (function (_super) {
    __extends(leftrun, _super);
    function leftrun(tyname) {
        _super.call(this);
        this.n = tyname;
        this.createMovieclip();
    }
    var d = __define,c=leftrun;p=c.prototype;
    p.createMovieclip = function () {
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("preload");
        var data = RES.getRes("HuojiMc_json");
        var txtr = RES.getRes("HuojiMc_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.n = new egret.MovieClip(mcFactory.generateMovieClipData("leftRun"));
    };
    return leftrun;
})(egret.MovieClip);
egret.registerClass(leftrun,"leftrun");
