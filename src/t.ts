
class PuppeteerError extends Error {
    /**
     * @internal
     */
    constructor(message: any, options?: any) {
        super(message, options);
        this.name = this.constructor.name;
    }
    /**
     * @internal
     */
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}

try {
    throw new Error('1');
} catch(e) {

} finally {
    console.log(1);
}