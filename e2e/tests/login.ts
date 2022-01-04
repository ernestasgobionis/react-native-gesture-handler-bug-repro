export default () =>
    describe('Login Tests', () => {
        afterAll(async () => {
            await device.launchApp({
                delete: true,
                permissions: {
                    notifications: 'YES',
                    contacts: 'YES',
                },
            });
        });
    });
