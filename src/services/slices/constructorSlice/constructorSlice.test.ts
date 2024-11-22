import constructorSlice, {
    addIngredient,
    initialState,
    moveIngredientDown,
    moveIngredientUp,
    orderBurger,
    removeIngredient
  } from './constructorSlice';
  import { expect, test, describe } from '@jest/globals';
  
  describe('Тестирование редьюсера constructorSlice', () => {
    
    describe('Тестирование экшена добавления ингредиента', () => {
      const initialState = {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        loading: false,
        orderRequest: false,
        orderModalData: null,
        error: null
      };
  
      const expectedResult = {
        ...initialState,
        constructorItems: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa0943',
              name: 'Соус фирменный Space Sauce',
              type: 'sauce',
              proteins: 50,
              fat: 22,
              carbohydrates: 11,
              calories: 14,
              price: 80,
              image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
            }
          ]
        }
      };
  
      test('Тест на добавление ингредиента в массив ingredients', () => {
        const newState = constructorSlice(
          initialState,
          addIngredient({
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
          })
        );
  
        const ingredient = newState.constructorItems.ingredients[0];
        const expectedIngredient = expectedResult.constructorItems.ingredients[0];
  
        // Проверяем, что добавленный ингредиент соответствует ожидаемому
        expect(ingredient).toEqual({
          ...expectedIngredient,
          id: expect.any(String) // Идентификатор должен быть строкой
        });
      });
  
      // Тест на добавление булки в пустое поле
      test('Добавление булки в пустое поле', () => {
        const newState = constructorSlice(
          initialState,
          addIngredient({
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
          })
        );
  
        const bun = newState.constructorItems.bun;
        const expectedBun = expectedResult.constructorItems.bun;
  
        // Проверяем, что булка добавлена корректно
        expect(bun).toEqual({
          ...expectedBun,
          id: expect.any(String)
        });
      });
  
      test('Тест на замену ранее добавленной булки', () => {
        const initialStateWithBun = {
          constructorItems: {
            bun: {
              _id: '643d69a5c3f7b9001cfa093c',
              name: 'Краторная булка N-200i',
              type: 'bun',
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              id: 'its so funny =D',
              price: 1255,
              image: 'https://code.s3.yandex.net/react/code/bun-02.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
            },
            ingredients: []
          },
          loading: false,
          orderRequest: false,
          orderModalData: null,
          error: null
        };
  
        const expectedResultForBuns = {
          ...initialStateWithBun,
          constructorItems: {
            bun: {
              _id: '643d69a5c3f7b9001cfa093d',
              name: 'Флюоресцентная булка R2-D3',
              type: 'bun',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/bun-01.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
            },
            ingredients: []
          }
        };
  
        const newState = constructorSlice(
          initialStateWithBun,
          addIngredient({
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
          })
        );
  
        const bun = newState.constructorItems.bun;
        const expectedBun = expectedResultForBuns.constructorItems.bun;
  
        // Проверяем, что булка была заменена корректно
        expect(bun).toEqual({
          ...expectedBun,
          id: expect.any(String)
        });
      });
    });
  
    // Тестирование экшена удаления ингредиента
    describe('Тестирование экшена removeIngredient', () => {
      const initialState = {
        constructorItems: {
          bun: null,
          ingredients: [
            {
              id: 'funny',
              _id: '643d69a5c3f7b9001cfa0944',
              name: 'Соус традиционный галактический',
              type: 'sauce',
              proteins: 42,
              fat: 24,
              carbohydrates: 42,
              calories: 99,
              price: 15,
              image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
            }
          ]
        },
        loading: false,
        orderRequest: false,
        orderModalData: null,
        error: null
      };
  
      const expectedResult = {
        ...initialState,
        constructorItems: {
          bun: null,
          ingredients: []
        }
      };
  
      // Тест на удаление ингредиента из конструктора
      test('Удаление ингредиента из конструктора', () => {
        const newState = constructorSlice(
          initialState,
          removeIngredient('funny')
        );
  
        const received = newState.constructorItems.ingredients;
        const expected = expectedResult.constructorItems.ingredients;
  
        // Проверяем, что ингредиент был удален корректно
        expect(expected).toEqual(received);
      });
    });
  
    describe('Тестирование экшенов перемещения: moveIngredientUp & moveIngredientDown', () => {
      const initialState = {
        constructorItems: {
          bun: {
            id: 'funBun',
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: [
            {
              id: 'funnyPig1',
              _id: '643d69a5c3f7b9001cfa0944',
              name: 'Соус традиционный галактический',
              type: 'sauce',
              proteins: 42,
              fat: 24,
              carbohydrates: 42,
              calories: 99,
              price: 15,
              image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
            },
            {
              id: 'funnyPig2',
              _id: '643d69a5c3f7b9001cfa0946',
              name: 'Хрустящие минеральные кольца',
              type: 'main',
              proteins: 808,
              fat: 689,
              carbohydrates: 609,
              calories: 986,
              price: 300,
              image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
            },
            {
              id: 'funnyPig3',
              _id: '643d69a5c3f7b9001cfa0947',
              name: 'Плоды Фалленианского дерева',
              type: 'main',
              proteins: 20,
              fat: 5,
              carbohydrates: 55,
              calories: 77,
              price: 874,
              image: 'https://code.s3.yandex.net/react/code/sp_1.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
            }
          ]
        },
        loading: false,
        orderRequest: false,
        orderModalData: null,
        error: null
      };
  
      const expectedResult = {
        ...initialState,
        constructorItems: {
          bun: {
            id: 'funBun',
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: [
            {
              id: 'funnyPig1',
              _id: '643d69a5c3f7b9001cfa0944',
              name: 'Соус традиционный галактический',
              type: 'sauce',
              proteins: 42,
              fat: 24,
              carbohydrates: 42,
              calories: 99,
              price: 15,
              image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
            },
            {
              id: 'funnyPig3',
              _id: '643d69a5c3f7b9001cfa0947',
              name: 'Плоды Фалленианского дерева',
              type: 'main',
              proteins: 20,
              fat: 5,
              carbohydrates: 55,
              calories: 77,
              price: 874,
              image: 'https://code.s3.yandex.net/react/code/sp_1.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
            },
            {
              id: 'funnyPig2',
              _id: '643d69a5c3f7b9001cfa0946',
              name: 'Хрустящие минеральные кольца',
              type: 'main',
              proteins: 808,
              fat: 689,
              carbohydrates: 609,
              calories: 986,
              price: 300,
              image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
            }
          ]
        }
      };
  
      test('Тест на перемещение ингредиента на позицию выше', () => {
        const newState = constructorSlice(initialState, moveIngredientUp(2));
        const expected = expectedResult.constructorItems.ingredients;
        const received = newState.constructorItems.ingredients;
  
        // Проверяем, что ингредиенты переместились корректно
        expect(expected).toEqual(received);
      });
  
      // Тест на перемещение ингредиента на позицию ниже
      test('Перемещение ингредиента на позицию ниже', () => {
        const newState = constructorSlice(initialState, moveIngredientDown(1));
        const expected = expectedResult.constructorItems.ingredients;
        const received = newState.constructorItems.ingredients;
  
        // Проверяем, что ингредиенты переместились корректно
        expect(expected).toEqual(received);
      });
    });
  
    describe('Тестирование асинхронного POST экшена orderBurger', () => {
      const actions = {
        pending: {
          type: orderBurger.pending.type,
          payload: null
        },
        rejected: {
          type: orderBurger.rejected.type,
          error: { message: 'Funny mock-error' }
        },
        fulfilled: {
          type: orderBurger.fulfilled.type,
          payload: { order: { number: 404 } }
        }
      };
  
      // Тест на состояние при ожидании выполнения заказа
      test('Тест для состояния orderBurger.pending', () => {
        const state = constructorSlice(initialState, actions.pending);
        expect(state.loading).toBe(true); // Проверяем, что состояние загрузки активно
        expect(state.error).toBe(actions.pending.payload); // Проверяем, что ошибка равна null
      });
  
      // Тест на состояние при неудачном выполнении заказа
      test('Тест для состояния orderBurger.rejected', () => {
        const state = constructorSlice(initialState, actions.rejected);
        expect(state.loading).toBe(false); // Проверяем, что состояние загрузки не активно
        expect(state.error).toBe(actions.rejected.error.message); // Проверяем, что ошибка соответствует ожидаемой
        expect(state.orderModalData).toBe(null); // Проверяем, что данные модального окна равны null
      });
  
      // Тест на состояние при успешном выполнении заказа
      test('Тест для состояния orderBurger.fulfilled', () => {
        const state = constructorSlice(initialState, actions.fulfilled);
        expect(state.loading).toBe(false); // Проверяем, что состояние загрузки не активно
        expect(state.error).toBe(null); // Проверяем, что ошибки нет
        expect(state.orderModalData?.number).toBe(actions.fulfilled.payload.order.number); // Проверяем, что номер заказа соответствует ожидаемому
      });
    });
  });
  