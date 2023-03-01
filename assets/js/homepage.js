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
