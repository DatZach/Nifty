/*
 *  timer.ts
 *  Nifty HTML5 Game Engine
 *  Timer
 */
var Nifty;
(function (Nifty) {
    var Timer;
    (function (Timer) {
        var timers = {};
        function nextFrame(callback) {
            return add({
                event: function () {
                    callback();
                    return true;
                }
            });
        }
        Timer.nextFrame = nextFrame;
        function everyFrame(callback) {
            return add({
                event: callback
            });
        }
        Timer.everyFrame = everyFrame;
        function after(seconds, callback) {
            return add({
                event: function () {
                    callback();
                    return true;
                },
                time: seconds
            });
        }
        Timer.after = after;
        function every(seconds, callback) {
            return add({
                event: callback,
                startTime: seconds,
                time: seconds
            });
        }
        Timer.every = every;
        function cancel(id) {
            delete timers[id];
        }
        Timer.cancel = cancel;
        function exists(id) {
            return timers[id] !== undefined;
        }
        Timer.exists = exists;
        function update() {
            for (var i in timers) {
                var timer = timers[i];
                timer.time -= Nifty.settings.timestep;
                if (timer.time > 0)
                    continue;
                if (timer.event())
                    delete timer;
                else
                    timer.time = timer.startTime;
            }
        }
        Timer.update = update;
        function add(info) {
            var id = generateId();
            timers[id] = info;
            return id;
        }
        var timerId = 0;
        function generateId() {
            return ++timerId;
        }
    })(Timer = Nifty.Timer || (Nifty.Timer = {}));
})(Nifty || (Nifty = {}));
