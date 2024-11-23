import orderSlice, { initialState, getOrderByNumber } from './orderSlice';

describe('Тестирование редьюсера orderSlice', () => {
  
  describe('Группа тестов для асинхронного POST экшена getOrderByNumber', () => {
    // Определяем различные состояния экшена
    const actions = {
      pending: {
        type: getOrderByNumber.pending.type,
        payload: null
      },
      rejected: {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: ['someOrder'] }
      }
    };

    test('Тест для состояния getOrderByNumber.pending', () => {
      const nextState = orderSlice(initialState, actions.pending);
      expect(nextState.request).toBe(true); // Запрос должен быть в процессе
      expect(nextState.error).toBe(actions.pending.payload); // Ошибка должна быть null
    });

    test('Тест для состояния getOrderByNumber.rejected', () => {
      const nextState = orderSlice(initialState, actions.rejected);
      expect(nextState.request).toBe(false); // Запрос должен завершиться
      expect(nextState.error).toBe(actions.rejected.error.message); // Проверяем сообщение об ошибке
    });

    test('Тест для состояния getOrderByNumber.fulfilled', () => {
      const nextState = orderSlice(initialState, actions.fulfilled);
      expect(nextState.request).toBe(false); // Запрос должен завершиться
      expect(nextState.error).toBe(null); // Ошибка должна быть null
      expect(nextState.orderByNumberResponse).toBe(
        actions.fulfilled.payload.orders[0] // Проверяем, что ответ содержит ожидаемый заказ
      );
    });
  });
});
