import ingredientSlice, { getIngredients, initialState } from './ingredientSlice';

describe('Тестирование редьюсера ingredientSlice', () => {
  

  describe('Группа тестов для асинхронного GET экшена getIngredients', () => {
    // Определяем различные состояния экшена
    const actions = {
      pending: {
        type: getIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: ['ingr1', 'ingr2'] // Ожидаемые данные ингредиентов
      }
    };

    test('Тест для состояния getIngredients.pending', () => {
      const state = ingredientSlice(initialState, actions.pending);
      expect(state.loading).toBe(true); // Проверяем, что загрузка начата
      expect(state.error).toBe(actions.pending.payload); // Ошибка должна быть null
    });

    test('Тест для состояния getIngredients.rejected', () => {
      const state = ingredientSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false); // Проверяем, что загрузка завершена
      expect(state.error).toBe(actions.rejected.error.message); // Проверяем сообщение об ошибке
    });

    test('Тест для состояния getIngredients.fulfilled', () => {
      const nextState = ingredientSlice(initialState, actions.fulfilled);
      expect(nextState.loading).toBe(false); // Проверяем, что загрузка завершена
      expect(nextState.ingredients).toEqual(actions.fulfilled.payload); // Проверяем, что ингредиенты обновлены
    });
  });
});
