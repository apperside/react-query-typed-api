/* eslint-disable testing-library/no-node-access */
import { act, cleanup } from '@testing-library/react';
import * as rq from '@tanstack/react-query';
import { DeepPartial } from 'src/helpers/typeUtils';
import { MyObject } from 'src/test/types.spec';
import { expectType } from 'tsd';
import { DefaultSaveOnePayload, useAppMutation } from '..';
import * as imperative from '../imperative';
import { waitForHook } from '../test/test-utils';

describe('basic usage', () => {
  let useMutationMock: jest.SpyInstance;
  let httpPostMock: jest.SpyInstance;

  beforeAll(() => {
    jest.mock('cross-local-storage');
  });

  beforeEach(() => {
    useMutationMock = jest.spyOn(rq, 'useMutation');
    httpPostMock = jest
      .spyOn(imperative, 'httpPost')
      .mockImplementation(jest.fn());
    useMutationMock.mockClear();
    httpPostMock.mockClear();
    // jest.spyOn(rq, "useQueryClient").mockImplementation(jest.fn());
  });

  afterEach(cleanup);
  test('simple query call, only endpoint name', async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() => useAppMutation('fake-object'));

    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];
    expect(queryKeyParameter).toEqual(['fake-object']);

    await act(async () => {
      const payload = { item: { myField: 'value' } };
      await hook.mutateAsync(payload);
      expect(httpPostMock).toHaveBeenCalledWith('fake-object', { payload });
    });
    // const query = useAppMutation("fake-object");
    // expectType<
    //   rq.UseMutationResult<MyObject, any, DefaultSaveOnePayload<MyObject>>
    // >(query);
  });

  test('with path variables', async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() =>
      useAppMutation('fake-object/:id', { pathParams: { id: 1 } })
    );

    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];
    expect(queryKeyParameter).toEqual(['fake-object/:id', { id: 1 }]);

    await act(async () => {
      const payload = { item: { myField: 'value' } };
      await hook.mutateAsync(payload);
      expect(httpPostMock).toHaveBeenCalledWith('fake-object/:id', {
        payload,
        pathParams: { id: 1 },
      });
    });
  });

  test('query call with only query object', async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() =>
      useAppMutation('fake-object', {
        query: { queryParam1: 'testValue', queryParam2: 6 },
      })
    );

    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      'fake-object',
      { queryParam1: 'testValue', queryParam2: 6 },
    ]);

    await act(async () => {
      const payload = { item: { myField: 'value' } };
      await hook.mutateAsync({ ...payload });
      expect(httpPostMock).toHaveBeenCalledWith('fake-object', {
        payload,
        query: { queryParam1: 'testValue', queryParam2: 6 },
      });
    });
  });

  test('query call with path param and query object', async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() =>
      useAppMutation('fake-object/:id', {
        pathParams: { id: 1 },
        query: { queryParam1: 'testValue', queryParam2: 6 },
      })
    );

    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      'fake-object/:id',
      { id: 1 },
      { queryParam1: 'testValue', queryParam2: 6 },
    ]);

    await act(async () => {
      const payload = { item: { myField: 'value' } };
      await hook.mutateAsync({ ...payload });
      expect(httpPostMock).toHaveBeenCalledWith('fake-object/:id', {
        payload,
        pathParams: { id: 1 },
        query: { queryParam1: 'testValue', queryParam2: 6 },
      });
    });
  });

  test('query call with extraRoutePath', async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() =>
      useAppMutation('fake-object/:id', {
        pathParams: { id: 1 },
        query: { queryParam1: 'testValue', queryParam2: 6 },
        extraRoutePath: 'extra-route-path',
      })
    );

    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];
    console.log('query parameter', queryKeyParameter);
    expect(queryKeyParameter).toEqual([
      'fake-object/:id',
      'extra-route-path',
      { id: 1 },
      { queryParam1: 'testValue', queryParam2: 6 },
    ]);

    await act(async () => {
      const payload = { item: { myField: 'value' } };
      await hook.mutateAsync({ ...payload });
      expect(httpPostMock).toHaveBeenCalledWith('fake-object/:id', {
        payload,
        pathParams: { id: 1 },
        query: { queryParam1: 'testValue', queryParam2: 6 },
        extraRoutePath: 'extra-route-path',
      });
    });
  });

  test('query call with extraRoutePath array', async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() =>
      useAppMutation('fake-object/:id', {
        pathParams: { id: 1 },
        query: { queryParam1: 'testValue', queryParam2: 6 },
        extraRoutePath: ['extra-route-path1', 'extra-route-path2'],
      })
    );
    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      'fake-object/:id',
      ['extra-route-path1', 'extra-route-path2'],
      { id: 1 },
      { queryParam1: 'testValue', queryParam2: 6 },
    ]);

    await act(async () => {
      const payload = { item: { myField: 'value' } };
      await hook.mutateAsync({ ...payload });
      expect(httpPostMock).toHaveBeenCalledWith('fake-object/:id', {
        payload,
        pathParams: { id: 1 },
        query: { queryParam1: 'testValue', queryParam2: 6 },
        extraRoutePath: ['extra-route-path1', 'extra-route-path2'],
      });
    });
  });

  test('typings are correct', async () => {
    type MutationResulType<Res, Payload> = rq.UseMutationResult<
      Res,
      any,
      Payload & {
        _pathParams?:
          | {
              [key: string]: any;
            }
          | undefined;
      },
      any
    >;

    {
      const {
        result: { current: hook },
      } = await waitForHook(() => useAppMutation('fake-object'));

      expectType<MutationResulType<MyObject, DefaultSaveOnePayload<MyObject>>>(
        hook
      );
    }

    {
      const {
        result: { current: hook },
      } = await waitForHook(() => useAppMutation('fake-object/:id'));

      expectType<MutationResulType<MyObject, DefaultSaveOnePayload<MyObject>>>(
        hook
      );
    }
  });
});
