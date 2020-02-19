(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('eventemitter3')) :
    typeof define === 'function' && define.amd ? define(['exports', 'eventemitter3'], factory) :
    (global = global || self, factory(global.draggify = {}, global.Event));
}(this, function (exports, Event) { 'use strict';

    Event = Event && Event.hasOwnProperty('default') ? Event['default'] : Event;

    var event = new Event();
    function useDrag(target) {
        var isMoving = false;
        var startLocal;
        target.interactive = true;
        target.on('touchstart', function (e) {
            isMoving = true;
            startLocal = target.toLocal(e.data.global);
        });
        target.on('touchmove', function (e) {
            var _a;
            if (!isMoving)
                return;
            var position = (_a = target.parent) === null || _a === void 0 ? void 0 : _a.toLocal(e.data.global);
            if (position) {
                target.x = position.x - startLocal.x * target.scale.x;
                target.y = position.y - startLocal.y * target.scale.y;
                // fix pivot offset
                fix(target);
            }
        });
        target.on('touchend', function (e) {
            isMoving = false;
            event.emit('drop', e);
        });
    }
    function useDrop(target) {
        target.interactive = true;
        event.on('drop', function (e) {
            var position = e.data.global;
            var globalPosition = target.parent.toGlobal(target.position);
            var xOK = position.x > globalPosition.x && position.x < globalPosition.x + target.width;
            var yOK = position.y > globalPosition.y && position.y < globalPosition.y + target.height;
            if (xOK && yOK)
                target.emit('drop', e);
        });
    }
    function draggify(_a) {
        var Container = _a.Container;
        Container.prototype.draggify = function () {
            useDrag(this);
        };
        Container.prototype.droppify = function () {
            useDrop(this);
        };
    }
    function fix(target) {
        target.x += target.pivot.x * target.scale.x;
        target.y += target.pivot.y * target.scale.y;
        if (target.anchor) {
            target.x += target.width * target.anchor.x;
            target.y += target.height * target.anchor.y;
        }
    }

    exports.default = draggify;
    exports.useDrag = useDrag;
    exports.useDrop = useDrop;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=draggify.js.map
