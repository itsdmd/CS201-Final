console.log("homepage.js loaded");

import { CATEGORIES as REUTERS_CTG } from "./data/reuters_ctg.js";
import { CATEGORIES as WIKIMEDIA_CTG } from "./data/wikimedia_ctg.js";

/* ---------------------------------- */
/*              Variables             */
/* ---------------------------------- */
/* -------------- Const ------------- */
const SRC_OPTIONS = {
	Reuters: {
		headersEntries: [
			{
				name: "X-RapidAPI-Key",
				value: "",
			},
			{
				name: "X-RapidAPI-Host",
				value: "reuters-business-and-financial-news.p.rapidapi.com",
			},
		],
		url: "https://reuters-business-and-financial-news.p.rapidapi.com",
		categories: REUTERS_CTG,
	},
	Wikimedia: {
		headersEntries: [
			{
				name: "Authorization",
				value: "",
			},
			{
				name: "Api-User-Agent",
				value: "", // TODO: Get API host
			},
		],
		url: "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday",
		categories: WIKIMEDIA_CTG,
	},
};
const START_YEAR = 2014;
const RPP_OPTIONS = [5, 10, 15, 20, 50, 100];

/* -------------- Value ------------- */
let g_apiKey = "";

/* ------------- Element ------------ */
let e_paramContainer = document.querySelector(".param-container");
let e_dateContainer = document.querySelector(".param-date-container");
let e_dateDay = document.querySelector(".param-date-day");
let e_dateMonth = document.querySelector(".param-date-month");
let e_dateYear = document.querySelector(".param-date-year");
let e_dateError = document.querySelector(".param-date-error");
let e_randomBtn = document.querySelector(".param-date-rand");
let e_src = document.querySelector(".param-src");
let e_ctg = document.querySelector(".param-ctg");
let e_rpp = document.querySelector(".param-rpp");
let e_api = document.querySelector(".param-api");
let e_apiError = document.querySelector(".param-api-error");
let e_submitBtn = document.querySelector(".param-submit");

/* ---------- EventListener --------- */
e_submitBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	console.log("param-submit clicked");

	g_apiKey = document.querySelector(".param-api").value;
	console.log("API Key: ", g_apiKey);

	console.log("Fetching...");
	// let query = await fetchArticles(constructFetchUrl("8", "01", "01", "2020"), constructApiConfigs(g_apiKey)); // Test
	let query = await fetchData(
		constructReutersFetchUrl("", e_dateDay.value, e_dateMonth.value, e_dateYear.value),
		constructApiConfigs(SRC_OPTIONS[e_src.value][0], g_apiKey)
	);
	console.log("Fetch result:", parseFetchedArticles(query));
});

e_dateContainer.addEventListener("focusout", () => {
	console.log("param-date-container focusout");

	let day = e_dateDay.value;
	let month = e_dateMonth.value;
	let year = e_dateYear.value;

	dateInvalidErrMsg(day, month, year);
	validateParams();
});

e_randomBtn.addEventListener("click", () => {
	console.log("param-date-rand clicked");

	populateRandomDate();
	dateInvalidErrMsg(e_dateDay.value, e_dateMonth.value, e_dateYear.value); // Avoid dangling error message

	validateParams();
});

e_src.addEventListener("change", () => {
	console.log("param-src changed to", e_src.value);
	populateCategorySelector(e_src.value);
});

e_ctg.addEventListener("change", () => {
	console.log("param-ctg changed to", e_ctg.value);
});

e_api.addEventListener("focusout", () => {
	console.log("param-api focusout");

	if (e_api.value === "" || e_api.value === null) {
		apiInvalidErrMsg(true, "API Key is empty!");
	} else {
		apiInvalidErrMsg(false);
	}

	validateParams();
});

/* ---------------------------------- */
/*              Functions             */
/* ---------------------------------- */

/* ---------- Initializing ---------- */
populateDropdownSelectors();
disableSubmitBtn(true);

/* ------------ Populate ------------ */
function populateDropdownSelectors() {
	// Day
	let output = '<option value="1" selected>Day</option>';
	for (let i = 1; i <= 31; i++) {
		output += `<option name="day" value="${i}">${i}</option>`;
	}
	e_dateDay.innerHTML = output;

	// Month
	output = `<option value="1" selected>Month</option>`;
	for (let i = 2; i <= 12; i++) {
		output += `<option name="month" value="${i}">${i}</option>`;
	}
	e_dateMonth.innerHTML = output;

	// Year
	let currentYear = new Date().getFullYear();
	output = `<option value="${START_YEAR}" selected>Year</option>`;
	for (let i = START_YEAR; i <= currentYear; i++) {
		output += `<option name="year" value="${i}">${i}</option>`;
	}
	e_dateYear.innerHTML = output;

	// Source
	output = "";
	for (const key in SRC_OPTIONS) {
		output += `<option name="src" value="${key}">${key}</option>`;
	}
	e_src.innerHTML = output;

	// Category
	populateCategorySelector();

	// Results per page
	output = `<option value="${RPP_OPTIONS[0]}" selected>${RPP_OPTIONS[0]}</option>`;
	RPP_OPTIONS.shift();
	RPP_OPTIONS.forEach((value) => {
		output += `<option name="rpp" value="${value}">${value}</option>`;
	});
	e_rpp.innerHTML = output;
}

