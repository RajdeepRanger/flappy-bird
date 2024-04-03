

import BaseScene from "./BaseScene";



class PauseScene extends BaseScene {

constructor(config) {
    super('PauseScene', config);
   // this.config = config;
   this.menu = [
    { scene: 'PlayScene', text: 'Continue' },
    { scene: 'Exit', text: 'Exit' }
   


   ]
}



create() {
    super.create();
  // this.scene.start('PlayScene');
  this.createMenu(this.menu,  this.setupMenuEvents.bind(this));
}

setupMenuEvents(menuItem) {
const textGO = menuItem.textGO;
textGO.setInteractive();
textGO.on('pointerover', ()=> {
    textGO.setStyle({fontsize: '32px', fill: '#fF0'});
})
textGO.on('pointerout', ()=> {
    textGO.setStyle({fontsize: '32px', fill: '#fFf'});
})

textGO.on('pointerup', ()=> {
    menuItem.scene &&  this.scene.start(menuItem.scene);
    if (menuItem.text === 'Exit'){
        this.game.destroy(true);
    }
})
}
}

export default PauseScene;