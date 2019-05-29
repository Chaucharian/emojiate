import '../libs/jeelizFaceTransfer.js';
import * as NNC from '../libs/jeelizFaceTransferNNC.json';

class Main {
    constructor(...args) {

        JEEFACETRANSFERAPI.init({
            canvasId: 'canvas',
            NNC,
            callbackReady: () => this.initialize()
        });
    }

    initialize() {
        JEEFACETRANSFERAPI.on_detect( data => console.log(data));
        // JEEFACETRANSFERAPI.set_color([0,0,0]); disable face drawing
        JEEFACETRANSFERAPI.get_morphUpdateCallback( data => console.log(data) );
    }
}

new Main();