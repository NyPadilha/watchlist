import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Any


def fetch():
    url = 'https://myanimelist.net/anime/season'
    response = requests.get(url)

    if response.status_code == 200:
        return response.text
    else:
        return 'Error fetching page'


def anime_formatter(anime: Any):
    date = anime.find('span', {"class": 'js-start_date'}).text[4:]
    formatted_date = f'{date[2:]}/{date[:2]}'

    img = anime.find('div', {"class": 'image'}).a.img
    img_src = img['src'] if img and 'src' in img.attrs else img['data-src']

    return {
        'title': anime.find('span', {"class": 'js-title'}).text,
        'start_date': formatted_date,
        'url': anime.find('div', {"class": 'image'}).a['href'],
        'image': img_src,
    }


def new_season():
    soup = BeautifulSoup(fetch(), 'html.parser')

    season: List[Dict[str, Any]] = []

    for anime in soup.find_all(
        'div',
        {"class": 'js-anime-category-producer seasonal-anime js-seasonal-anime js-anime-type-all js-anime-type-1'}
    ):
        gay = bool(anime.find('span', {"class": 'genre'}, text={'Boys Love'}))

        if not gay:
            a = anime_formatter(anime)
            season.append(a)

    return season


print(new_season()[0])
