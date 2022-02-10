import MockAdapter from "axios-mock-adapter";
import mockAuth from "../../app/modules/__mocks__/auth/mockAuth";

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300 });

  mockAuth(mock);

  return mock.onAny().passThrough();
}
