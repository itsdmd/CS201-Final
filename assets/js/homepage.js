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
		yearRequired: true,
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
		yearRequired: false,
	},
};
const RPP_OPTIONS = [5, 10, 15, 20, 50, 100];

/* -------------- Value ------------- */
let g_filteredData = null;

let gls_day = localStorage.getItem("day");
let gls_month = localStorage.getItem("month");
let gls_year = localStorage.getItem("year");
let gls_src = localStorage.getItem("source");
let gls_rpp = localStorage.getItem("rpp");

/* ------------- Element ------------ */
let e_paramContainer = document.querySelector(".param-container");
let e_dateContainer = document.querySelector(".param-date-container");
let e_dateDay = document.querySelector(".param-date-day");
let e_dateMonth = document.querySelector(".param-date-month");
let e_dateYear = document.querySelector(".param-date-year");
let e_dateError = document.querySelector(".param-date-error");
let e_randDateBtn = document.querySelector(".param-date-rand");
let e_src = document.querySelector(".param-src");
let e_ctg = document.querySelector(".param-ctg");
let e_keywords = document.querySelector(".param-keyword");
let e_rpp = document.querySelector(".param-rpp");
let e_api = document.querySelector(".param-api");
let e_apiError = document.querySelector(".param-api-error");
let e_submitBtn = document.querySelector(".param-submit");

let e_cardContainer = document.querySelector(".result-card-container");

let e_newsModal = document.querySelector("#article-news");
let e_wikiModal = document.querySelector("#article-wiki");

/* ---------- EventListener --------- */
e_dateContainer.addEventListener("focusout", () => {
	console.log("param-date-container focusout");

	let day = e_dateDay.value;
	let month = e_dateMonth.value;
	let year = e_dateYear.value;

	dateInvalidErrMsg(day, month, year);
	storeParams();
	validateParams();
});

e_randDateBtn.addEventListener("click", () => {
	console.log("param-date-rand clicked");

	populateRandomDate();
	dateInvalidErrMsg(e_dateDay.value, e_dateMonth.value, e_dateYear.value); // Avoid dangling error message

	storeParams();
	validateParams();
});

e_src.addEventListener("change", () => {
	console.log("param-src changed to", e_src.value);
	populateCategorySelector(e_src.value);
	populateDateYear();
	storeParams();
});

e_ctg.addEventListener("change", () => {
	console.log("param-ctg changed to", e_ctg.value);
	storeParams();
});

e_api.addEventListener("focusout", () => {
	console.log("param-api focusout");

	if (e_api.value === "" || e_api.value === null) {
		apiInvalidErrMsg(true, "API Key is empty!");
	} else {
		apiInvalidErrMsg(false);
	}

	storeParams();
	validateParams();
});

e_submitBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	console.log("param-submit clicked");

	console.log("Fetching...");

	// let query = await fetchArticles(constructFetchUrl("8", "01", "01", "2020"), constructApiConfigs(e_api.value)); // Test
	let fetchedData = await fetchData(
		FETCH_SOURCES[e_src.value].fetchingUrlFn(e_ctg.value, e_dateDay.value, e_dateMonth.value, e_dateYear.value),
		constructApiConfigs(e_src.value, e_api.value)
	);

	storeParams();

	console.log("Fetched data:", fetchedData);

	g_filteredData = processFetchedData(fetchedData);
	generateResultCards(g_filteredData);

	e_cardContainer.scrollIntoView({ behavior: "smooth" });
});

e_cardContainer.addEventListener("click", (e) => {
	console.log("e_cardContainer clicked");
	if (e.target.classList.contains("result-card-button")) {
		console.log("result-card-button clicked");

		// Get the index of the card that the button is in
		let cardIndex = parseInt(e.target.parentElement.getAttribute("index")); // TODO: Take pagination into account
		console.log("cardIndex:", cardIndex);
		console.log("data-target:", e.target.getAttribute("data-target"));

		switch (e.target.getAttribute("data-target")) {
			case "#article-news": {
				console.log("article-news:", e_newsModal);
				e_newsModal.innerHTML = populateModal("Reuters", g_filteredData, cardIndex);
				break;
			}
			case "#article-wiki": {
				console.log("article-wiki:", e_wikiModal);
				e_wikiModal.innerHTML = populateModal("Wikimedia", g_filteredData, cardIndex);
				break;
			}
			default:
				console.log("No matching type");
		}
	}
});

