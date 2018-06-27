const request = require('request');
const launchApp = require('../../bootstrap')();

describe('When serving game api ->', () => {
    let app;
    beforeAll(done => {
        app = launchApp({
            static: __dirname,
            port: 5000,
            onLaunch: done
        });
    });
    afterAll(() => app.close());

    describe('When generating new combination ->', () => {
        let combination;
        beforeAll(done => {
            const opt = {
                json: true
            };
            request.post('http://localhost:5000/api/game', opt, (err, resp, body) => {
                combination = body;
                done();
            });
        });
        it('should generate random sequence of 3 items', () => {
            expect(combination.values.length).toBe(3);
        });
        it('should generate random sequence of items between 0 and 5', () => {
            const isCorrectSeq = combination.values.every(
                v => v >= 0 && v <= 5
            );
            expect(isCorrectSeq).toBe(true);
        });
        it('should generate random bonus flag', () => {
            expect(typeof combination.bonus).toBe('boolean');
        });
        it('should generate a known combination outcome', () => {
            const knownOutcomes = [
                'No Win',
                'Small Win',
                'Big Win'
            ];
            expect(knownOutcomes.includes(combination.outcome)).toBe(true);
        });
    });
});
