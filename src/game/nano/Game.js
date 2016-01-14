import Config from 'config/Config.js';
import Dimensions from 'config/settings/Dimensions.js';
import Parent from 'config/settings/Parent.js';
import FrameRate from 'config/settings/FrameRate.js';
import Boot from 'dom/Boot.js';
import Banner from 'utils/Banner.js';
import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import Clear from 'canvas/graphics/Clear.js';
import Loader from 'loader/Loader.js';

export default class Game {

    constructor (config = Config()) {

        this.config = config;

        this.config.require(
            Dimensions(),
            Parent(),
            FrameRate()
        );

        this.canvas = null;
        this.context = null;
        this.load = null;

        Boot().then(() => this.init());

    }

    init () {

        Banner(this.config.get('gameTitle').name, this.config.get('gameTitle').url);

        let size = this.config.get('dimensions');

        this.canvas = Canvas(size.width, size.height);
        this.context = GetContext(this.canvas);

        AddToDOM(this.canvas, this.config.get('parent'));

        this.load = new Loader();

        // if (this.state.preload)
        // {
        //     this.state.preload.call(this.state, this);

        //     //  Empty loader?
        //     if (this.load._totalFileCount === 0)
        //     {
        //         this.start();
        //     }
        //     else
        //     {
        //         this.load.start();
        //     }
        // }
        // else
        // {
        //     this.start();
        // }

        this.loop = new MainLoop(this.config.get('frameRate'));

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.render(t));

    }

    begin () {

        Clear(this.context, false);

    }

    update (delta) {

    }

    render (t) {

    }

}