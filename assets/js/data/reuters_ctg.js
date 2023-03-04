const CATEGORIES = [
	{
		id: 6,
		name: "U.S. Legal News",
	},
	{
		id: 7,
		name: "Breakingviews",
	},
	{
		id: 8,
		name: "Environment",
	},
	{
		id: 9,
		name: "Media News",
	},
	{
		id: 10,
		name: "Business News",
	},
	{
		id: 11,
		name: "APAC",
	},
	{
		id: 12,
		name: "Airlines",
	},
	{
		id: 13,
		name: "Banks",
	},
	{
		id: 14,
		name: "ETF News",
	},
	{
		id: 15,
		name: "Financial Services & Real Estate",
	},
	{
		id: 16,
		name: "Financials",
	},
	{
		id: 17,
		name: "Industrial Machinery & Equipment",
	},
	{
		id: 18,
		name: "Industrial Conglomerates",
	},
	{
		id: 19,
		name: "Industrials",
	},
	{
		id: 20,
		name: "Cyclical Consumer Goods",
	},
	{
		id: 21,
		name: "Chemicals - Commodity",
	},
	{
		id: 22,
		name: "Industry, Materials & Utilities",
	},
	{
		id: 23,
		name: "Non-Cyclical Consumer Goods",
	},
	{
		id: 24,
		name: "Fishing & Farming",
	},
	{
		id: 25,
		name: "Consumer Goods and Retail",
	},
	{
		id: 26,
		name: "Retail - Department Stores",
	},
	{
		id: 27,
		name: "Investment Services",
	},
	{
		id: 28,
		name: "reboot-live",
	},
	{
		id: 29,
		name: "Earnings",
	},
	{
		id: 30,
		name: "Technology News",
	},
	{
		id: 31,
		name: "Internet News",
	},
	{
		id: 32,
		name: "Industry, Materials and Utilities",
	},
	{
		id: 33,
		name: "Oil and Gas",
	},
	{
		id: 34,
		name: "Big Story 10",
	},
	{
		id: 35,
		name: "Pharmaceuticals - Generic & Specialty",
	},
	{
		id: 36,
		name: "Healthcare & Pharma",
	},
	{
		id: 37,
		name: "Biotechnology",
	},
	{
		id: 38,
		name: "Healthcare Innovation",
	},
	{
		id: 39,
		name: "Healthcare",
	},
	{
		id: 40,
		name: "U.S. Markets",
	},
	{
		id: 41,
		name: "Agriculture",
	},
	{
		id: 42,
		name: "Commodities News",
	},
	{
		id: 43,
		name: "Industrials",
	},
	{
		id: 44,
		name: "Bankruptcy News",
	},
	{
		id: 45,
		name: "Retail",
	},
	{
		id: 46,
		name: "Telecommunications Services",
	},
	{
		id: 47,
		name: "Apparel & Accessories",
	},
	{
		id: 48,
		name: "Consumer Financial Services",
	},
	{
		id: 49,
		name: "Funds News",
	},
	{
		id: 50,
		name: "Deals",
	},
	{
		id: 51,
		name: "Emerging Markets",
	},
	{
		id: 52,
		name: "Chemicals - Agricultural",
	},
	{
		id: 53,
		name: "Airport Services",
	},
	{
		id: 54,
		name: "Bonds News",
	},
	{
		id: 55,
		name: "Media and Telecoms",
	},
	{
		id: 56,
		name: "Precious Metals & Minerals",
	},
	{
		id: 57,
		name: "Company News",
	},
	{
		id: 58,
		name: "IT Services & Consulting",
	},
	{
		id: 59,
		name: "Utilities - Water & Others",
	},
	{
		id: 60,
		name: "Software",
	},
	{
		id: 61,
		name: "Wireless Telecommunication Services",
	},
	{
		id: 62,
		name: "Coal",
	},
	{
		id: 63,
		name: "US Dollar Report",
	},
	{
		id: 64,
		name: "Asian Currency News",
	},
	{
		id: 65,
		name: "Technology",
	},
	{
		id: 66,
		name: "Foreign Exchange Analysis",
	},
	{
		id: 67,
		name: "Switzerland Market Report",
	},
	{
		id: 68,
		name: "Sports News",
	},
	{
		id: 69,
		name: "Consumer Goods & Retail",
	},
	{
		id: 70,
		name: "Utilities - Electric",
	},
	{
		id: 71,
		name: "Integrated Oil & Gas",
	},
	{
		id: 72,
		name: "Advertising & Marketing",
	},
	{
		id: 73,
		name: "Integrated Telecommunications Services",
	},
	{
		id: 74,
		name: "Basic Materials",
	},
	{
		id: 75,
		name: "Earnings Season",
	},
	{
		id: 76,
		name: "Retail - Drugs",
	},
	{
		id: 77,
		name: "Aerospace and Defense",
	},
	{
		id: 78,
		name: "Aerospace & Defense",
	},
	{
		id: 79,
		name: "Auto & Truck Manufacturers",
	},
	{
		id: 80,
		name: "Media Industry ",
	},
	{
		id: 81,
		name: "Air Freight & Courier Services",
	},
	{
		id: 82,
		name: "World News",
	},
	{
		id: 83,
		name: "americas-test-2",
	},
	{
		id: 84,
		name: "Commodities",
	},
	{
		id: 85,
		name: "everythingNews",
	},
	{
		id: 86,
		name: "Publishing",
	},
	{
		id: 87,
		name: "Economic News",
	},
	{
		id: 88,
		name: "Mining & Metals - Specialty",
	},
	{
		id: 89,
		name: "Construction Materials",
	},
	{
		id: 90,
		name: "Money",
	},
	{
		id: 91,
		name: "Autos",
	},
	{
		id: 92,
		name: "U.S. News",
	},
	{
		id: 93,
		name: "Rails & Roads - Passengers",
	},
	{
		id: 94,
		name: "Aluminum",
	},
	{
		id: 95,
		name: "Oil & Gas Drilling",
	},
	{
		id: 96,
		name: "Broadcasting",
	},
	{
		id: 97,
		name: "Energy",
	},
	{
		id: 98,
		name: "Utilities - Natural Gas",
	},
	{
		id: 99,
		name: "Oil & Gas Exploration & Production",
	},
	{
		id: 100,
		name: "Technology, Media and Telecommunications",
	},
	{
		id: 101,
		name: "Regulatory News",
	},
	{
		id: 102,
		name: "Medical Equipment, Supplies & Distribution",
	},
	{
		id: 103,
		name: "Energy & Environment",
	},
	{
		id: 104,
		name: "Heavy Electrical Equipment",
	},
	{
		id: 105,
		name: "Technology, Media & Telecom - Innovation",
	},
	{
		id: 106,
		name: "Casinos & Gaming",
	},
	{
		id: 107,
		name: "Electrical Components & Equipment",
	},
	{
		id: 108,
		name: "Retail - Apparel & Accessories",
	},
	{
		id: 109,
		name: "European Currency News",
	},
	{
		id: 110,
		name: "Leisure Products",
	},
	{
		id: 111,
		name: "Future of Money",
	},
	{
		id: 112,
		name: "Steel",
	},
	{
		id: 113,
		name: "Oil Report",
	},
	{
		id: 114,
		name: "Financial Services and Real Estate",
	},
	{
		id: 115,
		name: "Office Equipment",
	},
	{
		id: 116,
		name: "Commentary",
	},
	{
		id: 117,
		name: "Marine Transportation",
	},
	{
		id: 118,
		name: "Utilities - Multiline",
	},
	{
		id: 119,
		name: "Paper Products",
	},
	{
		id: 120,
		name: "Market News",
	},
	{
		id: 121,
		name: "Rails & Roads - Freights",
	},
	{
		id: 122,
		name: "Lifestyle",
	},
	{
		id: 123,
		name: "Entertainment News",
	},
	{
		id: 124,
		name: "Arts",
	},
	{
		id: 125,
		name: "Food Distribution & Convenience Stores",
	},
	{
		id: 126,
		name: "China",
	},
	{
		id: 127,
		name: "Semiconductors",
	},
	{
		id: 128,
		name: "Retail - Specialty",
	},
	{
		id: 129,
		name: "Personal Products",
	},
	{
		id: 130,
		name: "Oil Related Services & Equipment",
	},
	{
		id: 131,
		name: "Oddly Enough",
	},
	{
		id: 132,
		name: "Faithworld",
	},
	{
		id: 133,
		name: "Homebuilding",
	},
	{
		id: 134,
		name: "Where to invest in 2021",
	},
	{
		id: 135,
		name: "Marine Port Services",
	},
	{
		id: 136,
		name: "Investment Trusts",
	},
	{
		id: 137,
		name: "Consumer Electronics",
	},
	{
		id: 138,
		name: "Highways & Railroads",
	},
	{
		id: 139,
		name: "Auto/Truck/Motorcycle Parts",
	},
	{
		id: 140,
		name: "Innovation and Intellectual Property",
	},
	{
		id: 141,
		name: "Financial Services - Diversified",
	},
	{
		id: 142,
		name: "Textiles & Leather Goods",
	},
	{
		id: 143,
		name: "Regulatory News - Americas",
	},
	{
		id: 144,
		name: "Tobacco",
	},
	{
		id: 145,
		name: "Reviews News",
	},
	{
		id: 146,
		name: "Advanced Medical Equipment",
	},
	{
		id: 147,
		name: "Forest & Wood Products",
	},
	{
		id: 148,
		name: "Hedge Funds",
	},
	{
		id: 149,
		name: "Healthcare Facilities",
	},
	{
		id: 150,
		name: "IPOs - Asia",
	},
	{
		id: 151,
		name: "Computer Hardware",
	},
	{
		id: 152,
		name: "Semiconductor Equipment & Testing",
	},
	{
		id: 153,
		name: "Advertising",
	},
	{
		id: 154,
		name: "Mergers & Acquisitions - Americas",
	},
	{
		id: 155,
		name: "Mergers News",
	},
	{
		id: 156,
		name: "Managed Health Care",
	},
	{
		id: 157,
		name: "M&A - Asia",
	},
	{
		id: 158,
		name: "M&A - Europe",
	},
	{
		id: 159,
		name: "Pharmaceuticals - Diversified",
	},
	{
		id: 160,
		name: "Retail - Computers & Electronics",
	},
	{
		id: 161,
		name: "IPOs - Europes",
	},
	{
		id: 162,
		name: "Leisure & Recreation",
	},
	{
		id: 163,
		name: "Retail - Discount Stores",
	},
	{
		id: 164,
		name: "Regulatory News - Asia",
	},
	{
		id: 165,
		name: "Household Products",
	},
	{
		id: 166,
		name: "Tires & Rubber Products",
	},
	{
		id: 167,
		name: "Regulatory News - Europe",
	},
	{
		id: 168,
		name: "Hotels, Motels & Cruise Lines",
	},
	{
		id: 169,
		name: "Technology, Media & Telecom - Regulatory",
	},
	{
		id: 170,
		name: "Cyber Risk",
	},
	{
		id: 171,
		name: "Brexit",
	},
	{
		id: 172,
		name: "Europe News",
	},
	{
		id: 173,
		name: "Science & Space",
	},
	{
		id: 174,
		name: "Live Coverage",
	},
	{
		id: 175,
		name: "Editor's Picks",
	},
	{
		id: 177,
		name: "Retirement",
	},
	{
		id: 178,
		name: "Oil & Gas Refining & Marketing",
	},
	{
		id: 179,
		name: "Construction & Agricultural Machinery",
	},
	{
		id: 180,
		name: "Chemicals - Diversified",
	},
	{
		id: 181,
		name: "Chemicals - Specialty",
	},
	{
		id: 182,
		name: "Global Commodities 2017",
	},
	{
		id: 183,
		name: "Global Commodities 2016",
	},
	{
		id: 184,
		name: "Summit News",
	},
	{
		id: 185,
		name: "Davos",
	},
	{
		id: 186,
		name: "Reutersbreakingviews",
	},
	{
		id: 187,
		name: "Utilities",
	},
	{
		id: 188,
		name: "People & Celebrities",
	},
	{
		id: 189,
		name: "Music News",
	},
	{
		id: 190,
		name: "Television News",
	},
	{
		id: 191,
		name: "Film News",
	},
	{
		id: 192,
		name: "Media Industry News",
	},
	{
		id: 193,
		name: "New Issues News",
	},
	{
		id: 194,
		name: "Media Diversified",
	},
	{
		id: 195,
		name: "France",
	},
	{
		id: 196,
		name: "Hot Stocks",
	},
	{
		id: 197,
		name: "Gold Market Report",
	},
	{
		id: 198,
		name: "Golf",
	},
	{
		id: 199,
		name: "India",
	},
	{
		id: 200,
		name: "India Election 2019",
	},
	{
		id: 201,
		name: "Asian Markets",
	},
	{
		id: 202,
		name: "Global Investment 2018 Outlook",
	},
	{
		id: 203,
		name: "Global Investment Outlook 2017",
	},
	{
		id: 204,
		name: "Non-Paper Containers/Packaging",
	},
	{
		id: 205,
		name: "Women",
	},
	{
		id: 206,
		name: "Reuters News Now",
	},
	{
		id: 207,
		name: "IPOs - Europe",
	},
	{
		id: 208,
		name: "Special Reports",
	},
	{
		id: 209,
		name: "Business Special Reports",
	},
	{
		id: 210,
		name: "Politics Special Reports",
	},
	{
		id: 211,
		name: "Full coverage of the 2016 U.S. Election",
	},
	{
		id: 212,
		name: "Full coverage of the Winter Olympics.",
	},
	{
		id: 213,
		name: "India Top News",
	},
	{
		id: 214,
		name: "Global Markets",
	},
	{
		id: 215,
		name: "World Cup",
	},
	{
		id: 216,
		name: "Housing Market",
	},
	{
		id: 217,
		name: "News Pro",
	},
	{
		id: 218,
		name: "Full coverage from Davos",
	},
	{
		id: 219,
		name: "Big Story 15",
	},
	{
		id: 220,
		name: "War College",
	},
	{
		id: 221,
		name: "Bollywood",
	},
	{
		id: 222,
		name: "Global Migration",
	},
	{
		id: 223,
		name: "Oil in the spotlight",
	},
	{
		id: 224,
		name: "Global Investment Outlook 2016",
	},
	{
		id: 225,
		name: "SEC 13F Filings",
	},
	{
		id: 226,
		name: "Full coverage of the Rio Olympics",
	},
	{
		id: 227,
		name: "ESG",
	},
	{
		id: 228,
		name: "Oddly Enough News",
	},
	{
		id: 229,
		name: "Mexican Soccer",
	},
	{
		id: 230,
		name: "Sochi Olympics 2014",
	},
	{
		id: 231,
		name: "Trump Effect",
	},
	{
		id: 232,
		name: "A daily selection of our best business coverage",
	},
	{
		id: 233,
		name: "2012 Election News",
	},
	{
		id: 234,
		name: "Small Business News",
	},
	{
		id: 235,
		name: "Big Story 13",
	},
	{
		id: 236,
		name: "2020 Candidate Slideshows",
	},
	{
		id: 237,
		name: "ESG Environment",
	},
	{
		id: 238,
		name: "Business",
	},
	{
		id: 239,
		name: "Markets",
	},
	{
		id: 240,
		name: "World",
	},
	{
		id: 241,
		name: "Politics",
	},
	{
		id: 242,
		name: "Tech",
	},
	{
		id: 243,
		name: "Commentary",
	},
	{
		id: 244,
		name: "Breakingviews",
	},
	{
		id: 245,
		name: "Money",
	},
	{
		id: 246,
		name: "Life",
	},
	{
		id: 247,
		name: "Sectors and Industries",
	},
	{
		id: 261,
		name: "Middle East & Africa",
	},
	{
		id: 262,
		name: "UK",
	},
	{
		id: 264,
		name: "Race for a cure",
	},
	{
		id: 265,
		name: "Coronavirus: Full Coverage",
	},
	{
		id: 267,
		name: "AMERS",
	},
	{
		id: 268,
		name: "The Great Reboot",
	},
	{
		id: 269,
		name: "Trump 2020",
	},
	{
		id: 270,
		name: "2020 U.S. Elections",
	},
	{
		id: 271,
		name: "Biden 2020",
	},
	{
		id: 272,
		name: "Financial Regulatory Forum",
	},
	{
		id: 273,
		name: "Coronavirus Explainers",
	},
	{
		id: 274,
		name: "Change Suite",
	},
	{
		id: 275,
		name: "Coronavirus",
	},
	{
		id: 276,
		name: "Follow the money",
	},
	{
		id: 277,
		name: "Reuters Next",
	},
	{
		id: 278,
		name: "World at Work",
	},
	{
		id: 279,
		name: "Sanders 2020",
	},
	{
		id: 280,
		name: "Bloomberg 2020",
	},
	{
		id: 281,
		name: "Klobuchar",
	},
	{
		id: 282,
		name: "2020 - Buttigieg",
	},
	{
		id: 283,
		name: "Warren 2020",
	},
	{
		id: 284,
		name: "Gabbard 2020",
	},
	{
		id: 285,
		name: "Midterms: State of Play",
	},
	{
		id: 287,
		name: "Breakingviews Coronavirus",
	},
	{
		id: 290,
		name: "Euro Market Report",
	},
	{
		id: 291,
		name: "Technology, Media & Telecom - Private Equity",
	},
	{
		id: 293,
		name: "KLOBUCHAR",
	},
	{
		id: 294,
		name: "China Party Congress 2017",
	},
	{
		id: 295,
		name: "Legal",
	},
	{
		id: 300,
		name: "Reuters Fact Check",
	},
	{
		id: 301,
		name: "Esports",
	},
	{
		id: 302,
		name: "Global Commodities 2018",
	},
	{
		id: 303,
		name: "Financial Regulation 2017",
	},
	{
		id: 304,
		name: "Global Commodities and Resources 2014",
	},
	{
		id: 305,
		name: "India Election",
	},
	{
		id: 306,
		name: "News from the 2019 World Economic Forum",
	},
	{
		id: 307,
		name: "Olympics News",
	},
	{
		id: 308,
		name: "Winter Olympic (umbrella code)",
	},
	{
		id: 309,
		name: "Reuters Fact Check Spanish",
	},
	{
		id: 310,
		name: "US MLB",
	},
	{
		id: 311,
		name: "Real Estate Operations",
	},
	{
		id: 312,
		name: "US NBA",
	},
	{
		id: 313,
		name: "Global Investment Outlook 2019",
	},
	{
		id: 314,
		name: "US Politics News",
	},
	{
		id: 315,
		name: "US Politics News",
	},
	{
		id: 316,
		name: "US Elections: International",
	},
	{
		id: 317,
		name: "US Elections: International",
	},
	{
		id: 318,
		name: "LGBT",
	},
	{
		id: 319,
		name: "LGBT",
	},
	{
		id: 320,
		name: "US College Basketball",
	},
	{
		id: 321,
		name: "US NHL",
	},
	{
		id: 322,
		name: "Sponsored",
	},
	{
		id: 323,
		name: "On The Case",
	},
	{
		id: 324,
		name: "Private Equity - Healthcare",
	},
	{
		id: 325,
		name: "Private Equity - Healthcare",
	},
	{
		id: 326,
		name: "Reuters Com Service 2 MOLT",
	},
	{
		id: 327,
		name: "Reuters Com Service 2 MOLT",
	},
	{
		id: 328,
		name: "Private Equity",
	},
	{
		id: 329,
		name: "Reuters Fact Check Arabic",
	},
	{
		id: 330,
		name: "US NASCAR",
	},
	{
		id: 331,
		name: "Technology, Media & Telecommunications",
	},
	{
		id: 332,
		name: "Capital.com",
	},
	{
		id: 333,
		name: "Technology, Media & Telecom - M&A",
	},
	{
		id: 334,
		name: "Entertainment Production",
	},
	{
		id: 335,
		name: "Reuters Fact Check Portuguese",
	},
	{
		id: 336,
		name: "REIT - Residential & Commercial",
	},
	{
		id: 337,
		name: "World Gold Council",
	},
	{
		id: 338,
		name: "US NFL",
	},
	{
		id: 339,
		name: "US College Football",
	},
	{
		id: 340,
		name: "RIO 2016",
	},
	{
		id: 341,
		name: "Communications Equipment",
	},
];

CATEGORIES.sort((a, b) => a.name.localeCompare(b.name));
CATEGORIES.unshift({ id: "", name: "All" });

export { CATEGORIES };
