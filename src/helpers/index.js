// counts frequency by property
export const countBy = (array, prop) => {
	return array
		.map((element) => element[prop])
		.reduce((accumulator, value) => {
			const count = accumulator[value] || 0;
			accumulator[value] = count + 1;
			return accumulator;
		}, {});
};

// sorts obj keys based on values
export const sort = (list) =>  {
	return Object
		.keys(list)
		.sort((a,b) => list[b]-list[a]);
};

// removes duplicates
export const unique = (list, prop) => {
	return Array.from(new Set(list.map(a => a[prop])))
		.map(element => {
			return list.find(a => a[prop] === element);
		})
};