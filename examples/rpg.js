/*
 *  rpg.js
 *  Simple RPG Game made with Nifty
 */

var globals = {
    coins: 0
};

var Coin = (function(_super) {
    __extends(Coin, _super);
    
    function Coin() {
        _super.apply(this, arguments);
        this.sprite = null;
        this.size = new Nifty.Point(16, 16);
    }
    
    Coin.prototype.create = function() {
        this.sprite = new Nifty.Sprite('Coin.png');
        
        this.position.x = Math.random() * (Nifty.canvas.width - 32) + 16;
        this.position.y = Math.random() * (Nifty.canvas.height - 32) + 16;
    }
    
    Coin.prototype.destroy = function() { }
    
    Coin.prototype.draw = function() {
        this.sprite.position = this.position.floor();
        this.sprite.draw();
    }
    
    return Coin;
})(Nifty.Entity);

var Hero = (function(_super) {
    __extends(Hero, _super);
    
    function Hero() {
        _super.apply(this, arguments);
        
        this.size = new Nifty.Point(32, 40);
        this.origin = new Nifty.Point(16, 40);
        
        this.sprite = null;
        this.moveUp = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveDown = false;
    }
    
    Hero.prototype.create = function() {
        this.sprite = new Nifty.Sprite('Hero.png');
        this.sprite.origin.x = this.sprite.image.width / 2;
        this.sprite.origin.y = this.sprite.image.height;
        
        this.position.x = Nifty.canvas.width / 2;
        this.position.y = Nifty.canvas.height / 2;
        
        this.input().key[Nifty.Key.Up] =
            (function(self) {
                return function(ev) {
                    self.moveUp = ev.pressed();
                }
            })(this);
        this.input().key[Nifty.Key.Down] =
            (function(self) {
                return function(ev) {
                    self.moveDown = ev.pressed();
                }
            })(this);
        this.input().key[Nifty.Key.Left] =
            (function(self) {
                return function(ev) {
                    self.moveLeft = ev.pressed();
                }
            })(this);
        this.input().key[Nifty.Key.Right] =
            (function(self) {
                return function(ev) {
                    self.moveRight = ev.pressed();
                }
            })(this);
    }
    
    Hero.prototype.update = function() {
        if (this.moveUp == true)
            this.position.y -= 3;
        else if (this.moveDown == true)
            this.position.y += 3;
        
        if (this.moveLeft == true)
            this.position.x -= 3;
        else if (this.moveRight == true)
            this.position.x += 3;
        
        var boundingBox = this.getBoundingBox();
        var coins = this.parent.entities.inArea(boundingBox);
        for(var i = 0; i < coins.length; ++i) {
            if (coins[i] instanceof Coin && coins[i].getBoundingBox().intersects(boundingBox)) {
                this.parent.entities.remove(coins[i]);
                Nifty.Assets.playSound('Coin.wav');
                
                ++globals.coins;
            }
        }
    }
    
    Hero.prototype.draw = function() {
        this.sprite.position = this.position;
        this.sprite.draw();
    }
    
    return Hero;
})(Nifty.Entity);

var Overlay = (function(_super) {
    __extends(Overlay, _super);
    
    function Overlay() {
        _super.apply(this, arguments);
    }
    
    Overlay.prototype.preload = function() {
        return {
            assets: [],
            draw: function() { }
        };
    }
    
    Overlay.prototype.enter = function() {
        this.coinSprite = new Nifty.Sprite('Coin.png');
        this.coinSprite.position = new Nifty.Point(8, 8);
        this.back = new Nifty.RectangleShape();
        this.back.size = new Nifty.Point(Nifty.canvas.width, 32);
        this.back.color = new Nifty.RgbColor(0, 0, 0, 96);
    }
    
    Overlay.prototype.draw = function() {
        this.back.draw();
        this.coinSprite.draw();
        
        var text = new Nifty.Text(globals.coins + ' Coins', '12pt Consolas');
        text.position = new Nifty.Point(28, 9);
        text.draw();
    }
    
    return Overlay;
})(Nifty.State);

var Primary = (function(_super) {
    __extends(Primary, _super);
    
    function Primary() {
        _super.apply(this, arguments);
        
        this.tile = null;
    }
    
    Primary.prototype.enter = function() {
        this.tile = new Nifty.Sprite('Tile.png');
        
        Nifty.pushState(new Overlay());
        
        this.entities.add(new Hero());
        
        for(var i = 0; i < 15; ++i)
            this.entities.add(new Coin());
    }
    
    Primary.prototype.preload = function() {
        return {
            assets: [
                'Tile.png',
                'Hero.png',
                'Coin.png',
                'Coin.wav'
            ]
        };
    }
    
    Primary.prototype.draw = function() {
        for(var y = 0; y < Nifty.canvas.height; y += 24) {
            for(var x = 0; x < Nifty.canvas.width; x += 24) {
                this.tile.position.x = x;
                this.tile.position.y = y;
                this.tile.draw();
            }
        }
    }
    
    return Primary;
})(Nifty.State);

$(document).ready(function() {
    Nifty.settings.assetsPath = 'examples/assets';
    Nifty.initialize();
    Nifty.setState(new Primary());
    Nifty.run();
});
