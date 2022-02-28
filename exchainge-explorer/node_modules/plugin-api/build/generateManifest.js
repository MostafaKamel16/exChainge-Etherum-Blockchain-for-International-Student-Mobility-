/**
 * Generates a plugin manifest object, which can be injected by Webpack into the JS bundle for each plugin.
 * The manifest is used by the CMS at runtime to read plugin meta (e.g. determine plugin compatibility)
 */
exports.generateManifest = (packageJson) => ({
    version: packageJson.version,
    cmsVersion: packageJson.engines && packageJson.engines["@alethio/cms"]
});
