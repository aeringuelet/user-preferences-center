import bodyParser from 'body-parser';
import express from 'express';
import request from 'supertest';

export const superTestServer = (
    baseUrl: string,
    controller: express.Router
) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(baseUrl, controller);

    return request(app);
};
