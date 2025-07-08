import { hydrateUserFromLocalStorage } from "./user";

describe('hydrateUserFromLocalStorage testing', () => {
  it('checking user value in local storage', () => {
    let user = hydrateUserFromLocalStorage();
    expect(user).toBe(undefined);
  });
});
