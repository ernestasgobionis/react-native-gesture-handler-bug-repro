import { by, element, waitFor, expect } from 'detox';
import { TestIds } from 'e2e/test-ids';

export const searchAndSelectPrefix = async (id: string) => {
    // Selecting phone prefix
    await waitFor(element(by.id(TestIds.Common.SearchInput)))
        .toBeVisible()
        .withTimeout(10000);
    await element(by.id(TestIds.Common.SearchInput)).tap();
    await element(by.id(TestIds.Common.SearchInput)).typeText('Ireland');
    await waitFor(element(by.id(id)))
        .toBeVisible()
        .withTimeout(10000);
    await element(by.id(id)).tap();
};

export const mockLogin = async (phone = '15555555') => {
    await expect(element(by.id(TestIds.Screens.SelectBranch.AlreadyRegisteredButton))).toBeVisible();
    await element(by.id(TestIds.Screens.SelectBranch.AlreadyRegisteredButton)).tap();

    await expect(element(by.id(TestIds.Screens.Login.EnterPhone.PhoneInput))).toBeVisible();
    await expect(element(by.id(TestIds.Screens.Login.EnterPhone.PrefixButton))).toBeVisible();
    await expect(element(by.id(TestIds.Screens.Login.EnterPhone.SubmitButton))).toBeVisible();
    await element(by.id(TestIds.Screens.Login.EnterPhone.PrefixButton)).tap();

    await searchAndSelectPrefix('+353-Ireland');

    await waitFor(element(by.id(TestIds.Screens.Login.EnterPhone.PhoneInput)))
        .toBeVisible()
        .withTimeout(10000);
    await element(by.id(TestIds.Screens.Login.EnterPhone.PhoneInput)).tap();
    await element(by.id(TestIds.Screens.Login.EnterPhone.PhoneInput)).typeText(phone);
    await element(by.id(TestIds.Screens.Login.EnterPhone.SubmitButton)).tap();

    await waitFor(element(by.id(TestIds.Screens.Login.ConfirmPhone.CodeInput)))
        .toBeVisible()
        .withTimeout(10000);
    await element(by.id(TestIds.Screens.Login.ConfirmPhone.CodeInput)).tap();
    await element(by.id(TestIds.Screens.Login.ConfirmPhone.CodeInput)).typeText('123456');
};
