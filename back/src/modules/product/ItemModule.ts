const {ItemController} = require('./controllers/ItemController');

export class ItemModule {
    itemController: any;
    constructor() {
        this.itemController = new ItemController();
        this.setup();
    }
    setup(){
        return this.itemController.createServices();
    }
}
