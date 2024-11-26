import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

// Константы для тестовых данных
const bunData = {
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
};

const sauceData = {
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
};

const anotherBunData = {
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
};

// Обновленный код тестов
describe('Тестирование редьюсера constructorSlice', () => {
  
  describe('Тестирование экшена добавления ингредиента', () => {
    
    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: { ...bunData, id: expect.any(String) }, // Используем spread-операцию
        ingredients: [
          { ...sauceData, id: expect.any(String) } // Используем spread-операцию
        ]
      }
    };

    test('Тест на добавление ингредиента в массив ingredients', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient({ ...sauceData })
      );

      const ingredient = newState.constructorItems.ingredients[0];
      const expectedIngredient = expectedResult.constructorItems.ingredients[0];

      expect(ingredient).toEqual(expectedIngredient);
    });

    test('Добавление булки в пустое поле', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient({ ...bunData })
      );

      const bun = newState.constructorItems.bun;
      const expectedBun = expectedResult.constructorItems.bun;

      expect(bun).toEqual(expectedBun);
    });

    test('Тест на замену ранее добавленной булки', () => {
      const initialStateWithBun = {
        ...initialState,
        constructorItems: {
          bun: { ...bunData, id: 'its so funny =D' },
          ingredients: []
        }
      };

      const expectedResultForBuns = {
        ...initialStateWithBun,
        constructorItems: {
          bun: { ...anotherBunData, id: expect.any(String) },
          ingredients: []
        }
      };

      const newState = constructorSlice(
        initialStateWithBun,
        addIngredient({ ...anotherBunData })
      );

      const bun = newState.constructorItems.bun;
      const expectedBun = expectedResultForBuns.constructorItems.bun;

      expect(bun).toEqual(expectedBun);
    });
  });

  // Тестирование экшена удаления ингредиента
  describe('Тестирование экшена removeIngredient', () => {
    const initialStateWithIngredient = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          {
            id: 'funny',
            ...sauceData
          }
        ]
      }
    };

    const expectedResult = {
      ...initialStateWithIngredient,
      constructorItems: {
        bun: null,
        ingredients: []
      }
    };

    test('Удаление ингредиента из конструктора', () => {
      const newState = constructorSlice(
        initialStateWithIngredient,
        removeIngredient('funny')
      );

      const received = newState.constructorItems.ingredients;
      expect(expectedResult.constructorItems.ingredients).toEqual(received);
    });
  });

  describe('Тестирование экшенов перемещения: moveIngredientUp & moveIngredientDown', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: { ...bunData, id: 'funBun' },
        ingredients: [
          {
            id: 'funnyPig1',
            ...sauceData
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
            ...sauceData
          }
        ]
      }
    };

    const expectedResult = {
      ...initialStateWithIngredients,
      constructorItems: {
        bun: { ...bunData, id: 'funBun' },
        ingredients: [
          {
            id: 'funnyPig1',
            ...sauceData
          },
          {
            id: 'funnyPig3',
            ...sauceData
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
      const newState = constructorSlice(initialStateWithIngredients, moveIngredientUp(2));
      expect(expectedResult.constructorItems.ingredients).toEqual(newState.constructorItems.ingredients);
    });

    test('Перемещение ингредиента на позицию ниже', () => {
      const newState = constructorSlice(initialStateWithIngredients, moveIngredientDown(1));
      expect(expectedResult.constructorItems.ingredients).toEqual(newState.constructorItems.ingredients);
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
