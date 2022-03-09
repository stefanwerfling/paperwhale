import cookieParser from 'cookie-parser';
import minimist from 'minimist';
import * as path from 'path';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import session from 'express-session';
import 'reflect-metadata';
import {v4 as uuid} from 'uuid';

import {Files} from './app/Api/Files';
import {Config} from './inc/Config/Config';
import {HttpServer} from './inc/Server/HttpServer';
import {DeviceDestinationClientContext} from './inc/Wsd/DeviceDestination';
import {Wsd} from './inc/Wsd/Wsd';

/**
 * Main
 */
(async(): Promise<void> => {
    const argv = minimist(process.argv.slice(2));
    let configfile = path.join(__dirname, '/config.json');

    if (argv.config) {
        configfile = argv.config;
    }

    try {
        if (!fs.existsSync(configfile)) {
            console.log(`Config not found: ${configfile}, exit.`);
            return;
        }
    } catch (err) {
        console.log(`Config is not load: ${configfile}, exit.`);
        console.error(err);
        return;
    }

    const config = await Config.load(configfile);

    if (config === null) {
        console.log(`Configloader is return empty config, please check your configfile: ${configfile}`);
        return;
    }

    // -----------------------------------------------------------------------------------------------------------------

    try {
        if (config.wsd) {
            let port: number|undefined;

            if (config.wsd.httpserver) {
                port = config.wsd.httpserver?.port;
            }

            const wsdd = new Wsd(config.wsd.host, port);

            wsdd.addDeviceInfo({
                identId: 'cf812aee-d68f-4368-97ac-a341191afac5',
                expires: 1,
                destinations: [{
                    clientDisplayName: 'Paperwhale-Document',
                    clientContext: DeviceDestinationClientContext.Scan
                }]
            });

            wsdd.addDeviceInfo({
                identId: 'df975389-d4d5-47d8-ba14-707b0c467c27',
                expires: 1,
                destinations: [{
                    clientDisplayName: 'Paperwhale-Stb',
                    clientContext: DeviceDestinationClientContext.Scan
                }]
            });

            wsdd.listen();
        }
    } catch (error) {
        console.log('Error while wsd start', error);
    }

    // -----------------------------------------------------------------------------------------------------------------

    try {
        let apiServerPort = 3001;
        let apiSessionSecret = uuid();
        let apiSessionCookiePath = '/';
        let apiSessionCookieMaxAge = 604800000;
        let apiSessionCookieSecure = true;

        if (config.httpserver.api.port) {
            apiServerPort = config.httpserver.api.port;
        }

        if (config.httpserver.api.session) {
            const configApiSession = config.httpserver.api.session;

            if (configApiSession.secret) {
                apiSessionSecret = configApiSession.secret;
            }

            if (configApiSession.cookie_path) {
                apiSessionCookiePath = configApiSession.cookie_path;
            }

            if (configApiSession.cookie_max_age) {
                apiSessionCookieMaxAge = configApiSession.cookie_max_age;
            }

            if (typeof configApiSession.cookie_secure !== 'undefined') {
                apiSessionCookieSecure = configApiSession.cookie_secure;
            }
        }

        const apiserver = new HttpServer({
            port: apiServerPort,
            middleWares: [
                bodyParser.urlencoded({extended: true}),
                bodyParser.json(),
                cookieParser(),
                session({
                    secret: apiSessionSecret,
                    resave: true,
                    saveUninitialized: true,
                    store: new session.MemoryStore(),
                    cookie: {
                        path: apiSessionCookiePath,
                        secure: apiSessionCookieSecure,
                        maxAge: apiSessionCookieMaxAge
                    }
                })
            ],
            routes: [],
            controllers: [
                Files
            ]
        });

        apiserver.listen();
    } catch (error) {
        console.log('Error while api start', error);
    }
})();