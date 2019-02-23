const fs = require('fs');

let SecretID = null;
let SecretKey = null;

if (fs.existsSync('./test/config/index.js')) {
    const config = require('./config');
    SecretID = config.SecretID1;
    SecretKey = config.SecretKey1;

}
else {
    SecretID = process.env.TENCENTCLOUD_SECRETID1;
    SecretKey = process.env.TENCENTCLOUD_SECRETKEY2;
}

import TcbService from '../src/node/index';
const tcbService = new TcbService({
    secretID: SecretID,
    secretKey: SecretKey,
    env: 'production-c3ccb6'
});

describe('Utils Functions', () => {
    it('getBase64 - url', async () => {
        let result = await tcbService.utils.getBase64({
            url: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3400710384,952532930&fm=173&app=49&f=JPEG?w=356&h=515&s=37FC132A8C22469C24250EDB03008095',
            options: {
                maxContentLength: 40000,
            }
        });

        expect(typeof result).toBe('string');
    }, 10000);

    it('getBase64 - url', async () => {
        let result = await tcbService.utils.getBase64({
            fileID: 'cloud://production-c3ccb6.7072-production-c3ccb6/1550567273903-7919.jpg'
        });

        expect(typeof result).toBe('string');
    }, 10000);
});