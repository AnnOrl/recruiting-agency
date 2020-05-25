import { createStore, AnyAction } from 'redux';
import { redusers } from './redusers';
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
// create a makeStore function
const makeStore = (context: Context) => createStore(redusers);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
