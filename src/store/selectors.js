import { selector } from 'recoil';
import { boardState } from './atoms';

export const boardDataSelector = selector({
  key: 'boardDataSelector',
  get: ({ get }) => {
    const form = get(boardState);
    return form;
  },
});
