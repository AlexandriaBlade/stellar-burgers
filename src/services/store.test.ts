import store, { rootReducer } from '../services/store';

test(' Тестирование работы корневого редьюсера', () => {
  // Инициализация состояния редьюсера с помощью undefined и передачи неизвестного действия
  const initialState = undefined;
  const action = { type: 'UNKNOWN_ACTION' };

  // Ожидаемое состояние после вызова редьюсера с заданными параметрами
  const expectedState = rootReducer(initialState, action);

  // Сравниваем состояние, возвращаемое rootReducer, с состоянием в хранилище
  expect(expectedState).toEqual(store.getState());
});
