import { CHANGE_FILTER, visibilityFilters } from "../actionTypes";
import * as actions from "../actionTypes";
let lastId = 0;

export function visibilityFilter(state = visibilityFilters.SHOW_ALL, action) {
	if (action.type === CHANGE_FILTER) return action.payload.visibilityFilter;
	else return state;
}

export function bugs(state = [], action) {
	switch (action.type) {
		case actions.BUG_ADDED:
			if (action.payload.description === "") return state;
			return [
				...state,
				{
					id: ++lastId,
					description: action.payload.description,
					resolved: false,
				},
			];

		case actions.BUG_REMOVED:
			return state.filter((bug) => bug.id !== action.payload.id);

		case actions.BUG_RESOLVED:
			return state.map((bug) =>
				bug.id !== action.payload.id ? bug : { ...bug, resolved: !bug.resolved }
			);

		case actions.BUG_UPDATED:
			return state.map((bug) =>
				bug.id !== action.payload.id
					? bug
					: { ...bug, description: action.payload.description }
			);

		default:
			return state;
	}
}