function populateCategorySelector() {
	let output = "";

	SRC_OPTIONS[e_src.value].categories.forEach((entry) => {
		output += `<option name="ctg" value="${entry.id}">${entry.name}</option>`;
	});

	e_ctg.innerHTML = output;
}

function populateRandomDate() {
	let date = new Date();
	let currentYear = date.getFullYear();

	do {
		var day = RNG(1, 31);
		var month = RNG(1, 12);
		var year = RNG(START_YEAR, currentYear);

		var stringifiedDate = String(day + "-" + month + "-" + year);
	} while (!moment(stringifiedDate, "DD-MM-YYYY", false).isValid());

	e_dateDay.value = day;
	e_dateMonth.value = month;
	e_dateYear.value = year;
}

/* ------------- Construct ---------- */
function constructApiConfigs(source = e_src.value, key = e_api.value) {
	if (key === "" || key === null) {
		alert("API Key is empty!");
		console.log("param-api empty");
		return;
	}

	let keyEntry = SRC_OPTIONS[source][headersEntries][0].name;
	let hostEntry = SRC_OPTIONS[source][headersEntries][1].name;
	let hostValue = SRC_OPTIONS[source][headersEntries][1].value;

	return {
		method: "GET",
		headers: {
			[keyEntry]: key,
			[hostEntry]: hostValue,
		},
	};
}

function constructReutersFetchUrl(ctgID, day, month, year) {
	let url = `https://${SRC_OPTIONS[e_src.value].url}/`;
	let ctgUrl_1 = "";
	let ctgUrl_2 = "";
	let dateUrl_1 = "";
	let dateUrl_2 = "";

	if (ctgID !== "" && ctgID !== null) {
		ctgUrl_1 = `category-id/${ctgID}/`;
		ctgUrl_2 = `category-id=${ctgID}`;
	}

	if (day === "" || day === null || month === "" || month === null || year === "" || year === null) {
		console.log("Date is required");
		return;
	} else {
		dateUrl_1 = `article-date/${day}-${month}-${year}`;
		dateUrl_2 = `ArticleDate=${day}-${month}-${year}`;
	}

	if (ctgUrl_1 !== "" && ctgUrl_1 !== null) {
		url = `${url}${ctgUrl_1}${dateUrl_1}?${ctgUrl_2}&${dateUrl_2}`;
	} else {
		url = `${url}${dateUrl_1}`;
	}

	console.log("Fetch URL: ", url);
	return url;
}

/* -------------- Parse ------------- */
function parseFetchedArticles(data) {
	let parsedArray = [];

	console.log("Data: ", data);

	if (data.length === 0) {
		alert("No articles found!");
		return;
	}

	// Template data structure: /{root}/docs/api_example_article_resp.json
	data.forEach((a) => {
		let parsedArticle = {
			url: a.urlSupplier,
			title: a.articlesName,
			summary: a.articlesShortDescription,
			content: a.articlesDescription,

			imgUrl: a.files[0].urlCdn,
			imgDesc: a.files[0].fileDescription,

			authors: a.authors,
			pubDate: a.publishedAt,
			minutesToRead: a.minutesToRead,
		};

		parsedArray.push(parsedArticle);
	});

	return parsedArray;
}

/* ------------- Generic ------------ */
function RNG(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/* ------------ Behavior ------------ */
function dateInvalidErrMsg(day, month, year) {
	let stringifiedDate = String(day + "-" + month + "-" + year);

	if (moment(stringifiedDate, "DD-MM-YYYY", false).isValid()) {
		e_dateError.classList.remove("error");
		// console.log("Valid date:", stringifiedDate);
	} else {
		e_dateError.classList.add("error");
		// console.log("Invalid date:", stringifiedDate);
	}
}

function apiInvalidErrMsg(show = true, msg = "") {
	if (show) {
		e_apiError.innerHTML = msg;
		e_apiError.classList.add("error");
		console.log("API error:", msg);
	} else {
		e_apiError.classList.remove("error");
		console.log("API error cleared");
	}
}

function disableSubmitBtn(state = true) {
	if (state) {
		e_submitBtn.setAttribute("disabled", "");
		console.log("param-submit disabled");
	} else {
		e_submitBtn.removeAttribute("disabled");
		console.log("param-submit enabled");
	}
}

function validateParams() {
	let valid = true;

	e_paramContainer.querySelectorAll("small").forEach((small) => {
		if (small.classList.contains("error")) {
			valid = false;
		}
	});

	e_paramContainer.querySelectorAll(".required").forEach((input) => {
		if (input.value === "" || input.value === null) {
			valid = false;
		}
	});

	disableSubmitBtn(!valid);
}

/* ------------- Async ------------- */
async function fetchData(url, config) {
	let result = null;

	await fetch(url, config)
		.then((response) => response.json())
		.then((data) => {
			result = data;
		})
		.catch((err) => {
			console.error(err);
			apiInvalidErrMsg(true, "Fetching failed. Error message:", err);
		});

	return result;
}
