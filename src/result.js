/**
 * @typedef { { ok: boolean, msg: string} } Result
 */

/**
 * @returns { Result }
 */
function ok() {
    return { ok: true };
}

/**
 * @returns { Result }
 */
function fail(msg) {
    return { ok: false, msg };
}

module.exports = { ok, fail };