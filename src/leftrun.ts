/**
 * Created by Administrator on 2016/3/3.
 */
class leftrun extends egret.MovieClip{
     n:egret.MovieClip;
    public constructor(tyname:egret.MovieClip) {
        super();
        this.n=tyname;
        this.createMovieclip();
    }
    private createMovieclip(){
        RES.loadConfig("resource/default.res.json","resource/");
        RES.loadGroup("preload");
        var data = RES.getRes("HuojiMc_json");
        var txtr = RES.getRes("HuojiMc_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        this.n=new egret.MovieClip(mcFactory.generateMovieClipData("leftRun"));
    }

}
