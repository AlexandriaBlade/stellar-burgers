import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

// Константы для повторяющихся объектов
const bun = {
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
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'unique-bun-id' // Убедитесь, что id уникален
};

const sauce = {
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
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  id: 'unique-sauce-id' // Убедитесь, что id уникален
};

describe('Тестирование редьюсера constructorSlice', () => {
  
  describe('Тестирование экшена добавления ингредиента', () => {
    test('Тест на добавление ингредиента в массив ingredients', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient(sauce)
      );

      const ingredient = newState.constructorItems.ingredients[0];

      // Проверяем, что добавленный ингредиент соответствует ожидаемому
      expect(ingredient).toEqual({
        ...sauce,
        id: expect.any(String) // Идентификатор должен быть строкой
      });
    });

    test('Добавление булки в пустое поле', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient(bun)
      );

      const addedBun = newState.constructorItems.bun;

      // Проверяем, что булка добавлена корректно
      expect(addedBun).toEqual({
        ...bun // Убедитесь, что id не переопределяется
      });
    });

    test('Тест на замену ранее добавленной булки', () => {
      const initialStateWithBun = {
        ...initialState,
        constructorItems: {
          bun: {
            ...bun,
            id: 'its so funny =D' // Убедитесь, что id уникален
          },
          ingredients: []
        }
      };

      const newBun = {
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        id: 'new-bun-id' // Убедитесь, что id уникален
      };

      const newState = constructorSlice(
        initialStateWithBun,
        addIngredient(newBun)
      );

      const addedBun = newState.constructorItems.bun;

      // Проверяем, что булка была заменена корректно
      expect(addedBun).toEqual({
        ...newBun // Убедитесь, что id не переопределяется
      });
    });
  });

  describe('Тестирование экшена removeIngredient', () => {
    const initialStateWithIngredient = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          {
            id: 'funny',
            ...sauce
          }
        ]
      }
    };

    test('Удаление ингредиента из конструктора', () => {
      const newState = constructorSlice(
        initialStateWithIngredient,
        removeIngredient('funny')
      );

      const received = newState.constructorItems.ingredients;

      // Проверяем, что ингредиент был удален корректно
      expect(received).toEqual([]);
    });
  });

  describe('Тестирование экшенов перемещения: moveIngredientUp & moveIngredientDown', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: bun,
        ingredients: [
          {
            id: 'funnyPig1',
            ...sauce
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
            image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
            id: 'funnyPig2-id' // Убедитесь, что id уникален
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
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
            id: 'funnyPig3-id' // Убедитесь, что id уникален
          }
        ]
      }
    };

    test('Тест на перемещение ингредиента на позицию выше', () => {
      const newState = constructorSlice(initialStateWithIngredients, moveIngredientUp(2));
      const expectedIngredients = [
        {
          id: 'funnyPig1',
          ...sauce
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
      ];

      expect(newState.constructorItems.ingredients).toEqual(expectedIngredients);
    });

    test('Перемещение ингредиента на позицию ниже', () => {
      const newState = constructorSlice(initialStateWithIngredients, moveIngredientDown(1));
      const expectedIngredients = [
        {
          id: 'funnyPig1',
          ...sauce
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
      ];

      expect(newState.constructorItems.ingredients).toEqual(expectedIngredients);
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

    test('Тест для состояния orderBurger.pending', () => {
      const state = constructorSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    test('Тест для состояния orderBurger.rejected', () => {
      const state = constructorSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
      expect(state.orderModalData).toBe(null);
    });

    test('Тест для состояния orderBurger.fulfilled', () => {
      const state = constructorSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.orderModalData?.number).toBe(actions.fulfilled.payload.order.number);
    });
  });
});
