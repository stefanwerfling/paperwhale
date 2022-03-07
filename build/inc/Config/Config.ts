import {readFileSync} from 'fs';
import path from 'path';

/**
 * ConfigOptions
 */
interface ConfigOptions {
    db: {
        mysql: {
            host: string;
            port: number;
            username: string;
            password: string;
            database: string;
        };
    };

    httpserver: {
        api: {
            port?: number;
            session?: {
                secret?: string;
                cookie_path?: string;
                cookie_max_age?: number;
                cookie_secure?: boolean;
            };
        };

        setup: {
            port?: number;
            publicdir: string;
            session?: {
                secret?: string;
                cookie_path?: string;
                cookie_max_age?: number;
                cookie_secure?: boolean;
            };
        };
    };

    wsd?: {
        host: string;
        httpserver?: {
            port: number;
        };
    };

    setup: {
        username: string;
        password: string;
    };

    logging?: {
        level: number;
    };

    rootconfigpath?: string;
    rootconfigname?: string;
}

/**
 * Config
 */
export class Config {

    /**
     * load
     * @param configFile
     */
    static async load(configFile: string): Promise<ConfigOptions | null> {
        let config = null;

        try {
            const rawdata = readFileSync(configFile, 'utf-8');

            console.log(`Load json-file: ${configFile}`);

            config = JSON.parse(rawdata);

            config.rootconfigpath = path.dirname(configFile);
            config.rootconfigname = path.basename(configFile);
        } catch (err) {
            console.error(err);
        }

        return config;
    }

}