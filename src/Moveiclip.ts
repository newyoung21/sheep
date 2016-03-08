/**
 * Created by Administrator on 2016/3/3.
 */
class Moveiclip extends egret.DisplayObjectContainer {
    private sheep:egret.MovieClip;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.on,this);
    }


    private on():void{
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onLaodComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }
    private onLaodComplete():void{
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceComplete,this);
        RES.loadGroup("preload");
    }
    private onResourceComplete():void{
     // this.LetfRun1();
    }

}