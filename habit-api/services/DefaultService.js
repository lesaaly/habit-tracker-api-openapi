/* eslint-disable no-unused-vars */
const Service = require('./Service');

const habits = [];
let nextId = 1;

function findHabit(id) {
  const numId = parseInt(id, 10);
  return habits.find((h) => h.id === numId);
}

function habitIndex(id) {
  const numId = parseInt(id, 10);
  return habits.findIndex((h) => h.id === numId);
}

/**
* Получение списка всех привычек
*
* returns List
* */
const habitsGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse(habits));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Отметить выполнение привычки
*
* habitUnderscoreid Integer ID привычки
* returns Habit
* */
const habitsHabitIdCheckPOST = ({ habitUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      const habit = findHabit(habitUnderscoreid);
      if (!habit) {
        reject(Service.rejectResponse({ message: 'Привычка не найдена' }, 404));
        return;
      }
      habit.streak = (habit.streak || 0) + 1;
      resolve(Service.successResponse(habit));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Удаление привычки
*
* habitUnderscoreid Integer ID привычки
* no response value expected for this operation
* */
const habitsHabitIdDELETE = ({ habitUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      const idx = habitIndex(habitUnderscoreid);
      if (idx === -1) {
        reject(Service.rejectResponse({ message: 'Привычка не найдена' }, 404));
        return;
      }
      habits.splice(idx, 1);
      resolve(Service.successResponse(null, 204));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Получение информации о конкретной привычке
*
* habitUnderscoreid Integer ID привычки
* returns Habit
* */
const habitsHabitIdGET = ({ habitUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      const habit = findHabit(habitUnderscoreid);
      if (!habit) {
        reject(Service.rejectResponse({ message: 'Привычка не найдена' }, 404));
        return;
      }
      resolve(Service.successResponse(habit));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Создание новой привычки
*
* habitRequest HabitRequest
* returns Habit
* */
const habitsPOST = (params) => new Promise(
  async (resolve, reject) => {
    try {
      const habitRequest = params.habitRequest || params.body || params;
      const name = habitRequest && habitRequest.name ? String(habitRequest.name).trim() : '';
      if (!name) {
        reject(Service.rejectResponse({ message: 'name обязательно' }, 400));
        return;
      }
      const created_at = new Date().toISOString();
      const habit = {
        id: nextId++,
        name,
        description: habitRequest.description != null ? habitRequest.description : undefined,
        streak: 0,
        created_at,
      };
      habits.push(habit);
      resolve(Service.successResponse(habit, 201));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  habitsGET,
  habitsHabitIdCheckPOST,
  habitsHabitIdDELETE,
  habitsHabitIdGET,
  habitsPOST,
};
