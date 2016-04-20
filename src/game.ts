
import SoundChannel = egret.SoundChannel;
import Tween = egret.Tween;
/**
 * Created by Administrator on 2016/2/28.
 */
class game extends egret.DisplayObjectContainer {
     logo:egret.Bitmap;
     homepage:egret.Bitmap;
     start:egret.Bitmap;
     title:egret.Bitmap;
     label:egret.TextField;
     bg :egret.Bitmap;
    sound:egret.Sound;
     leftRun :egret.MovieClip;
     lang :egret.MovieClip;
     zhengzha:egret.MovieClip;
     obj:egret.MovieClip;
     draggedObject:egret.MovieClip;
     left:egret.MovieClip;
     hpMc:egret.MovieClip;
     a:number=1;
    N:number=0;
     m:boolean=true;
    d:boolean=true;
     name:string;
    timer:egret.Timer;
    panel:egret.Bitmap;
    wText:egret.MovieClip;
    wText1:egret.MovieClip;
    wText2:egret.MovieClip;
    wText3:egret.MovieClip;
    wText4:egret.MovieClip;
    mcFactory:egret.MovieClipDataFactory;
    replay:egret.Bitmap;
    sprite:egret.Sprite;
    text:egret.TextField;
    yang:egret.Bitmap;
    tw
    private loadingView:LoadingUI;

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
}
    public onAddToStage(event:egret.Event):void{
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onLaodComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }
    private onLaodComplete():void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onLaodComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loading",1);
        RES.loadGroup("preload",0);

    }
    private onResourceComplete(event:RES.ResourceEvent):void{
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this. onResourceComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createBitmap();
        }
    }
    private onResourceLoadError(event:RES.ResourceEvent):void{
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceComplete(event);
    }

    private onResourceProgress(event:RES.ResourceEvent):void{
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private createBitmap():void{
       this.homepage =new egret.Bitmap();
        this.homepage.texture = RES.getRes("homepage_jpg");
        this.addChild(this.homepage);
        this.logo = new egret.Bitmap();
        this.logo.texture=RES.getRes("logo_png");
        this.addChild(this.logo);
        this.logo.y=200;
        this.logo.x=75;
        this. title =new egret.Bitmap();
        this.title.texture=RES.getRes("title_png");
        this.title.x=55;
        this.title.y=100;
        this.addChild(this.title);
       this. start=new egret.Bitmap();
        this.start.texture=RES.getRes("start_btn_png");
        this.start.y=550;
        this.start.x=70;
        this.addChild(this.start);
        this.start.touchEnabled=true;
        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        this.label =new egret.TextField();
        this.label.text="将小羊拖拽到下方的羊圈中";
        this.addChild(this.label);
        this.label.width=360;
        this.label.textAlign=egret.HorizontalAlign.RIGHT;
        this.label.y=500;
        this.label.strokeColor =0x00CC33;
        this.label.stroke=3;
        this.label.size=24;

    }
   private onTouch():void{
       this.start.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        this.removeChildren()
        this.onStart();
       this.getsound();
    }
    private onStart():void{
        this.getbitmap();
        this.onTimer();
        this.createHpmc();
        this.createWtext();
    }


    private getsound():void{
        this.sound=new egret.Sound;
       this.sound=RES.getRes("bg_mp3");
        this.sound.play();

    }
    private createHpmc():void{
        var data = RES.getRes("hpMc_json");
        var txtr = RES.getRes("hpMc_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        if(this.a==1){
            this.hpMc = new egret.MovieClip(mcFactory.generateMovieClipData("hp3"));
        }else if(this.a==2){
            this.hpMc = new egret.MovieClip(mcFactory.generateMovieClipData("hp2"));
        }else if(this.a==3){
            this.hpMc = new egret.MovieClip(mcFactory.generateMovieClipData("hp1"));
        }else {
            this.hpMc = new egret.MovieClip(mcFactory.generateMovieClipData("hp0"));
        }
        this.addChild(this.hpMc);
        this.hpMc.x=80;
        this.hpMc.y=20;
    }


    private getbitmap():void{
        this.bg = new egret.Bitmap();
        this.bg.texture=RES.getRes("bg_jpg");
        this.addChild(this.bg);
        this.panel=new egret.Bitmap();
        this.panel.texture=RES.getRes("panel_png");
        this.addChild(this.panel);
        this.panel.y=25;
        this.panel.x=320;
        this.replay=new egret.Bitmap();
        this.replay.texture=RES.getRes("replay_btn_png");
        this.replay.x=160;
        this.replay.y=450;
    }

    private createWtext(){
        var ww:number=25;
        var data = RES.getRes("wText_json");
        var txtr = RES.getRes("wText_png");
        this.mcFactory = new egret.MovieClipDataFactory( data, txtr );
        var  b = Math.floor( this.N/ 1E4).toString();
        this.wText = new egret.MovieClip(this.mcFactory.generateMovieClipData("n"+b.toString()));
        this.addChild(this.wText);
        this.wText.y=73;
        this.wText.x=335;
        this.wText.scaleX=this.wText.scaleY=0.5;
         b = Math.floor(this.N / 1E3).toString();
        b = b.slice(b.length - 1, b.length);
        this.wText1 = new egret.MovieClip(this.mcFactory.generateMovieClipData("n"+b.toString()));
        this.addChild(this.wText1);
        this.wText1.y=73;
        this.wText1.x=this.wText.x+ww;
        this.wText1.scaleX=this.wText1.scaleY=0.5;
        b = Math.floor(this.N / 100).toString();
        b = b.slice(b.length - 1, b.length);
        this.wText2 = new egret.MovieClip(this.mcFactory.generateMovieClipData("n"+b.toString()));
        this.addChild(this.wText2);
        this.wText2.y=73;
        this.wText2.x=this.wText1.x+ww;
        this.wText2.scaleX=this.wText2.scaleY=0.5;
        b = Math.floor(this.N/ 10).toString();
        b = b.slice(b.length - 1, b.length);
        this.wText3 = new egret.MovieClip(this.mcFactory.generateMovieClipData("n"+b.toString()));
        this.addChild(this.wText3);
        this.wText3.y=73;
        this.wText3.x=this.wText2.x+ww;
        this.wText3.scaleX=this.wText3.scaleY=0.5;
        b = this.N.toString();
        b = b.slice(b.length - 1, b.length);
        this.wText4 = new egret.MovieClip(this.mcFactory.generateMovieClipData("n"+b.toString()));
        this.addChild(this.wText4);
        this.wText4.y=73;
        this.wText4.x=this.wText3.x+ww;
        this.wText4.scaleX=this.wText4.scaleY=0.5;


    }

    private onTimer():void{
      this.timer  = new egret.Timer(700,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timeFunc,this);
        this.timer.start();

    }

    private timeFunc():void{
        if(this.m){
            this.nub();
        }
    }
    private nub():void{
        console.log("nub");
        var arry :number[]=[200,280,350,420,490,];
        var n:number=Math.floor(Math.random()*5);
        var h:number=arry[n];
        this.animation(h);

    }

    private animation(n:number):void{
        var data = RES.getRes("HuojiMc_json");
        var txtr = RES.getRes("HuojiMc_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        this.leftRun = new egret.MovieClip(mcFactory.generateMovieClipData("leftRun"));
        console.log(n);
        this.addChild(this.leftRun);
        this.leftRun.play(-1);
        this.leftRun.x=400;
        this.leftRun.y = n;
        this.leftRun.touchEnabled=true;
        this.leftRun.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.starMove,this);
        var t:number=Math.floor(Math.random()*10);
        var time:number=1200;
        if(this.N>50){
            time=1000;
        }
        if(this.N>100){
            time=800;
        }
        if(this.N>200){
            time=500;
        }
        if(t > 4 && t < 7){
            this.leftRun.name="02";
           this.tw = egret.Tween.get(this.leftRun);
            this.tw.to({x:30,y:n},time+500).call(this.langAnimation,this,[this.leftRun]);
        }else if(t>7){
            this.leftRun.name="03";
            this.tw = egret.Tween.get(this.leftRun);
            this.tw.to({x:30,y:n},time).call(this.langAnimation,this,[this.leftRun]);
            this.tw.pause()
        }else {
            this.leftRun.name="01";
             this.tw = egret.Tween.get(this.leftRun);
            this.tw.to({x:30,y:n},time+1000).call(this.langAnimation,this,[this.leftRun]);
        }

    }

    private starMove(e:egret.TouchEvent):void{
        this.leftRun.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMove,this);
        this.obj = e.currentTarget;
        this.name=this.obj.name;
        console.log(this.name);
        this.removeChild(this.obj);
        var data = RES.getRes("HuojiMc_json");
        var txtr = RES.getRes("HuojiMc_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        this.zhengzha = new egret.MovieClip(mcFactory.generateMovieClipData("zhengzha"));
        this.addChild(this.zhengzha);
        this.zhengzha.play(-1);
        this.zhengzha.y=this.obj.y;
        this.zhengzha.x=this.obj.x+25;
        this.zhengzha.touchEnabled=true;
        this.zhengzha.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMove,this)
        this.zhengzha.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
        this.zhengzha.addEventListener(egret.TouchEvent.TOUCH_END,this.stopMove,this);

    }
    private onMove(e:egret.TouchEvent):void {
        console.log(1);
        this.draggedObject = e.currentTarget;
        this.draggedObject.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMove,this);
        this.addChild(this.draggedObject);//放在显示列表最前面
        this.draggedObject.x = e.stageX;
        this.draggedObject.y = e.stageY;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);

    }
    private Move(e:egret.TouchEvent):void{

        this.draggedObject.x=e.stageX;
        this.draggedObject.y=e.stageY;
    }


    private stopMove(e:egret.TouchEvent):void{
        this.zhengzha.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMove,this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
       var stopObject=e.currentTarget;
       this.removeChild(stopObject);
        if(stopObject.y>520){
            this.yang=new egret.Bitmap();
            this.yang.texture=RES.getRes("yang_png");
            this.addChild(this.yang);
            this.yang.x=e.stageX;
            this.yang.y=e.stageY;
            this.num();
        }else {
            var data = RES.getRes("HuojiMc_json");
            var txtr = RES.getRes("HuojiMc_png");
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
            this.left = new egret.MovieClip(mcFactory.generateMovieClipData("leftRun"));
            this.addChild(this.left);
            this.left.play(-1);
            this.addChild(this.left);
            this.left.y= e.stageY;
            this.left.x= e.stageX;
            this.left.touchEnabled=true;
            this.left.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.starMove,this);
            var tw = egret.Tween.get(this.left);
            if(this.left.x > 200){
                tw.to({x:30,y:this.left.y},2000).call(this.langAnimation,this,[this.left]);
            }else {
                tw.to({x:30,y:this.left.y},1000).call(this.langAnimation,this,[this.left]);
           }
        }

    }

    private num():void{
        if(this.name=="01"){
           this.N = this.N + 2;
        }else if(this.name=="02"){
           this.N =this.N + 3;
        }else {
            this.N = this.N + 4;
        }
        this.removeChild(this.wText4);
        this.removeChild(this.wText3);
        this.removeChild(this.wText2);
        this.removeChild(this.wText1);
        this.removeChild(this.wText);
        this.createWtext();
    }


    private langAnimation(n:any):void{
        if(n.parent){
            n.parent.removeChild(n);
            var h:number = n.y;
            var data = RES.getRes("lang_json");
            var tetr = RES.getRes("lang_png");
            var mcFactory : egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,tetr);
            this.lang = new egret.MovieClip(mcFactory.generateMovieClipData("lang"));
            this.addChild(this.lang);
            this.lang.y=h;
            this.lang.play(1);
            this.lang.x=100;
            var tw = egret.Tween.get(this.lang);
            tw.to({x:-100,y:h},700)
            this.a++;
            this.createHpmc();
            if(this.a > 3){
                if(this.left){
                    this.left.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.starMove,this);
                }
                if(this.leftRun){
                    this.leftRun.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.starMove,this);
                }
                if(this.getChildByName("01")){
                    this.getChildByName("01").removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.starMove,this);
                }

                if(this.getChildByName("02")){
                    this.getChildByName("02").removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.starMove,this);
                }
               if(this.getChildByName("03")){
                    this.getChildByName("03").removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.starMove,this);
               }

                this.m=false;
                setTimeout(egret.Tween.removeAllTweens,600);
               this.sound.play().stop();
                this.createSprite();
            }
        }
    }

    private createSprite():void{
        this.sprite=new egret.Sprite();
        this.sprite.graphics.beginFill(0x000000);
        this.sprite.graphics.drawRect(0,0,480,700);
        this.sprite.graphics.endFill();
        this.addChild(this.sprite);
        this.sprite.alpha=0.5;
        this.text=new egret.TextField();
        this.text.text="你拯救小羊获得了"+this.N+"分!"
        this.text.textAlign=egret.HorizontalAlign.RIGHT;
        this.text.width=360;
        this.text.y=150;
        this.text.size=24;
        this.text.stroke=3;
        this.text.strokeColor=0x000000;
        this.text.bold=true;
        this.addChild(this.text);
        this.addChild(this.replay);
        this.replay.touchEnabled=true;
        this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.Play,this);


    }
    private Play():void{
        this.replay.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.Play,this);
        this.removeEventListener(egret.TimerEvent.TIMER,this.timeFunc,this);
        this.N=0;
        this.a=1;
        this.m=true;
        this.d=false;
        this.timer.stop();
        this.removeChildren();
        this.onStart();

    }

}