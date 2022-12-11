/* eslint-disable testing-library/no-node-access */
import { cleanup } from "@testing-library/react";
import * as rq from "@tanstack/react-query";
import { useAppQueryClient } from "..";
import { waitForHook } from "../test/test-utils";

describe("useAppQueryClient", () => {
  let queryClientMock: jest.SpyInstance;
  const mockedQueryClient = {
    invalidateQueries: jest.fn(),
    refetchQueries: jest.fn(),
    isFetching: jest.fn(),
    isMutating: jest.fn(),
    getQueryData: jest.fn(),
    getQueryState: jest.fn(),
    setQueryData: jest.fn(),
    removeQueries: jest.fn(),
    resetQueries: jest.fn(),
    cancelQueries: jest.fn(),
    fetchQuery: jest.fn(),
    prefetchQuery: jest.fn(),
    executeMutation: jest.fn(),
    setDefaultOptions: jest.fn(),
    setQueryDefaults: jest.fn(),
    getQueryDefaults: jest.fn(),
    setMutationDefaults: jest.fn(),
    getMutationDefaults: jest.fn(),
  };

  beforeAll(() => {
    jest.mock("cross-local-storage");
    queryClientMock = jest
      .spyOn(rq, "useQueryClient")
      .mockImplementation(() => {
        return mockedQueryClient as any;
      });
  });

  afterEach(cleanup);
  test("simple query call, only endpoint name", async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() => useAppQueryClient());
    expect(queryClientMock).toHaveBeenCalled();

    hook.invalidateQueries("fake-object");
    hook.refetchQueries("fake-object");
    hook.isFetching("fake-object");
    hook.isMutating("fake-object");
    hook.getQueryData("fake-object");
    hook.setQueryData("fake-object", { count: 1, rows: [], page: 1 });
    hook.removeQueries("fake-object");
    hook.resetQueries("fake-object");
    hook.cancelQueries("fake-object");
    hook.fetchQuery("fake-object");
    hook.prefetchQuery("fake-object");
    // hook.executeMutation("fake-object");
    hook.getQueryState("fake-object");
    hook.setQueryDefaults("fake-object");
    hook.getQueryDefaults("fake-object");
    hook.setMutationDefaults("fake-object");
    hook.getMutationDefaults("fake-object");
    expect(mockedQueryClient.invalidateQueries).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.refetchQueries).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.isFetching).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.isMutating).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.getQueryData).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.setQueryData).toHaveBeenLastCalledWith(
      ["fake-object"],
      { count: 1, rows: [], page: 1 }
    );
    expect(mockedQueryClient.removeQueries).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.resetQueries).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.cancelQueries).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.fetchQuery).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.prefetchQuery).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    // expect(mockedQueryClient.executeMutation).toHaveBeenLastCalledWith({
    //   mutationKey: ["fake-object"],
    // });
    expect(mockedQueryClient.getQueryState).toHaveBeenLastCalledWith(
      ["fake-object"],
      undefined
    );
    expect(mockedQueryClient.setQueryDefaults).toHaveBeenLastCalledWith(
      ["fake-object"],
      {}
    );
    expect(mockedQueryClient.getQueryDefaults).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.setMutationDefaults).toHaveBeenLastCalledWith(
      ["fake-object"],
      {}
    );
    expect(mockedQueryClient.getMutationDefaults).toHaveBeenLastCalledWith([
      "fake-object",
    ]);

    hook.invalidateQueries("fake-object/:id", { pathParams: { id: 1 } });
    expect(mockedQueryClient.invalidateQueries).toHaveBeenLastCalledWith([
      "fake-object/:id",
      { id: 1 },
    ]);

    hook.invalidateQueries("fake-object", {
      query: { queryParam1: "testValue", queryParam2: 6 },
    });
    expect(mockedQueryClient.invalidateQueries).toHaveBeenLastCalledWith([
      "fake-object",
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    hook.invalidateQueries("fake-object/:id", {
      pathParams: { id: 1 },
      query: { queryParam1: "testValue", queryParam2: 6 },
    });
    expect(mockedQueryClient.invalidateQueries).toHaveBeenLastCalledWith([
      "fake-object/:id",
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    hook.invalidateQueries(
      { scope: "anotherApiScope", route: "another-api-endpiont" },
      {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
      }
    );
    expect(mockedQueryClient.invalidateQueries).toHaveBeenLastCalledWith([
      { scope: "anotherApiScope", route: "another-api-endpiont" },
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);
  });
});