/* ---------------------------------- */
/*              Functions             */
/* ---------------------------------- */

/* ---------- Initializing ---------- */
retrieveParams();
populateDropdownSelectors();
disableSubmitBtn(true);

/* ------------ Generate ------------ */
function generateResultCards(data, numOfCards = e_rpp.value) {
	console.log("generateResultCards() called");
	let output = "";
	e_cardContainer.innerHTML = "";

	// console.log("data.length", data.length);

	if (data === null || data === undefined || data.length === 0) {
		console.log("No data to populate");
		return;
	} else if (data.length < numOfCards) {
		numOfCards = data.length;
	}

	if (e_src.value === "Reuters") {
		for (let i = 0; i < numOfCards; i++) {
			console.log("Card #" + i + ":", data[i]);

			output += `
				<div class="col-md-12 mt-3">
					<div class="card p-3" index="${i}">
						<a href="#">
							<h4> ${data[i].title}</h4>
						</a>
						<p> ${data[i].summary} </p>

						<button type="button" class="btn btn-primary mt-3 result-card-button" data-toggle="modal"  data-target="#article-news">
							Read more
						</button>
					</div>
				</div>`;
		}
	} else if (e_src.value === "Wikimedia") {
		for (let i = 0; i < numOfCards; i++) {
			console.log("Card #" + i + ":", data[i]);

			let relatedTitles = "";
			data[i].content.forEach((item) => {
				relatedTitles += item.title;

				if (item !== data[i].content[data[i].content.length - 1]) {
					relatedTitles += ", ";
				}
			});

			output += `
			<div class="col-md-12 mt-3">
				<div class="card p-3" index="${i}">
					<a href="#">
						<h4> ${data[i].title}</h4>
					</a>

					<p>${relatedTitles}</p>
					<button type="button" class="btn btn-primary mt-3 result-card-button" data-toggle="modal"  data-target="#article-wiki">
						Read more
					</button>
				</div>
			</div>`;
		}
	}

	console.log("Cards printed");
	e_cardContainer.innerHTML = output;
}

/* ------------ Populate ------------ */
function populateDropdownSelectors() {
	console.log("populateDropdownSelectors() called");

	// Day
	let output = "";
	for (let i = 1; i <= 31; i++) {
		if (i === parseInt(gls_day)) {
			output += `<option name="day" value="${i}" selected>${i}</option>`;
		} else {
			output += `<option name="day" value="${i}">${i}</option>`;
		}
	}
	e_dateDay.innerHTML = output;

	// Month
	output = "";
	for (let i = 1; i <= 12; i++) {
		if (i === parseInt(gls_month)) {
			output += `<option name="month" value="${i}" selected>${i}</option>`;
		} else {
			output += `<option name="month" value="${i}">${i}</option>`;
		}
	}
	e_dateMonth.innerHTML = output;

	// Source
	output = "";
	for (const key in FETCH_SOURCES) {
		if (key === gls_src) {
			console.log("key", key);
			output += `<option name="source" value="${key}" selected>${key}</option>`;
		} else {
			output += `<option name="source" value="${key}">${key}</option>`;
		}
	}
	e_src.innerHTML = output;

	// Year
	populateDateYear();

	// Category
	populateCategorySelector();

	// Results per page
	output = "";
	RPP_OPTIONS.forEach((value) => {
		if (value === gls_rpp) {
			output += `<option name="rpp" value="${value}" selected>${value}</option>`;
		} else {
			output += `<option name="rpp" value="${value}">${value}</option>`;
		}
	});
	e_rpp.innerHTML = output;
}

