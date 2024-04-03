

import BaseScene from "./BaseScene";



class ScoreScene extends BaseScene {

constructor(config) {
    super('ScoreScene',{...config, canGoBack: true});

}



create() {
    super.create();
  // this.scene.start('PlayScene');
 // this.createMenu(this.menu,  this.setupMenuEvents.bind(this));
 const bestScore = localStorage.getItem('bestScore');
 this.add.text(...this.screenCentre, `Score: ${bestScore || 0}`, {fontsize: '32px', fill: '#fFF'}).setOrigin(0.5);
}


}   

export default ScoreScene;