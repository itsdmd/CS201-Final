# WhatHappenedThatDay

## Table of Contents

- [Introduction](#introduction)
- [Overview](#overview)
- [Design \& Convention](#design--convention)
	- [Home Page](#home-page)
	- [Article Page](#article-page)
- [Contribution](#contribution)
	- [Folder Structure](#folder-structure)
	- [How to Contribute](#how-to-contribute)

## Introduction

This website is an API fetcher that will display the events that happened on a specific day in the past. Users can choose a date and an optional category to get the list of news headlines, which they can then click to read the full article.

The news are fetched from the [Reuters Business and Financial News API](https://rapidapi.com/makingdatameaningful/api/reuters-business-and-financial-news).

## Overview

- The website consists of 2 pages:
  - The [**home page**](homepage.html), which is the landing page of the website. It contains a form to select the parameters to filter the news and a list of matching news headlines.
  - The [**article page**](pages/article.html), which displays the full article of the selected news headline.
- The content of the website will be generated dynamically using **JavaScript**.
- The website's UI is built with [Bootstrap](https://getbootstrap.com/), a CSS framework that provides a responsive grid system and pre-built components.

## Design & Convention

### Home Page

- :hourglass: WIP

### Article Page

- :hourglass: WIP

## Contribution

### Folder Structure

- `assets/`: contains all the stylesheets and scripts.
- `docs/`: contains the assets for documentation.
- `pages/`: contains all the HTML pages (except the home page).

### How to Contribute

1. **Check the [issues]()** to see if there is any that you would like to work on and assign yourself to it.
2. **Create a new branch** with the issue's number as the name.
	- _Example:_ 
		- If you want to work on issue #5, create a new branch named `5`.
		- If issue #5 have multiple sub-issues and you want to only work on one of them, create a new branch named `5-1`, `5-2`, etc.
3. **Make your changes, commit and push** them to the newly created branch.
	- Each commit should focus on solving **one problem at a time**.
		- A few hundreds of commits won't hurt, so don't be afraid to commit often.
	- The commit message should be in the following format: `#<issue number>: <what have been fixed>`
		- Use all lowercase.
		- Be as concise as possible with the commit message. If you need to explain more, use the commit message body.
		- _Example:_ `#5: add subtitle for query results`
4. After you are done, **create a pull request** (PR) to the `main` branch.
	- If the issue wasn't solved completely, you can provide additional notes in the PR's description.