function populateDateYear() {
	console.log("populateDateYear() called");

	let currentYear = new Date().getFullYear();
	let output = "";

	if (FETCH_SOURCES[e_src.value].yearRequired === false) {
		if (gls_year === "any") {
			output += `<option name="year" value="any" selected>Any</option>`;
		} else {
			output += `<option name="year" value="any">Any</option>`;
		}
	}

	for (let i = currentYear; i >= FETCH_SOURCES[e_src.value].startYear; i--) {
		if (i === parseInt(gls_year)) {
			output += `<option name="year" value="${i}" selected>${i}</option>`;
		} else {
			output += `<option name="year" value="${i}">${i}</option>`;
		}
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

function populateModal(type, data, index) {
	console.log("generateModalInnerHTML() called");

	console.log("data:", data);

	let result = "";

	if (type === "Reuters") {
		let contentList = JSON.parse(data[index].content);
		// console.log("contentList:", contentList);

		let authors = "";
		data[index].authors.forEach((author) => {
			authors += author.authorName;

			if (data[index].authors.indexOf(author) !== data[index].authors.length - 1) {
				authors += ", ";
			}
		});

		let content = "";
		contentList.forEach((item) => {
			content += "<p>" + item.content + "</p>";
		});
		// console.log("content:", content);

		result = `
			<div class="modal-dialog modal-xl" role="document">
				<div class="modal-content">
					<button type="button" class="close"
						data-dismiss="modal">
						×
					</button>
					<div class="modal-header">
						<h1 class="modal-title" id="article-title">${data[index].title}</h1>
						
						<h7 class="article-url"><a href="${data[index].url}">Original post</a></h7>
						<hr />
						<h7 class="article-authors">${authors}</h7>
					</div>
					<div class="modal-body">
						<h4 class="article-summary">
							${data[index].summary}
						</h4>
						<img
							src="${data[index].imgUrl}"
							class="article-image"
							alt=""
						/>
						<small class="article-image-desc">${data[index].imgDesc}</small>
						<hr />
						<p class="article-content">
							${content}
						</p>
					</div>
				</div>
			</div>`;
	} else if (type === "Wikimedia") {
		let contentSize = data[index].content.length;

		result = `
			<div class="modal-dialog modal-xl" role="document">
				<div class="modal-content">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>`;

		for (let i = 0; i < contentSize; i++) {
			result += `
					<div class="modal-header">
						<h1 class="modal-title" id="article-title">
							${data[index].content[i].title}
						</h1>
					</div>

					<div class="modal-body">
						<div class="article-content">
							<div class="article-content-entry">
								<h7 class="article-entry-url">
									<a href="${data[index].content[i].url}">
										URL
									</a>
								</h7>
								<p class="article-entry-summary">
									${data[index].content[i].summary}
								</p>
							</div>
						</div>
					</div>`;
		}

		result += `
				</div>
			</div>`;
	}

	return result;
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

	// console.log("Data:", data);

	if (data.length === 0 || data === null || data === undefined) {
		alert("No article found!");
		return;
	}

	let parsedArray = [];

	// Template data structure: /{root}/docs/api_reuters_response.json
	data.forEach((entry) => {
		if (entry.files.length > 0) {
			let parsedArticle = {
				url: entry.urlSupplier,
				title: entry.articlesName,
				summary: entry.articlesShortDescription,
				content: entry.articlesDescription,

				imgUrl: entry.files[0].urlCdn,
				imgDesc: entry.files[0].filesDescription,

				type: "news",
				authors: entry.authors,
				pubDate: entry.publishedAt,
				minutesToRead: entry.minutesToRead,
			};
			console.log("entry length > 0");
			parsedArray.push(parsedArticle);
		} else {
			let parsedArticle = {
				url: entry.urlSupplier,
				title: entry.articlesName,
				summary: entry.articlesShortDescription,
				content: entry.articlesDescription,

				imgUrl: "",
				imgDesc: "",

				type: "news",
				authors: entry.authors,
				pubDate: entry.publishedAt,
				minutesToRead: entry.minutesToRead,
			};
			console.log("entry length > 0");
			parsedArray.push(parsedArticle);
		}
	});

	return parsedArray;
}

function parseWikimediaData(data) {
	console.log("parseWikimediaData() called");

	// console.log("Data:", data);

	if (data.length === 0 || data === null || data === undefined) {
		alert("No event found!");
		return;
	}

	let parsedArray = [];

	// Template data structure: /{root}/docs/api_wikimedia_response.json
	for (const [, value] of Object.entries(data)) {
		let related = [];

		value[0].pages.forEach((page) => {
			related.push({
				title: page.normalizedtitle,
				url: page.content_urls.desktop.page,
				summary: page.extract,
			});
		});

		let parsedEvent = {
			title: value[0].text,
			content: related,

			type: "wiki",
			authors: ["Wikimedia"],
			year: value[0].year,
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
	console.log("storeParams() called");

	localStorage.setItem("day", e_dateDay.value);
	localStorage.setItem("month", e_dateMonth.value);
	localStorage.setItem("year", e_dateYear.value);
	localStorage.setItem("source", e_src.value);
	localStorage.setItem("rpp", e_rpp.value);
}

function retrieveParams() {
	console.log("retrieveParams() called");

	if (localStorage.getItem("day") !== null) {
		e_dateDay.value = localStorage.getItem("day");
	} else {
		e_dateDay.value = 1;
	}

	if (localStorage.getItem("month") !== null) {
		e_dateMonth.value = localStorage.getItem("month");
	} else {
		e_dateMonth.value = 1;
	}

	if (localStorage.getItem("year") !== null) {
		e_dateYear.value = localStorage.getItem("year");
	} else {
		e_dateYear.value = 2023;
	}

	if (localStorage.getItem("source") !== null) {
		e_src.value = localStorage.getItem("source");
	} else {
		e_src.value = "Reuters";
	}

	if (localStorage.getItem("rpp") !== null) {
		e_rpp.value = localStorage.getItem("rpp");
	} else {
		e_rpp.value = 5;
	}
}

function filterData(data, keyword) {
	console.log("filterData() called");

	let keywordProvided = true;

	if (keyword === "" || keyword === null || keyword === undefined) {
		console.log("No keyword provided");

		if (FETCH_SOURCES[e_src.value].yearRequired) {
			return data;
		} else {
			keywordProvided = false;
		}
	}

	let filteredData = [];

	data.forEach((entry) => {
		if (entry.type === "news") {
			if (entry.title.toLowerCase().includes(keyword.toLowerCase()) || entry.content.toLowerCase().includes(keyword.toLowerCase())) {
				filteredData.push(entry);
			}
		} else if (entry.type === "wiki") {
			// Year filtering
			if (e_dateYear.value === "any" || parseInt(entry.year) === parseInt(e_dateYear.value)) {
				// Keyword filtering
				if (keywordProvided === false) {
					filteredData.push(entry);
				} else if (entry.title.toLowerCase().includes(keyword.toLowerCase())) {
					filteredData.push(entry);
				} else {
					// Related articles filtering
					entry.content.forEach((related) => {
						if (keywordProvided && related.content.toLowerCase().includes(keyword.toLowerCase()) === false) {
							return;
						}

						filteredData.push(entry);
					});
				}
			}
		}
	});

	return filteredData;
}

function processFetchedData(data) {
	console.log("processFetchedData() called");

	let parsedQuery = FETCH_SOURCES[e_src.value].parsingFn(data);
	console.log("Parsed data:", parsedQuery);

	let filteredQuery = filterData(parsedQuery, e_keywords.value);
	console.log("Filtered data:", filteredQuery);

	return filteredQuery;
}

/* ------------ Validate ------------ */
function dateInvalidErrMsg(day, month, year) {
	console.log("dateInvalidErrMsg() called");

	if (year === "any") {
		year = new Date().getFullYear() - 1;
	}

	let stringifiedDate = String(day + "-" + month + "-" + year);

	if (moment(stringifiedDate, "DD-MM-YYYY", false).isValid()) {
		// Check if date is in the future
		//! Note: Must use ISO format for calculation and comparison
		let today = moment().format();
		let target = moment(stringifiedDate, "DD-MM-YYYY").format();

		if (moment(target).isAfter(today)) {
			e_dateError.classList.add("error");
			// console.log("Date is in the future:", stringifiedDate);
			return;
		}

		e_dateError.classList.remove("error");
		// console.log("Valid date:", stringifiedDate);
		return;
	}

	e_dateError.classList.add("error");
	// console.log("Invalid date:", stringifiedDate);
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
