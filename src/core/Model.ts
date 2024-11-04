//
//  Model.ts
//  PureMVC TypeScript Standard
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {IModel} from "../interfaces/IModel";
import {IProxy} from "../interfaces/IProxy";

/**
 * A Singleton `Model` implementation.
 *
 * In PureMVC, the `Model` class provides
 * access to model objects (Proxies) by named lookup.
 *
 * The `Model` assumes these responsibilities:
 *
 * - Maintain a cache of `Proxy` instances.
 * - Provide methods for registering, retrieving, and removing
 * `Proxy` instances.
 *
 * Your application must register `Proxy` instances
 * with the `Model`. Typically, you use an
 * `Command` to create and register `Proxy`
 * instances once the `Facade` has initialized the Core
 * actors.
 *
 * @see {@link Proxy}
 *
 * @class Model
 */
export class Model implements IModel {

    /** Message Constants
     * @type {string} */
    protected static SINGLETON_MSG: string = "Model Singleton already constructed!";

    /**
     * Singleton instance
     *
     * @type {IModel}
     * @protected
     */
    protected static instance: IModel;

    /** Mapping of proxyNames to IProxy instances
     * @type {{ [key: string]: IProxy }} */
    protected proxyMap: { [key: string]: IProxy };

    /**
     * Constructor.
     *
     * This `Model` implementation is a Singleton,
     * so you should not call the constructor
     * directly, but instead call the static Singleton
     * Factory method `Model.getInstance()`
     *
     * @throws {Error} Error if instance for this Singleton instance has already been constructed
     */
    public constructor() {
        if (Model.instance != null) throw Error(Model.SINGLETON_MSG);
        Model.instance = this;
        this.proxyMap = {};
        this.initializeModel();
    }

    /**
     * Initialize the `Model` instance.
     *
     * Called automatically by the constructor, this
     * is your opportunity to initialize the Singleton
     * instance in your subclass without overriding the
     * constructor.
     *
     * @returns {void}
     */
    protected initializeModel(): void {
    }

    /**
     * `Model` Singleton Factory method.
     *
     * @param {() => IModel} factory - A factory function that creates a new instance of the model if one does not already exist.
     * @returns {IModel} The Singleton instance.
     */
    public static getInstance(factory: () => IModel): IModel {
        if (Model.instance == null)
            Model.instance = factory();
        return Model.instance;
    }

    /**
     * Register a `Proxy` with the `Model`.
     *
     * @param {IProxy} proxy - The proxy instance to be registered.
     * @returns {void}
     */
    public registerProxy(proxy: IProxy): void {
        this.proxyMap[proxy.name] = proxy;
        proxy.onRegister();
    }

    /**
     * Retrieve a `Proxy` from the `Model`.
     *
     * @param {string} proxyName - The name of the proxy to retrieve.
     * @returns {IProxy | null} The proxy instance associated with the given name, or `null` if no such proxy exists.
     */
    public retrieveProxy(proxyName: string): IProxy | null {
        return this.proxyMap[proxyName] || null;
    }

    /**
     * Check if a Proxy is registered
     *
     * @param {string} proxyName - The name of the proxy to check.
     * @returns {boolean} `true` if a proxy with the specified name is registered; otherwise, `false`.
     */
    public hasProxy(proxyName: string): boolean {
        return this.proxyMap[proxyName] != null;
    }

    /**
     * Remove a `Proxy` from the `Model`.
     *
     * @param {string} proxyName - The name of the proxy to be removed.
     * @returns {IProxy | null} The removed proxy instance, or `null` if no proxy with the given name was found.
     */
    public removeProxy(proxyName: string): IProxy | null {
        const proxy: IProxy = this.proxyMap[proxyName];
        if (!proxy) return null;

        delete this.proxyMap[proxyName];
        proxy.onRemove();
        return proxy;
    }

}
