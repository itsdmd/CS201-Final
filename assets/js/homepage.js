console.log("homepage.js loaded");

/* ---------------------------------- */
/*              Variables             */
/* ---------------------------------- */

/* -------------- Const ------------- */
const API_HOST = "reuters-business-and-financial-news.p.rapidapi.com";

/* -------------- Value ------------- */
let g_apiKey = "";

/* ------------- Element ------------ */
let e_dateDay = document.querySelector(".param-date-day");
let e_dateMonth = document.querySelector(".param-date-month");
let e_dateYear = document.querySelector(".param-date-year");
let e_ctgID = document.querySelector(".param-ctg-id");
let e_submitBtn = document.querySelector(".param-submit");

/* ---------- EventListener --------- */
e_submitBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	console.log("param-submit clicked");

	g_apiKey = document.querySelector(".param-api").value;
	console.log("API Key: ", g_apiKey);

	console.log("Fetching...");
	// let query = await fetchArticles(constructFetchUrl("8", "01", "01", "2020"), constructApiConfigs(g_apiKey));	// Test
	let query = await fetchArticles(constructFetchUrl(e_ctgID.value, e_dateDay.value, e_dateMonth.value, e_dateYear.value), constructApiConfigs(g_apiKey));
	console.log("Fetch result:", query);
});

/* ---------------------------------- */
/*              Functions             */
/* ---------------------------------- */

/* ------------- Normal ------------- */
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

function constructFetchUrl(ctgID, day, month, year) {
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

/* ------------- Async ------------- */
async function fetchArticles(url, config) {
	let result = null;

	await fetch(url, config)
		.then((response) => response.json())
		.then((data) => {
			result = data;
		})
		.catch((err) => console.error(err));

	return result;
}
