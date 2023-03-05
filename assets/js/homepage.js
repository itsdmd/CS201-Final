console.log("homepage.js loaded");

import { CATEGORIES as REUTERS_CTG } from "./data/reuters_ctg.js";
import { CATEGORIES as WIKIMEDIA_CTG } from "./data/wikimedia_ctg.js";

/* ---------------------------------- */
/*              Variables             */
/* ---------------------------------- */
/* -------------- Const ------------- */
const FETCH_SOURCES = {
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
		hostUrl: "https://reuters-business-and-financial-news.p.rapidapi.com",
		fetchingUrlFn: constructReutersFetchUrl,
		parsingFn: parseReutersData,
		categories: REUTERS_CTG,
		startYear: 2014,
	},
	Wikimedia: {
		headersEntries: [
			{
				name: "Authorization",
				value: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMjYyMmM4NDYxZjIzNmNhY2UzYzEzMjFhNGFkODI4MCIsImp0aSI6ImM4ODE5ODk0ZTFlZTA1YmE3MWU5ZWUyMTk5YjQxOTA0ZmNkN2E5ZGU2YjA3Y2JmZjY1Zjc0ZDA4NmRkNDJlMzI1MDk3ZDgwYWIzNDNhZWQ4IiwiaWF0IjoxNjc3OTE2Mzc3LjQ5NDMxOSwibmJmIjoxNjc3OTE2Mzc3LjQ5NDMyMywiZXhwIjozMzIzNDgyNTE3Ny40OTMzOCwic3ViIjoiNzIxNTQ1MjYiLCJpc3MiOiJodHRwczovL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.Je-CBqnEKH4P1-b071lD7xw5p1GHvwbrAswCEek9wT-GZe0aPWtwgdSgFqgwbA1xOQehPXqxTK6uYoqtLowszLdLxsEDMjkIgysUjkbOe57ityL0aw4B9wPS89jPfoyd9B6pqO9rSjS-GOYX0Xc62ZmbrTBrp5HO6qg7tHSRoCGNuwHEPSjerwmlb9ZE0_5Kw-CKn8xlnpIQ1aU4VumbgdspnFcUUcuj4Hpzmb3wT7t3-Kf42BueZrfj0GiCT3WM3aYneJJ3SqbrKJlxdtQYrGS7oq5BaIaVGRAIPbSP0j-kd63cUjS7BDVlSwsLUvxX1FvIPTzSTiRdXr6mIKmTcl9m2tGYNF3SzEM-kxtFRLCtGJFTr0lg7Ao0eCA23feKpt-QIk7zkOWs-0KjHYOF_jto8PDkBxqMiAECxQsx5YIbWmdz_QHblLsytIwNY5WhDPzt863Ih5yPUDNBA_GQjr5Gt_fndlVgOLWnbIsGI0CQtUgSurXnn9Cj1-jet33FUx9vMMtAitgIDi1UmXzZkmERRoXhR48hN1AJYGF_-6cB1C0RdAm6X41vx9lFkGiwouMOp0KxnyTOyZMjELNYnNM9Sx2As8h2oJYbzfexBwJzDBGFHnrGAeGP8HTSRAZdQ9VBO15sTXBSMdAhGcRW4QXVozxYf_gmHCEs4fHvQ10",
			},
			{
				name: "Api-User-Agent",
				value: "CS201",
			},
		],
		hostUrl: "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday",
		fetchingUrlFn: constructWikimediaFetchUrl,
		parsingFn: parseWikimediaData,
		categories: WIKIMEDIA_CTG,
		startYear: 0,
	},
};
const RPP_OPTIONS = [5, 10, 15, 20, 50, 100];

/* -------------- Value ------------- */

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
let e_keywords = document.querySelector(".param-keyword");
let e_rpp = document.querySelector(".param-rpp");
let e_api = document.querySelector(".param-api");
let e_apiError = document.querySelector(".param-api-error");
let e_submitBtn = document.querySelector(".param-submit");

