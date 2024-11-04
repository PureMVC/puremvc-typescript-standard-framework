"use strict";
//
//  Notifier.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifier = void 0;
const Facade_1 = require("../facade/Facade");
/**
 * A Base `Notifier` implementation.
 *
 * `MacroCommand, Command, Mediator` and `Proxy`
 * all have a need to send `Notifications`.
 *
 * The `Notifier` interface provides a common method called
 * `sendNotification` that relieves implementation code of
 * the necessity to actually construct `Notifications`.
 *
 * The `Notifier` class, which all the above-mentioned classes
 * extend, provides an initialized reference to the `Facade`
 * Singleton, which is required for the convenience method
 * for sending `Notifications`, but also eases implementation as these
 * classes have frequent `Facade` interactions and usually require
 * access to the facade anyway.
 *
 * @see {@link Proxy}
 * @see {@link Facade}
 * @see {@link Mediator}
 * @see {@link MacroCommand}
 * @see {@link SimpleCommand}
 *
 * @class Notifier
 */
class Notifier {
    constructor() {
        /**
         * Return the Singleton Facade instance
         *
         * @returns {IFacade} The facade instance.
         */
        this.facade = Facade_1.Facade.getInstance(() => new Facade_1.Facade());
    }
    /**
     * Create and send an `Notification`.
     *
     * Keeps us from having to construct new Notification
     * instances in our implementation code.
     *
     * @param {string} notificationName - The name of the notification to be sent.
     * @param {any} [body] - Optional data to be included with the notification.
     * @param {string} [type] - Optional type of the notification.
     * @returns {void}
     */
    sendNotification(notificationName, body, type) {
        this.facade.sendNotification(notificationName, body, type);
    }
}
exports.Notifier = Notifier;
