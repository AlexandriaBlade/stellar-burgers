import userSlice, {
    getUser ,
    getOrdersAll,
    initialState,
    registerUser ,
    loginUser ,
    updateUser ,
    logoutUser 
  } from './userSlice';
  
  describe('тестирование редьюсера userSlice', () => {
    
    describe('Группа тестов для асинхронного GET экшена getUser ', () => {
      // Определяем различные состояния экшена
      const actions = {
        pending: {
          type: getUser .pending.type,
          payload: null
        },
        rejected: {
          type: getUser .rejected.type,
          payload: null
        },
        fulfilled: {
          type: getUser .fulfilled.type,
          payload: { user: { name: 'someName', email: 'someEmail' } }
        }
      };
  
      test('Тест для состояния getUser .pending', () => {
        const state = userSlice(initialState, actions.pending);
        expect(state.request).toBe(false); // Проверяем, что запрос не в процессе
        expect(state.error).toBe(actions.pending.payload); // Ошибка должна быть null
      });
 
      test('Тест для состояния getUser .rejected', () => {
        const state = userSlice(initialState, actions.rejected);
        expect(state.request).toBe(false); // Проверяем, что запрос завершен
        expect(state.error).toBe(actions.rejected.payload); // Ошибка должна быть null
      });
  
      test('Тест для состояния getUser .fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.request).toBe(false); // Проверяем, что запрос завершен
        expect(nextState.userData).toEqual(actions.fulfilled.payload.user); // Проверяем данные пользователя
      });
    });
  
    describe(' Группа тестов для асинхронного GET экшена getOrdersAll', () => {
      const actions = {
        pending: {
          type: getOrdersAll.pending.type,
          payload: null
        },
        rejected: {
          type: getOrdersAll.rejected.type,
          error: { message: 'Funny mock-error' }
        },
        fulfilled: {
          type: getOrdersAll.fulfilled.type,
          payload: ['order1', 'order2']
        }
      };
  
      test('Тест для состояния getOrdersAll.pending', () => {
        const state = userSlice(initialState, actions.pending);
        expect(state.request).toBe(true); // Запрос должен быть в процессе
        expect(state.error).toBe(actions.pending.payload); // Ошибка должна быть null
      });
  
      test('Тест для состояния getOrdersAll.rejected', () => {
        const state = userSlice(initialState, actions.rejected);
        expect(state.request).toBe(false); // Запрос должен завершиться
        expect(state.error).toBe(actions.rejected.error.message); // Проверяем сообщение об ошибке
      });
  
      test('Тест для состояния getOrdersAll.fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.request).toBe(false); // Запрос должен завершиться
        expect(nextState.userOrders).toEqual(actions.fulfilled.payload); // Проверяем заказы
      });
    });
  
    describe('Группа тестов для асинхронного POST экшена registerUser', () => {
      const actions = {
        pending: {
          type: registerUser .pending.type,
          payload: null
        },
        rejected: {
          type: registerUser .rejected.type,
          error: { message: 'Funny mock-error' }
        },
        fulfilled: {
          type: registerUser .fulfilled.type,
          payload: { user: { name: 'someName', email: 'someEmail' } }
        }
      };
  
      test('Тест для состояния registerUser .pending', () => {
        const nextState = userSlice(initialState, actions.pending);
        expect(nextState.request).toBe(true); // Запрос должен быть в процессе
        expect(nextState.error).toBe(actions.pending.payload); // Ошибка должна быть null
      });
  
      test('Тест для состояния registerUser .rejected', () => {
        const nextState = userSlice(initialState, actions.rejected);
        expect(nextState.request).toBe(false); // Запрос должен завершиться
        expect(nextState.error).toBe(actions.rejected.error.message); // Проверяем сообщение об ошибке
      });
  
      test('Тест для состояния registerUser .fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.request).toBe(false); // Запрос должен завершиться
        expect(nextState.error).toBe(null); // Ошибка должна быть null
        expect(nextState.userData).toEqual(actions.fulfilled.payload.user); // Проверяем данные пользователя
      });
    });
   
    describe('Группа тестов для асинхронного POST экшена loginUser', () => {
      const actions = {
        pending: {
          type: loginUser .pending.type,
          payload: null
        },
        rejected: {
          type: loginUser .rejected.type,
          error: { message: 'Funny mock-error' }
        },
        fulfilled: {
          type: loginUser .fulfilled.type,
          payload: { user: { name: 'someName', email: 'someEmail' } }
        }
      };
  
      test('Тест для состояния pending', () => {
        const nextState = userSlice(initialState, actions.pending);
        expect(nextState.loginUserRequest).toBe(true); // Запрос должен быть в процессе
        expect(nextState.isAuthChecked).toBe(true); // Проверяем, что аутентификация проверяется
        expect(nextState.isAuthenticated).toBe(false); // Проверяем, что пользователь не аутентифицирован
        expect(nextState.error).toBe(actions.pending.payload); // Ошибка должна быть null
      });
  
      test('Тест для состояния rejected', () => {
        const nextState = userSlice(initialState, actions.rejected);
        expect(nextState.isAuthChecked).toBe(false); // Проверяем, что аутентификация завершена
        expect(nextState.isAuthenticated).toBe(false); // Проверяем, что пользователь не аутентифицирован
        expect(nextState.loginUserRequest).toBe(false); // Запрос должен завершиться
        expect(nextState.error).toBe(actions.rejected.error.message); // Проверяем сообщение об ошибке
      });
  
      test('Тест для состояния fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.isAuthChecked).toBe(false); // Проверяем, что аутентификация завершена
        expect(nextState.isAuthenticated).toBe(true); // Проверяем, что пользователь аутентифицирован
        expect(nextState.loginUserRequest).toBe(false); // Запрос должен завершиться
        expect(nextState.error).toBe(null); // Ошибка должна быть null
        expect(nextState.userData).toEqual(actions.fulfilled.payload.user); // Проверяем данные пользователя
      });
    });
  
    describe('Группа тестов для асинхронного PATCH экшена updateUser', () => {
      const actions = {
        pending: {
          type: updateUser .pending.type,
          payload: null
        },
        rejected: {
          type: updateUser .rejected.type,
          error: { message: 'Funny mock-error' }
        },
        fulfilled: {
          type: updateUser .fulfilled.type,
          payload: { user: { name: 'someName', email: 'someEmail' } }
        }
      };
  
      test('Тест для состояния updateUser .pending', () => {
        const nextState = userSlice(initialState, actions.pending);
        expect(nextState.request).toBe(true); // Запрос должен быть в процессе
        expect(nextState.error).toBe(actions.pending.payload); // Ошибка должна быть null
      });
  
      test('Тест для состояния updateUser .rejected', () => {
        const nextState = userSlice(initialState, actions.rejected);
        expect(nextState.request).toBe(false); // Запрос должен завершиться
        expect(nextState.error).toBe(actions.rejected.error.message); // Проверяем сообщение об ошибке
      });
  
      test('Тест для состояния updateUser .fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.request).toBe(false); // Запрос должен завершиться
        expect(nextState.error).toBe(null); // Ошибка должна быть null
        expect(nextState.response).toEqual(actions.fulfilled.payload.user); // Проверяем обновленные данные пользователя
      });
    });
   
    describe('Группа тестов для асинхронного POST экшена logoutUser', () => {
      const actions = {
        pending: {
          type: logoutUser .pending.type,
          payload: null
        },
        rejected: {
          type: logoutUser .rejected.type,
          error: { message: 'Funny mock-error' }
        },
        fulfilled: {
          type: logoutUser .fulfilled.type,
          payload: null
        }
      };
  
      test('Тест для состояния logoutUser .pending', () => {
        const nextState = userSlice(initialState, actions.pending);
        expect(nextState.request).toBe(true); // Запрос должен быть в процессе
        expect(nextState.isAuthChecked).toBe(true); // Проверяем, что аутентификация проверяется
        expect(nextState.isAuthenticated).toBe(true); // Проверяем, что пользователь аутентифицирован
        expect(nextState.error).toBe(actions.pending.payload); // Ошибка должна быть null
      });
  
      test('Тест для состояния  logoutUser .rejected', () => {
        const nextState = userSlice(initialState, actions.rejected);
        expect(nextState.isAuthChecked).toBe(false); // Проверяем, что аутентификация завершена
        expect(nextState.isAuthenticated).toBe(true); // Проверяем, что пользователь все еще аутентифицирован
        expect(nextState.request).toBe(false); // Запрос должен завершиться
        expect(nextState.error).toBe(actions.rejected.error.message); // Проверяем сообщение об ошибке
      });
  
      test('Тест для состояния logoutUser .fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.isAuthChecked).toBe(false); // Проверяем, что аутентификация завершена
        expect(nextState.isAuthenticated).toBe(false); // Проверяем, что пользователь не аутентифицирован
        expect(nextState.request).toBe(false); // Запрос должен завершиться
        expect(nextState.error).toBe(null); // Ошибка должна быть null
        expect(nextState.userData).toBe(actions.fulfilled.payload); // Проверяем, что данные пользователя очищены
      });
    });
  });
  