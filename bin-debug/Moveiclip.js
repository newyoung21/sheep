/**
 * Created by Administrator on 2016/3/3.
 */
var Moveiclip = (function (_super) {
    __extends(Moveiclip, _super);
    function Moveiclip() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.on, this);
    }
    var d = __define,c=Moveiclip;p=c.prototype;
    p.on = function () {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLaodComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    p.onLaodComplete = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceComplete, this);
        RES.loadGroup("preload");
    };
    p.onResourceComplete = function () {
        // this.LetfRun1();
    };
    return Moveiclip;
})(egret.DisplayObjectContainer);
egret.registerClass(Moveiclip,"Moveiclip");
