import { IController } from "../interfaces/IController";
import { IView } from "../interfaces/IView";
import { ICommand } from "../interfaces/ICommand";
import { INotification } from "../interfaces/INotification";
/**
 * A Singleton `Controller` implementation.
 *
 * In PureMVC, the `Controller` class follows the
 * 'Command and Controller' strategy, and assumes these
 * responsibilities:
 *
 *
 * - Remembering which `Command`s
 * are intended to handle which `Notifications`.
 * - Registering itself as an `Observer` with
 * the `View` for each `Notification`
 * that it has a `Command` mapping for.
 * - Creating a new instance of the proper `Command`
 * to handle a given `Notification` when notified by the `View`.
 * - Calling the `Command`'s `execute`
 * method, passing in the `Notification`.
 *
 *
 * Your application must register `Commands` with the
 * Controller.
 *
 * The simplest way is to subclass `Facade`,
 * and use its `initializeController` method to add your
 * registrations.
 *
 * @see {@link View}
 * @see {@link Observer}
 * @see {@link Notification}
 * @see {@link SimpleCommand}
 * @see {@link MacroCommand}
 *
 * @class Controller
 */
export declare class Controller implements IController {
    /** Message Constants
     * @type {string} */
    protected static SINGLETON_MSG: string;
    /**
     * Singleton instance
     *
     * @type {IController}
     * @protected
     */
    protected static instance: IController;
    /** Local reference to View
     * @type {IView | undefined} */
    protected view?: IView;
    /** Mapping of Notification names to Command factories
     * @type {{ [key: string]: () => ICommand }} */
    protected commandMap: {
        [key: string]: () => ICommand;
    };
    /**
     * Constructor.
     *
     * This `Controller` implementation is a Singleton,
     * so you should not call the constructor
     * directly, but instead call the static Singleton Factory method,
     * `Controller.getInstance()`
     *
     * @throws {Error} Error if instance for this Singleton has already been constructed
     */
    constructor();
    /**
     * Initialize the Singleton `Controller` instance.
     *
     * Called automatically by the constructor.
     *
     * Note that if you are using a subclass of `View`
     * in your application, you should <i>also</i> subclass `Controller`
     * and override the `initializeController` method in the
     * following way:
     *
     * ```ts
     * // ensure that the Controller is talking to my View implementation
     * initializeController() {
     *   this.view = MyView.getInstance(() => new View());
     * }
     * ```
     * @returns {void}
     */
    protected initializeController(): void;
    /**
     * `Controller` Singleton Factory method.
     *
     * @param {() => IController} factory - A factory function that creates a new instance of the controller if one does not already exist.
     * @returns {IController} the Singleton instance of `Controller`.
     */
    static getInstance(factory: () => IController): IController;
    /**
     * Register a particular `Command` class as the handler
     * for a particular `Notification`.
     *
     * If an `Command` has already been registered to
     * handle `Notification`s with this name, it is no longer
     * used, the new `Command` is used instead.
     *
     * The Observer for the new Command is only created if this the
     * first time a Command has been registered for this Notification name.
     *
     * @param {string} notificationName - The name of the notification to associate with the command.
     * @param {() => ICommand} factory - A factory function that returns an instance of the command.
     * @returns {void}
     */
    registerCommand(notificationName: string, factory: () => ICommand): void;
    /**
     * If a `Command` has previously been registered
     * to handle the given `Notification`, then it is executed.
     *
     * @param {INotification} notification - The notification containing the data or command details needed for execution.
     * @returns {void}
     */
    executeCommand(notification: INotification): void;
    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {string} notificationName - The name of the notification to check for a registered command.
     * @returns {boolean} `true` if a command is registered for the specified notification name; otherwise, `false`.
     */
    hasCommand(notificationName: string): boolean;
    /**
     * Remove a previously registered `Command` to `Notification` mapping.
     *
     * @param {string} notificationName - The name of the notification for which the associated command should be removed.
     * @returns {void}
     */
    removeCommand(notificationName: string): void;
}
