

import Phaser from 'phaser';



class BaseScene extends Phaser.Scene {

constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCentre = [config.width/2, config.height/2];
}



create() {
    this.add.image(0,0, 'sky').setOrigin(0);
  // this.scene.start('PlayScene');
  if(this.config.canGoBack) {
    const backButton = this.add.image(this.config.width-10, this.config.height-10, 'back').setOrigin(1).setScale(2).setInteractive()

    backButton.on('pointerup', ()=> {
        this.scene.start('MenuScene');
    })
  }
} 

createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    menu.forEach(menuItem => {
        const menuPosition = [this.screenCentre[0], this.screenCentre[1]+ lastMenuPositionY];
        menuItem.textGO=this.add.text(...menuPosition, menuItem.text, {fontsize: '32px', fill: '#fFF'}).setOrigin(0.5);
        lastMenuPositionY += 42;
       setupMenuEvents(menuItem);
    })
}

}

export default BaseScene;