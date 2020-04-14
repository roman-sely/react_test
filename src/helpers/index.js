import mockAircraft from '../MockData/aircrafts.json'

export const MS_PER_MINUTE = 60000;
export const MIN_PER_HOUR = 60;

export const getEndTime = () => {
  return Math.trunc(new Date().getTime() / 1000);
};

export const getBeginTime = (endTime, interval) => {
  return  Math.trunc( new Date(endTime * 1000 - interval * MS_PER_MINUTE).getTime() / 1000);
};

export const getMockArrayICAO = (duration) => {
  const mockLength = mockAircraft.length;
  const maxLengthOfMockData = duration > 150 ? 150 : duration;
  let arr = Array.from(new Array(maxLengthOfMockData));
  return arr.map(element => mockAircraft[randomInteger(0, mockLength - 1)]);
};

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const getIsLogin = () => {
  return  !!(localStorage.getItem('user'))
};

export const generateId = (payload = '') => {
  return payload + ' ' + Math.random().toString(36).substr(2, 9);
};
