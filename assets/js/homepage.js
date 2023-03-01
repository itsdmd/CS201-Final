console.log("homepage.js loaded");

/* ---------------------------------- */
/*              Variables             */
/* ---------------------------------- */

/* -------------- Const ------------- */
const API_HOST = "reuters-business-and-financial-news.p.rapidapi.com";
const API_HOST_CTG = "all-category";

/* -------------- Value ------------- */
let apiKey = "";

/* ------------- Element ------------ */
let submitBtn = document.getElementById("submit");

/* ---------- EventListener --------- */
submitBtn.addEventListener("click", (e) => {
	e.preventDefault();
	console.log("param-submit clicked");

	apiKey = document.querySelector(".param-api").value;
	console.log("API Key: ", apiKey);
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
	let url = "https://${API_HOST}/";
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
		dateUrl_1 = `article-date/${day}-${month}-${year}/`;
		dateUrl_2 = `ArticleDate=${day}-${month}-${year}`;
	}

	if (ctgUrl_1 !== "" && ctgUrl_1 !== null) {
		url = `${url}${ctgUrl_1}${dateUrl_1}?${ctgUrl_2}&${dateUrl_2}`;
	} else {
		url = `${url}${dateUrl_1}`;
	}

	return url;
}
