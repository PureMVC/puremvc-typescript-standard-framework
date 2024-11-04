//
//  INotifier.ts
//  PureMVC TypeScript Standard
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

/**
 * `INotifier` The interface definition for a PureMVC `Notifier`.
 *
 * `MacroCommand`, `Command`, `Mediator` and `Proxy`
 * all have a need to send `Notifications`.
 *
 * The `INotifier` interface provides a common method called
 * `sendNotification` that relieves implementation code of
 * the necessity to actually construct `Notifications`.
 *
 * The `Notifier` class, which all the above-mentioned classes
 * extend, also provides an initialized reference to the `Facade`
 * Singleton, which is required for the convenience method
 * for sending `Notifications`, but also eases implementation as these
 * classes have frequent `Facade` interactions and usually require
 * access to the facade anyway.
 *
 * @interface INotifier
 */
export interface INotifier {

    /**
     * Send a `INotification`.
     *
     * Convenience method to prevent having to construct new
     * notification instances in our implementation code.
     *
     * @param {string} notificationName - The name of the notification to send.
     * @param {any} [body] - Optional data associated with the notification.
     * @param {string} [type] - Optional type of the notification.
     * @returns {void}
     */
    sendNotification(notificationName: string, body?: any, type?: string): void;
}
