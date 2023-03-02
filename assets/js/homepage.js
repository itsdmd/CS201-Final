console.log("homepage.js loaded");

import { CATEGORIES } from "./data/all_categories.js";

/* ---------------------------------- */
/*              Variables             */
/* ---------------------------------- */
/* ------------- Object ------------- */
let article = {
	// Core
	url: "", // URL to official article | urlSupplier
	title: "", // Title of article | articlesName
	summary: "", // Summary of article, acts as subtitle | articlesShortDescription
	content: "", // Content of article | articlesDescription	//* This is a stringified JSON object, need to be parsed

	// Media
	imgUrl: "", // URL to article's image | files[x].urlCdn
	imgDesc: "", // Description of image | files[x].fileDescription

	// Meta
	authors: [""], // Authors of article | authors
	pubDate: "", // Date of publication | publishedAt
	minutesToRead: 0, // Minutes to read article | minutesToRead
};

/* -------------- Const ------------- */
const API_HOST = "reuters-business-and-financial-news.p.rapidapi.com";

/* -------------- Value ------------- */
let g_apiKey = "";

/* ------------- Element ------------ */
let e_dateDay = document.querySelector(".param-date-day");
let e_dateMonth = document.querySelector(".param-date-month");
let e_dateYear = document.querySelector(".param-date-year");
let e_ctg = document.querySelector(".param-ctg");
let e_submitBtn = document.querySelector(".param-submit");
let e_rpp = document.querySelector(".param-rpp");
let e_dateContainer = document.querySelector(".date-container");
let e_dateError = document.querySelector(".date-error");

/* ---------- EventListener --------- */
e_submitBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	console.log("param-submit clicked");

	g_apiKey = document.querySelector(".param-api").value;
	console.log("API Key: ", g_apiKey);

	console.log("Fetching...");
	// let query = await fetchArticles(constructFetchUrl("8", "01", "01", "2020"), constructApiConfigs(g_apiKey)); // Test
	let query = await fetchData(constructArticleFetchUrl("", e_dateDay.value, e_dateMonth.value, e_dateYear.value), constructApiConfigs(g_apiKey));
	console.log("Fetch result:", parseFetchedArticles(query));
});

e_dateContainer.addEventListener("focusout", () => {
	let day = e_dateDay.value;
	let month = e_dateMonth.value;
	let year = e_dateYear.value;
	populateDateInvalidError(day, month, year);
});

/* ---------------------------------- */
/*              Functions             */
/* ---------------------------------- */

/* ---------- Initializing ---------- */
populateDropdownSelectors();

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
	for (let i = 1; i <= 12; i++) {
		output += `<option name="month" value="${i}">${i}</option>`;
	}
	e_dateMonth.innerHTML = output;

	// Year
	let currentYear = new Date().getFullYear();
	output = `<option value="2014" selected>Year</option>`;
	for (let i = 2014; i <= currentYear; i++) {
		output += `<option name="year" value="${i}">${i}</option>`;
	}
	e_dateYear.innerHTML = output;

	// Category
	output = `<option value="" selected>Select</option>`;
	CATEGORIES.forEach((ctg) => {
		output += `<option name="ctg" value="${ctg.id}">${ctg.name}</option>`;
	});
	e_ctg.innerHTML = output;

	// Results per page
	let rpp_options = [5, 10, 15, 20, 50, 100];
	output = `<option value="${rpp_options[0]}" selected>Select</option>`;
	rpp_options.forEach((value) => {
		output += `<option name="rpp" value="${value}">${value}</option>`;
	});
	e_rpp.innerHTML = output;
}

function populateDateInvalidError(day, month, year) {
	if (validateDate(day, month, year) == true) {
		e_dateError.classList.remove("error");
		console.log(day + month + year);
		console.log(validateDate(day, month, year));
	} else {
		e_dateError.classList.add("error");
		console.log(day + month + year);
		console.log(validateDate(day, month, year));
	}
}

/* ------------- Construct ---------- */
function constructApiConfigs(key) {
	if (key === "" || key === null) {
		// TODO: Show pop-up
		console.log("API Key is empty");
		return;
	}

	return {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": key,
			"X-RapidAPI-Host": API_HOST,
		},
	};
}

function constructArticleFetchUrl(ctgID, day, month, year) {
	let url = `https://${API_HOST}/`;
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
	// console.log("_test_:", data[0]);

	// Template data structure: /{root}/docs/api_example_article_resp.json
	data.forEach((article) => {
		let parsedArticle = {
			url: article.urlSupplier,
			title: article.articlesName,
			summary: article.articlesShortDescription,
			content: article.articlesDescription,

			imgUrl: article.files[0].urlCdn,
			imgDesc: article.files[0].fileDescription,

			authors: article.authors,
			pubDate: article.publishedAt,
			minutesToRead: article.minutesToRead,
		};

		parsedArray.push(parsedArticle);
	});

	return parsedArray;
}

/* ------------- Async ------------- */
async function fetchData(url, config) {
	let result = null;

	await fetch(url, config)
		.then((response) => response.json())
		.then((data) => {
			result = data;
		})
		.catch((err) => console.error(err));

	return result;
}

/* ------------ Generic ----------- */
function validateDate(day, month, year) {
	let ListOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if ((month === 1 || month > 2) && day > ListOfDays[month - 1]) {
		return false;
	} else if (month == 2) {
		let leapYear = false;

		if ((!(year % 4) && year % 100) || !(year % 400)) {
			leapYear = true;
		}

		if (leapYear == false && day >= 29) {
			return false;
		} else if (leapYear == true && day > 29) {
			console.log("Invalid date format!");
			return false;
		}
	} else {
		return false;
	}

	return true;
}
