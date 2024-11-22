import feedSlice, { getFeeds, initialState } from './feedSlice';

describe('тестирование редьюсера feedSlice', () => {
  
  describe('Группа тестов для асинхронного GET экшена getFeeds', () => {
    // Определяем различные состояния экшена
    const actions = {
      pending: {
        type: getFeeds.pending.type,
        payload: null
      },
      rejected: {
        type: getFeeds.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getFeeds.fulfilled.type,
        payload: { orders: ['order1', 'order2'] } // Ожидаемые данные заказов
      }
    };

    test('Тест для состояния getFeeds.pending', () => {
      const state = feedSlice(initialState, actions.pending);
      expect(state.loading).toBe(true); // Проверяем, что загрузка начата
      expect(state.error).toBe(actions.pending.payload); // Ошибка должна быть null
    });

    test('Тест для состояния getFeeds.rejected', () => {
      const state = feedSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false); // Проверяем, что загрузка завершена
      expect(state.error).toBe(actions.rejected.error.message); // Проверяем сообщение об ошибке
    });

    test('Тест для состояния getFeeds.fulfilled', () => {
      const nextState = feedSlice(initialState, actions.fulfilled);
      expect(nextState.loading).toBe(false); // Проверяем, что загрузка завершена
      expect(nextState.orders).toEqual(actions.fulfilled.payload.orders); // Проверяем, что заказы обновлены
    });
  });
});