/* ---------- EventListener --------- */
e_submitBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	console.log("param-submit clicked");

	console.log("API Key: ", e_api.value);

	console.log("Fetching...");
	// let query = await fetchArticles(constructFetchUrl("8", "01", "01", "2020"), constructApiConfigs(e_api.value)); // Test
	let query = await fetchData(
		FETCH_SOURCES[e_src.value].fetchingUrlFn(e_ctg.value, e_dateDay.value, e_dateMonth.value, e_dateYear.value),
		constructApiConfigs(e_src.value, e_api.value)
	);

	console.log("Fetch result:", query);
	console.log("Parsed result:", FETCH_SOURCES[e_src.value].parsingFn(query));

	storeParams();
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
	populateDateYear();
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

window.onload = () => {
	if (localStorage.length > 0) {
		e_dateDay.value = localStorage.getItem("day");
		e_dateMonth.value = localStorage.getItem("month");
		e_dateYear.value = localStorage.getItem("year");
		e_ctg.value = localStorage.getItem("category");
		e_keywords.value = localStorage.getItem("keyword");
		e_rpp.value = localStorage.getItem("rpp");
	}
};

/* ------------ Populate ------------ */
function populateDropdownSelectors() {
	console.log("populateDropdownSelectors() called");

	// Day
	for (let i = 1; i <= 31; i++) {
		output += `<option name="day" value="${i}">${i}</option>`;
	}
	e_dateDay.innerHTML = output;

	// Month
	for (let i = 2; i <= 12; i++) {
		output += `<option name="month" value="${i}">${i}</option>`;
	}
	e_dateMonth.innerHTML = output;

	// Year
	populateDateYear();

	// Source
	output = "";
	for (const key in FETCH_SOURCES) {
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

function populateDateYear() {
	console.log("populateDateYear() called");

	let currentYear = new Date().getFullYear();
	let output = "";

	for (let i = currentYear; i >= FETCH_SOURCES[e_src.value].startYear; i--) {
		output += `<option name="year" value="${i}">${i}</option>`;
	}
	e_dateYear.innerHTML = output;
}

function populateCategorySelector() {
	console.log("populateCategorySelector() called");

	let output = "";

	FETCH_SOURCES[e_src.value].categories.forEach((entry) => {
		output += `<option name="ctg" value="${entry.id}">${entry.name}</option>`;
	});

	e_ctg.innerHTML = output;
}

function populateRandomDate() {
	console.log("populateRandomDate() called");

	let date = new Date();
	let currentYear = date.getFullYear();

	do {
		var day = RNG(1, 31);
		var month = RNG(1, 12);
		var year = RNG(FETCH_SOURCES[e_src.value].startYear, currentYear);

		var stringifiedDate = String(day + "-" + month + "-" + year);
	} while (!moment(stringifiedDate, "DD-MM-YYYY", false).isValid());

	e_dateDay.value = day;
	e_dateMonth.value = month;
	e_dateYear.value = year;
}

function populateResultCards(num, arr) {
	let output = "";
	for (let i = 0; i <= num; i++) {
		output += `<div class="col-md-6 mb-3">
					<div class="card p-3">
						<a href="#">
							<h4> ${arr[i].title}</h4>
						</a>
						<p> ${arr[i].summary} </p>
					</div>
				</div>`;
	}
	console.log("Cards printed");
	e_cardContainer.innerHTML = output;
}

/* ------------- Construct ---------- */
function constructApiConfigs(source = e_src.value, key = e_api.value) {
	if (key === "" || key === null) {
		alert("API Key is empty!");
		console.log("param-api empty");
		return;
	}

	let keyEntry = FETCH_SOURCES[source].headersEntries[0].name;
	let hostEntry = FETCH_SOURCES[source].headersEntries[1].name;
	let hostValue = FETCH_SOURCES[source].headersEntries[1].value;

	let returnObj = {
		method: "GET",
		headers: {
			[keyEntry]: key,
			[hostEntry]: hostValue,
		},
	};

	console.log("Constructed API Configs:", returnObj);
	return returnObj;
}

function constructReutersFetchUrl(ctgID, day, month, year) {
	let url = `${FETCH_SOURCES["Reuters"].hostUrl}/`;

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
		dateUrl_1 = `article-date/${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
		dateUrl_2 = `ArticleDate=${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
	}

	if (ctgUrl_1 !== "" && ctgUrl_1 !== null) {
		url = `${url}${ctgUrl_1}${dateUrl_1}?${ctgUrl_2}&${dateUrl_2}`;
	} else {
		url = `${url}${dateUrl_1}`;
	}

	console.log("Fetch URL:", url);
	return url;
}

// Note: `year` argument is not used and only included for compatibility
function constructWikimediaFetchUrl(ctgID, day, month, year) {
	let url = `${FETCH_SOURCES["Wikimedia"].hostUrl}/`;

	if (month === "" || month === null || day === "" || day === null) {
		console.log("Date is required");
		return;
	}

	url = `${url}${ctgID}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;

	console.log("Fetch URL:", url);
	return url;
}

/* -------------- Parse ------------- */
function parseReutersData(data) {
	console.log("parseReutersData() called");

	let parsedArray = [];

	// console.log("Data:", data);

	if (data.length === 0) {
		alert("No article found!");
		return;
	}

	// Template data structure: /{root}/docs/api_reuters_response.json
	data.forEach((entry) => {
		let parsedArticle = {
			url: entry.urlSupplier,
			title: entry.articlesName,
			summary: entry.articlesShortDescription,
			content: entry.articlesDescription,

			imgUrl: entry.files[0].urlCdn,
			imgDesc: entry.files[0].fileDescription,

			type: "news",
			authors: entry.authors,
			pubDate: entry.publishedAt,
			minutesToRead: entry.minutesToRead,
		};

		parsedArray.push(parsedArticle);
	});

	return parsedArray;
}

function parseWikimediaData(data) {
	console.log("parseWikimediaData() called");

	let parsedArray = [];

	// console.log("Data:", data);

	if (data.length === 0) {
		alert("No event found!");
		return;
	}

	// Template data structure: /{root}/docs/api_wikimedia_response.json
	for (const [, value] of Object.entries(data)) {
		let related = [];

		value[0].pages.forEach((page) => {
			related.push({
				title: page.normalizedtitle,
				url: page.content_urls.desktop.page,
				content: page.extract,
			});
		});

		let parsedEvent = {
			title: value[0].text,
			content: related,

			type: "wiki",
			authors: ["Wikimedia"],
		};

		parsedArray.push(parsedEvent);
	}

	return parsedArray;
}

/* ------------- Generic ------------ */
function RNG(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function storeParams() {
	localStorage.setItem("day", e_dateDay.value);
	localStorage.setItem("month", e_dateMonth.value);
	localStorage.setItem("year", e_dateYear.value);
	localStorage.setItem("category", e_ctg.value);
	localStorage.setItem("keyword", e_keywords.value);
	localStorage.setItem("rpp", e_rpp.value);
	console.log("store success");
}

/* ------------ Behavior ------------ */
function dateInvalidErrMsg(day, month, year) {
	console.log("dateInvalidErrMsg() called");

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
	console.log("apiInvalidErrMsg() called");

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
	console.log("disableSubmitBtn() called");

	if (state) {
		e_submitBtn.setAttribute("disabled", "");
		console.log("param-submit disabled");
	} else {
		e_submitBtn.removeAttribute("disabled");
		console.log("param-submit enabled");
	}
}

function validateParams() {
	console.log("validateParams() called");

	storeParams();

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
	console.log("fetchData() called");

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
