export interface IPluginManifest {
    /** Plugin version string */
    version: string;
    /**
     * Version of Alethio CMS required to run this plugin.
     * Must be a valid semver string. See https://www.npmjs.com/package/semver
     */
    cmsVersion?: string;
}
