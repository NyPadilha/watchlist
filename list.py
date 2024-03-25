from data_scraping.scraper import new_season


animes = new_season()
sorted_animes = sorted(animes, key=lambda anime: anime['start_date'])

with open('anime_list.txt', 'w') as file:
    for anime in sorted_animes:
        file.write(anime['start_date'] + '\n')
        file.write(anime['title'] + '\n')
        file.write(anime['url'] + '\n')
        file.write('\n')
