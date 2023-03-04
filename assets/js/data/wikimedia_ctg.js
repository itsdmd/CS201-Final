const CATEGORIES = [
	{
		id: "selected",
		name: "Highlights",
		desc: "Curated set of events that occurred on the given date",
	},
	{
		id: "births",
		name: "Births",
		desc: "Notable people born on the given date",
	},
	{
		id: "deaths",
		name: "Deaths",
		desc: "Notable people who died on the given date",
	},
	{
		id: "holidays",
		name: "Holidays",
		desc: "Fixed holidays celebrated on the given date",
	},
	{
		id: "events",
		name: "Events",
		desc: "Events that occurred on the given date that are not included in another type",
	},
];

CATEGORIES.sort((a, b) => a.name.localeCompare(b.name));
CATEGORIES.unshift({ id: "all", name: "All" });

export { CATEGORIES };
