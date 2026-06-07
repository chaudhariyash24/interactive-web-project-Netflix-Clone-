/* ═══════════════════════════════════════════════════
   NETFLUX — script.js
   All logic: data, rendering, interactions, search,
   modal, localStorage, lazy loading, hero rotation
═══════════════════════════════════════════════════ */

'use strict';

/* ─── Movie Database ─────────────────────────────── */
const MOVIES = [
  // ── TRENDING ──────────────────────────────────────
  {
    id: 'tt0816692', title: 'Interstellar', year: 2014, duration: '2h 49m',
    rating: '98% Match', imdb: '8.7', genre: 'Sci-Fi, Drama, Adventure',
    cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    director: 'Christopher Nolan',
    desc: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival. A visually stunning epic about love, time, and sacrifice.',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/tmU7GeKVjjZTdD1thRFaZCKMDMW.jpg',
    tags: ['trending','scifi','toprated'], maturity: 'PG-13'
  },
  {
    id: 'tt1375666', title: 'Inception', year: 2010, duration: '2h 28m',
    rating: '97% Match', imdb: '8.8', genre: 'Action, Sci-Fi, Thriller',
    cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
    director: 'Christopher Nolan',
    desc: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster: 'https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    tags: ['trending','action','toprated'], maturity: 'PG-13'
  },
  {
    id: 'tt0468569', title: 'The Dark Knight', year: 2008, duration: '2h 32m',
    rating: '99% Match', imdb: '9.0', genre: 'Action, Crime, Drama',
    cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    director: 'Christopher Nolan',
    desc: 'When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CejMc9YP.jpg',
    tags: ['trending','action','toprated'], maturity: 'PG-13'
  },
  {
    id: 'tt0137523', title: 'Fight Club', year: 1999, duration: '2h 19m',
    rating: '95% Match', imdb: '8.8', genre: 'Drama, Thriller',
    cast: 'Brad Pitt, Edward Norton, Helena Bonham Carter',
    director: 'David Fincher',
    desc: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchist organization.',
    poster: 'https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/87hTDiay2N2qWyX4Ds7ybXi9h8I.jpg',
    tags: ['trending','popular'], maturity: 'R'
  },
  {
    id: 'tt0109830', title: 'Forrest Gump', year: 1994, duration: '2h 22m',
    rating: '96% Match', imdb: '8.8', genre: 'Drama, Romance',
    cast: 'Tom Hanks, Robin Wright, Gary Sinise',
    director: 'Robert Zemeckis',
    desc: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
    poster: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/aGaeSyspyBBiPxFJOMuKNsRqQBl.jpg',
    tags: ['trending','popular','toprated'], maturity: 'PG-13'
  },
  {
    id: 'tt0120737', title: 'The Lord of the Rings: FOTR', year: 2001, duration: '3h 28m',
    rating: '97% Match', imdb: '8.8', genre: 'Adventure, Drama, Fantasy',
    cast: 'Elijah Wood, Ian McKellen, Viggo Mortensen',
    director: 'Peter Jackson',
    desc: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
    tags: ['trending','scifi','toprated'], maturity: 'PG-13'
  },
  {
    id: 'tt0076759', title: 'Star Wars: A New Hope', year: 1977, duration: '2h 1m',
    rating: '94% Match', imdb: '8.6', genre: 'Action, Adventure, Sci-Fi',
    cast: 'Mark Hamill, Harrison Ford, Carrie Fisher',
    director: 'George Lucas',
    desc: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station.',
    poster: 'https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg',
    tags: ['trending','scifi','action'], maturity: 'PG'
  },
  {
    id: 'tt0110912', title: 'Pulp Fiction', year: 1994, duration: '2h 34m',
    rating: '96% Match', imdb: '8.9', genre: 'Crime, Drama',
    cast: 'John Travolta, Samuel L. Jackson, Uma Thurman',
    director: 'Quentin Tarantino',
    desc: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    poster: 'https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    tags: ['popular','toprated'], maturity: 'R'
  },

  // ── POPULAR ────────────────────────────────────────
  {
    id: 'tt1160419', title: 'Dune', year: 2021, duration: '2h 35m',
    rating: '94% Match', imdb: '8.0', genre: 'Adventure, Drama, Sci-Fi',
    cast: 'Timothée Chalamet, Rebecca Ferguson, Oscar Isaac',
    director: 'Denis Villeneuve',
    desc: 'Feature adaptation of Frank Herbert\'s science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.',
    poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg',
    tags: ['popular','scifi','new'], maturity: 'PG-13'
  },
  {
    id: 'tt6741278', title: 'Dune: Part Two', year: 2024, duration: '2h 46m',
    rating: '95% Match', imdb: '8.5', genre: 'Adventure, Drama, Sci-Fi',
    cast: 'Timothée Chalamet, Zendaya, Rebecca Ferguson',
    director: 'Denis Villeneuve',
    desc: 'Paul Atreides unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
    poster: 'https://image.tmdb.org/t/p/w500/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/7mTGaaMtMLpSZJFGOEbXWMBMJRL.jpg',
    tags: ['popular','scifi','new'], maturity: 'PG-13'
  },
  {
    id: 'tt9362722', title: 'Spider-Man: Across the Spider-Verse', year: 2023, duration: '2h 20m',
    rating: '97% Match', imdb: '8.6', genre: 'Animation, Action, Adventure',
    cast: 'Shameik Moore, Hailee Steinfeld, Oscar Isaac',
    director: 'Joaquim Dos Santos',
    desc: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    tags: ['popular','action','new'], maturity: 'PG'
  },
  {
    id: 'tt1517268', title: 'Barbie', year: 2023, duration: '1h 54m',
    rating: '88% Match', imdb: '6.9', genre: 'Adventure, Comedy, Fantasy',
    cast: 'Margot Robbie, Ryan Gosling, America Ferrera',
    director: 'Greta Gerwig',
    desc: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
    poster: 'https://image.tmdb.org/t/p/w500/iuFNMS8vlbZxOkIGEV7HDBfOL9I.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/ctMserH0z8K8RjrFKJAAqwT5b4T.jpg',
    tags: ['popular','comedy','new'], maturity: 'PG-13'
  },
  {
    id: 'tt15398776', title: 'Oppenheimer', year: 2023, duration: '3h',
    rating: '96% Match', imdb: '8.9', genre: 'Biography, Drama, History',
    cast: 'Cillian Murphy, Emily Blunt, Matt Damon',
    director: 'Christopher Nolan',
    desc: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fm6KqXpkh7zMkuqMlrp1O9RmFSO.jpg',
    tags: ['popular','new','toprated'], maturity: 'R'
  },

  // ── ACTION ─────────────────────────────────────────
  {
    id: 'tt4154796', title: 'Avengers: Endgame', year: 2019, duration: '3h 1m',
    rating: '95% Match', imdb: '8.4', genre: 'Action, Adventure, Drama',
    cast: 'Robert Downey Jr., Chris Evans, Mark Ruffalo',
    director: 'Anthony Russo',
    desc: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. The Avengers assemble once more to reverse Thanos\' actions and restore balance.',
    poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    tags: ['action','popular'], maturity: 'PG-13'
  },
  {
    id: 'tt0372784', title: 'Batman Begins', year: 2005, duration: '2h 20m',
    rating: '92% Match', imdb: '8.2', genre: 'Action, Adventure',
    cast: 'Christian Bale, Michael Caine, Gary Oldman',
    director: 'Christopher Nolan',
    desc: 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.',
    poster: 'https://image.tmdb.org/t/p/w500/8RW2runSEc34IwKN2D1aPcJd2UL.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/o3SiJBpFPMd6k5vWMH0sJGRR7Gv.jpg',
    tags: ['action'], maturity: 'PG-13'
  },
  {
    id: 'tt0133093', title: 'The Matrix', year: 1999, duration: '2h 16m',
    rating: '96% Match', imdb: '8.7', genre: 'Action, Sci-Fi',
    cast: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
    director: 'Lana Wachowski',
    desc: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth about the reality he thought he knew.',
    poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    tags: ['action','scifi','toprated'], maturity: 'R'
  },
  {
    id: 'tt0110413', title: 'Léon: The Professional', year: 1994, duration: '1h 50m',
    rating: '93% Match', imdb: '8.5', genre: 'Action, Crime, Drama',
    cast: 'Jean Reno, Gary Oldman, Natalie Portman',
    director: 'Luc Besson',
    desc: 'Mathilda, a 12-year-old girl, is left in the care of Léon, a professional assassin, after her family is killed.',
    poster: 'https://image.tmdb.org/t/p/w500/yI6X2cCM5YPJtxMhUd3dPGqDAhw.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/7ICsWkGwPSb1rMR0DqH7fYnJYMv.jpg',
    tags: ['action'], maturity: 'R'
  },
  {
    id: 'tt0095016', title: 'Die Hard', year: 1988, duration: '2h 12m',
    rating: '89% Match', imdb: '8.2', genre: 'Action, Thriller',
    cast: 'Bruce Willis, Alan Rickman, Bonnie Bedelia',
    director: 'John McTiernan',
    desc: 'An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.',
    poster: 'https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xBKGJQObBHvFJfZBBqFkMbSoU2X.jpg',
    tags: ['action'], maturity: 'R'
  },
  {
    id: 'tt0120815', title: 'Saving Private Ryan', year: 1998, duration: '2h 49m',
    rating: '94% Match', imdb: '8.6', genre: 'Drama, War',
    cast: 'Tom Hanks, Matt Damon, Tom Sizemore',
    director: 'Steven Spielberg',
    desc: 'Following the Normandy Landings, a group of U.S. soldiers goes behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
    poster: 'https://image.tmdb.org/t/p/w500/1wY4psJ5NVEhCuOYROwLH2XExM2.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/zm296sKUaETsTMtTDECfKAlRqhq.jpg',
    tags: ['action','toprated'], maturity: 'R'
  },

  // ── COMEDY ─────────────────────────────────────────
  {
    id: 'tt0382932', title: 'Ratatouille', year: 2007, duration: '1h 51m',
    rating: '93% Match', imdb: '8.1', genre: 'Animation, Comedy, Family',
    cast: 'Patton Oswalt, Ian Holm, Janeane Garofalo',
    director: 'Brad Bird',
    desc: 'A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant.',
    poster: 'https://image.tmdb.org/t/p/w500/npHNjldbeTHdKKw28bJKs7lzqzj.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/dsp0nh2xZDNIyXFEGhSLDHjXRDt.jpg',
    tags: ['comedy'], maturity: 'G'
  },
  {
    id: 'tt0390384', title: 'The Office (US) S1', year: 2005, duration: '22m/ep',
    rating: '91% Match', imdb: '8.9', genre: 'Comedy',
    cast: 'Steve Carell, Rainn Wilson, John Krasinski',
    director: 'Ken Kwapis',
    desc: 'A mockumentary on a group of typical office workers, where the workday consists of ego trips, inappropriate behavior, and tedium.',
    poster: 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/kq3BtC8kv7JIbgBdCJm4gBPSI3X.jpg',
    tags: ['comedy'], maturity: 'TV-14'
  },
  {
    id: 'tt0892769', title: 'How to Train Your Dragon', year: 2010, duration: '1h 38m',
    rating: '91% Match', imdb: '8.1', genre: 'Animation, Adventure, Comedy',
    cast: 'Jay Baruchel, Gerard Butler, Craig Ferguson',
    director: 'Chris Sanders',
    desc: 'A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.',
    poster: 'https://image.tmdb.org/t/p/w500/ygGmAO60t8GyqUE4YPWG3KRzGEj.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/zaCHdOqSN2BdkT1m4Yx3bz7gbhh.jpg',
    tags: ['comedy'], maturity: 'PG'
  },
  {
    id: 'tt0317705', title: 'The Incredibles', year: 2004, duration: '1h 55m',
    rating: '93% Match', imdb: '8.0', genre: 'Animation, Action, Adventure',
    cast: 'Craig T. Nelson, Holly Hunter, Samuel L. Jackson',
    director: 'Brad Bird',
    desc: 'A family of undercover superheroes, while trying to live the quiet suburban life, are forced into action to save the world.',
    poster: 'https://image.tmdb.org/t/p/w500/2LqaLgk4Z226KkgPJuiOQ58ShKD.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/b4pxkEZ2kzNGZIuX3MkJDFKaVQh.jpg',
    tags: ['comedy','action'], maturity: 'PG'
  },
  {
    id: 'tt1979376', title: 'Toy Story 4', year: 2019, duration: '1h 40m',
    rating: '89% Match', imdb: '7.7', genre: 'Animation, Adventure, Comedy',
    cast: 'Tom Hanks, Tim Allen, Annie Potts',
    director: 'Josh Cooley',
    desc: 'When a new toy called "Forky" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.',
    poster: 'https://image.tmdb.org/t/p/w500/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/uXwbEFCN5BftDCcKt4GnClMUdXS.jpg',
    tags: ['comedy'], maturity: 'G'
  },

  // ── HORROR ─────────────────────────────────────────
  {
    id: 'tt1396484', title: 'IT', year: 2017, duration: '2h 15m',
    rating: '88% Match', imdb: '7.3', genre: 'Horror, Drama',
    cast: 'Bill Skarsgård, Jaeden Martell, Finn Wolfhard',
    director: 'Andy Muschietti',
    desc: 'In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown.',
    poster: 'https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVHgCDdNSwJbUOhRQS.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/y0gZRKXVBelxUCbDnVFKaGgLoJM.jpg',
    tags: ['horror'], maturity: 'R'
  },
  {
    id: 'tt1340138', title: 'Hereditary', year: 2018, duration: '2h 7m',
    rating: '87% Match', imdb: '7.3', genre: 'Drama, Horror, Mystery',
    cast: 'Toni Collette, Milly Shapiro, Gabriel Byrne',
    director: 'Ari Aster',
    desc: 'After the family matriarch passes away, a grieving family is haunted by tragic and disturbing occurrences.',
    poster: 'https://image.tmdb.org/t/p/w500/3aNdRFJ3FHuNBBh4S7OAlNQEOa5.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/ra0AaL6JEzqlyBLxkGBCwcPO3EJ.jpg',
    tags: ['horror'], maturity: 'R'
  },
  {
    id: 'tt1457767', title: 'The Conjuring', year: 2013, duration: '1h 52m',
    rating: '85% Match', imdb: '7.5', genre: 'Horror, Mystery, Thriller',
    cast: 'Patrick Wilson, Vera Farmiga, Ron Livingston',
    director: 'James Wan',
    desc: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
    poster: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/knC0diRFJkfVlFUrxQPIpRogPkS.jpg',
    tags: ['horror'], maturity: 'R'
  },
  {
    id: 'tt0910970', title: 'WALL·E', year: 2008, duration: '1h 38m',
    rating: '94% Match', imdb: '8.4', genre: 'Animation, Adventure, Family',
    cast: 'Ben Burtt, Elissa Knight, Jeff Garlin',
    director: 'Andrew Stanton',
    desc: 'In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.',
    poster: 'https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/8opAPvdmrTKHiMPV07yqAoR6kAy.jpg',
    tags: ['scifi'], maturity: 'G'
  },
  {
    id: 'tt0083658', title: 'Blade Runner', year: 1982, duration: '1h 57m',
    rating: '92% Match', imdb: '8.1', genre: 'Sci-Fi, Thriller',
    cast: 'Harrison Ford, Rutger Hauer, Sean Young',
    director: 'Ridley Scott',
    desc: 'A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
    poster: 'https://image.tmdb.org/t/p/w500/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/eIi3klFf7mp3HqFHMKv9JhCmi7.jpg',
    tags: ['scifi'], maturity: 'R'
  },
  {
    id: 'tt1856101', title: 'Blade Runner 2049', year: 2017, duration: '2h 44m',
    rating: '93% Match', imdb: '8.0', genre: 'Drama, Mystery, Sci-Fi',
    cast: 'Ryan Gosling, Harrison Ford, Ana de Armas',
    director: 'Denis Villeneuve',
    desc: 'A young blade runner\'s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.',
    poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/ilRyazdMXNypLvBsyA0VCQCQL6x.jpg',
    tags: ['scifi'], maturity: 'R'
  },
  {
    id: 'tt0088763', title: 'Back to the Future', year: 1985, duration: '1h 56m',
    rating: '96% Match', imdb: '8.5', genre: 'Adventure, Comedy, Sci-Fi',
    cast: 'Michael J. Fox, Christopher Lloyd, Lea Thompson',
    director: 'Robert Zemeckis',
    desc: 'Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend.',
    poster: 'https://image.tmdb.org/t/p/w500/fNOH9bg1cM4S0KFZQ9z0WVJEPvU.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fq3DSKQSMKa0RILWqI3UMqMeK5a.jpg',
    tags: ['scifi','comedy'], maturity: 'PG'
  },

  // ── NEW RELEASES ───────────────────────────────────
  {
    id: 'tt21807222', title: 'Deadpool & Wolverine', year: 2024, duration: '2h 7m',
    rating: '91% Match', imdb: '7.7', genre: 'Action, Comedy, Sci-Fi',
    cast: 'Ryan Reynolds, Hugh Jackman, Emma Corrin',
    director: 'Shawn Levy',
    desc: 'Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe.',
    poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg',
    tags: ['new','action'], maturity: 'R'
  },
  {
    id: 'tt8760708', title: 'Godzilla x Kong', year: 2024, duration: '1h 55m',
    rating: '86% Match', imdb: '6.4', genre: 'Action, Adventure, Sci-Fi',
    cast: 'Rebecca Hall, Brian Tyree Henry, Dan Stevens',
    director: 'Adam Wingard',
    desc: 'The mighty Kong and the fearsome Godzilla face a colossal undiscovered threat hidden within our world, challenging their very existence.',
    poster: 'https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/tMefBSflR6PGQLv7WvFPpTKfURu.jpg',
    tags: ['new','action','scifi'], maturity: 'PG-13'
  },
  {
    id: 'tt10366460', title: 'Wonka', year: 2023, duration: '1h 56m',
    rating: '87% Match', imdb: '7.0', genre: 'Adventure, Comedy, Family',
    cast: 'Timothée Chalamet, Olivia Colman, Hugh Grant',
    director: 'Paul King',
    desc: 'The story of how the world\'s greatest inventor, magician and chocolate-maker became the beloved Willy Wonka we know today.',
    poster: 'https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRkEaGnY.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/feCTJMWBOqDONLSrVWE9MHnMBX8.jpg',
    tags: ['new','comedy'], maturity: 'PG'
  },
  {
    id: 'tt3416532', title: 'Five Nights at Freddy\'s', year: 2023, duration: '1h 50m',
    rating: '78% Match', imdb: '5.4', genre: 'Horror, Mystery, Thriller',
    cast: 'Josh Hutcherson, Piper Rubio, Elizabeth Lail',
    director: 'Emma Tammi',
    desc: 'A troubled security guard begins working at Freddy Fazbear\'s Pizza. During his first night on the job, he realizes that the night shift won\'t be so easy to get through.',
    poster: 'https://image.tmdb.org/t/p/w500/A4j8S6moJS2zNtRR8T9ixOv4wRF.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xDMKBMGLEhiGtGDpZWFsULCNJZ6.jpg',
    tags: ['new','horror'], maturity: 'PG-13'
  },

  // ── CONTINUE WATCHING ──────────────────────────────
  {
    id: 'tt0111161', title: 'The Shawshank Redemption', year: 1994, duration: '2h 22m',
    rating: '99% Match', imdb: '9.3', genre: 'Drama',
    cast: 'Tim Robbins, Morgan Freeman, Bob Gunton',
    director: 'Frank Darabont',
    desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: 'https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    tags: ['continue','toprated'], progress: 65, maturity: 'R'
  },
  {
    id: 'tt0068646', title: 'The Godfather', year: 1972, duration: '2h 55m',
    rating: '98% Match', imdb: '9.2', genre: 'Crime, Drama',
    cast: 'Marlon Brando, Al Pacino, James Caan',
    director: 'Francis Ford Coppola',
    desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLeMMovrACed.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/tmU7GeKVjjZTdD1thRFaZCKMDMW.jpg',
    tags: ['continue','toprated'], progress: 30, maturity: 'R'
  },
  {
    id: 'tt0071562', title: 'The Godfather Part II', year: 1974, duration: '3h 22m',
    rating: '97% Match', imdb: '9.0', genre: 'Crime, Drama',
    cast: 'Al Pacino, Robert De Niro, Robert Duvall',
    director: 'Francis Ford Coppola',
    desc: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son Michael expands and tightens his grip on the family crime syndicate.',
    poster: 'https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/kSldCMqcZDzFEIfWFRpv1t0ycbj.jpg',
    tags: ['continue','toprated'], progress: 10, maturity: 'R'
  },
  {
    id: 'tt0050083', title: '12 Angry Men', year: 1957, duration: '1h 36m',
    rating: '96% Match', imdb: '9.0', genre: 'Crime, Drama',
    cast: 'Henry Fonda, Lee J. Cobb, Martin Balsam',
    director: 'Sidney Lumet',
    desc: 'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence.',
    poster: 'https://image.tmdb.org/t/p/w500/ppd84D2i9W8jXmsyInGyihiZBJh.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/qqnkjkFB5dERHONTBMwlNsS7MCB.jpg',
    tags: ['continue','toprated'], progress: 78, maturity: 'NR'
  },
];

/* ─── Hero Rotation Data ─────────────────────────── */
const HERO_MOVIES = [
  {
    id: 'tt0816692',
    bg: 'https://image.tmdb.org/t/p/original/tmU7GeKVjjZTdD1thRFaZCKMDMW.jpg',
    title: 'Interstellar',
    desc: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival as Earth\'s future grows increasingly uncertain.',
    badge: '🎬 #1 in Movies Today',
    match: '98% Match', year: 2014, rating: 'PG-13', duration: '2h 49m'
  },
  {
    id: 'tt1375666',
    bg: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    title: 'Inception',
    desc: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    badge: '🔥 Top 10 This Week',
    match: '97% Match', year: 2010, rating: 'PG-13', duration: '2h 28m'
  },
  {
    id: 'tt0468569',
    bg: 'https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CejMc9YP.jpg',
    title: 'The Dark Knight',
    desc: 'When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    badge: '⭐ All-Time Classic',
    match: '99% Match', year: 2008, rating: 'PG-13', duration: '2h 32m'
  },
  {
    id: 'tt15398776',
    bg: 'https://image.tmdb.org/t/p/original/fm6KqXpkh7zMkuqMlrp1O9RmFSO.jpg',
    title: 'Oppenheimer',
    desc: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. A cinematic masterpiece.',
    badge: '🏆 Award Winner',
    match: '96% Match', year: 2023, rating: 'R', duration: '3h'
  }
];

/* ─── Row Configuration ─────────────────────────── */
const ROWS = [
  { id: 'row-continue',  tag: 'continue',  showProgress: true,  showNum: false },
  { id: 'row-trending',  tag: 'trending',  showProgress: false, showNum: true  },
  { id: 'row-popular',   tag: 'popular',   showProgress: false, showNum: false },
  { id: 'row-toprated',  tag: 'toprated',  showProgress: false, showNum: false },
  { id: 'row-action',    tag: 'action',    showProgress: false, showNum: false },
  { id: 'row-comedy',    tag: 'comedy',    showProgress: false, showNum: false },
  { id: 'row-horror',    tag: 'horror',    showProgress: false, showNum: false },
  { id: 'row-scifi',     tag: 'scifi',     showProgress: false, showNum: false },
  { id: 'row-new',       tag: 'new',       showProgress: false, showNum: false },
];

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
let myList = JSON.parse(localStorage.getItem('netflux-mylist') || '[]');
let currentHeroIndex = 0;
let heroTimer = null;
let searchDebounceTimer = null;
let currentModalId = null;

/* ═══════════════════════════════════════════════════
   UTILITY HELPERS
═══════════════════════════════════════════════════ */
function saveList() {
  localStorage.setItem('netflux-mylist', JSON.stringify(myList));
}

function isInList(id) {
  return myList.includes(id);
}

function toggleList(id) {
  if (isInList(id)) {
    myList = myList.filter(m => m !== id);
  } else {
    myList.push(id);
  }
  saveList();
  renderMyList();
  updateModalListBtn(id);
}

function getMovieById(id) {
  return MOVIES.find(m => m.id === id) || null;
}

function getMoviesByTag(tag) {
  return MOVIES.filter(m => m.tags.includes(tag));
}

/* ═══════════════════════════════════════════════════
   LOADING SCREEN
═══════════════════════════════════════════════════ */
function hideLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  screen.classList.add('hidden');
  // Remove from DOM after transition
  setTimeout(() => screen.remove(), 700);
}

/* ═══════════════════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ─── Hamburger ──────────────────────────────────── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });
  // Close on link click
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

/* ─── Search ─────────────────────────────────────── */
function initSearch() {
  const toggle = document.getElementById('search-toggle');
  const input  = document.getElementById('search-input');
  const overlay = document.getElementById('search-overlay');

  toggle.addEventListener('click', () => {
    input.classList.toggle('open');
    if (input.classList.contains('open')) {
      input.focus();
    } else {
      input.value = '';
      overlay.classList.remove('active');
    }
  });

  input.addEventListener('input', () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => performSearch(input.value.trim()), 180);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.classList.remove('open');
      input.value = '';
      overlay.classList.remove('active');
    }
  });
}

function performSearch(query) {
  const overlay = document.getElementById('search-overlay');
  const grid    = document.getElementById('search-results-grid');
  const count   = document.getElementById('search-results-count');

  if (!query) {
    overlay.classList.remove('active');
    grid.innerHTML = '';
    return;
  }

  const q = query.toLowerCase();
  const results = MOVIES.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.genre.toLowerCase().includes(q) ||
    m.cast.toLowerCase().includes(q) ||
    m.director.toLowerCase().includes(q)
  );

  overlay.classList.add('active');
  count.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;

  if (results.length === 0) {
    grid.innerHTML = '<p style="color:#808080;grid-column:1/-1;padding:40px 0;text-align:center;">No results found. Try a different title or genre.</p>';
    return;
  }

  grid.innerHTML = results.map(m => `
    <div class="search-card" onclick="openModal('${m.id}')">
      <img src="${m.poster}" alt="${m.title}" loading="lazy"
           onerror="this.src='https://via.placeholder.com/160x240/222/666?text=No+Image'" />
      <div class="search-card-info">
        <div class="search-card-title">${m.title}</div>
        <div class="search-card-meta">${m.year} · ${m.genre.split(',')[0].trim()}</div>
      </div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════ */
function initHero() {
  buildHeroDots();
  renderHero(0);
  startHeroTimer();
}

function buildHeroDots() {
  const wrap = document.getElementById('hero-dots');
  wrap.innerHTML = HERO_MOVIES.map((_, i) =>
    `<div class="hero-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
  ).join('');
  wrap.querySelectorAll('.hero-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      goToHero(idx);
    });
  });
}

function renderHero(index) {
  const h = HERO_MOVIES[index];
  const img   = document.getElementById('hero-img');
  const title = document.getElementById('hero-title');
  const desc  = document.getElementById('hero-desc');
  const badge = document.querySelector('.hero-badge');
  const meta  = document.querySelector('.hero-meta');

  // Fade out
  const content = document.getElementById('hero-content');
  content.style.opacity = '0';
  content.style.transform = 'translateY(10px)';

  img.style.opacity = '0';
  setTimeout(() => {
    img.src = h.bg;
    img.onload = () => { img.style.opacity = '1'; };
    img.style.transition = 'opacity 0.8s ease';

    badge.textContent = h.badge;
    title.textContent = h.title;
    desc.textContent  = h.desc;
    meta.innerHTML = `
      <span class="hero-match">${h.match}</span>
      <span class="hero-year">${h.year}</span>
      <span class="hero-rating">${h.rating}</span>
      <span class="hero-duration">${h.duration}</span>
    `;
    // Update play buttons
    document.querySelectorAll('#hero-content .btn').forEach(btn => {
      btn.setAttribute('onclick', `openModal('${h.id}')`);
    });

    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
    content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }, 300);

  // Update dots
  document.querySelectorAll('.hero-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentHeroIndex = index;
}

function goToHero(index) {
  clearTimeout(heroTimer);
  renderHero(index);
  startHeroTimer();
}

function startHeroTimer() {
  heroTimer = setTimeout(() => {
    const next = (currentHeroIndex + 1) % HERO_MOVIES.length;
    renderHero(next);
    startHeroTimer();
  }, 7000);
}

/* ═══════════════════════════════════════════════════
   MOVIE ROWS
═══════════════════════════════════════════════════ */
function buildCard(movie, options = {}) {
  const { showProgress = false, showNum = false, index = 0 } = options;
  const inList = isInList(movie.id);

  const progressHTML = (showProgress && movie.progress != null)
    ? `<div class="card-progress"><div class="card-progress-fill" style="width:${movie.progress}%"></div></div>`
    : '';

  const numHTML = showNum
    ? `<div class="card-num">${index + 1}</div>`
    : '';

  return `
    <div class="movie-card" data-id="${movie.id}" role="button" tabindex="0" aria-label="${movie.title}">
      ${numHTML}
      <div class="card-img-wrap">
        <img class="card-img skeleton" src="" data-src="${movie.poster}" alt="${movie.title}"
             onerror="this.src='https://via.placeholder.com/220x330/1a1a1a/555?text=No+Image';this.classList.remove('skeleton');" />
        ${progressHTML}
        <div class="card-hover">
          <div class="card-play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div class="card-info">
            <div class="card-title">${movie.title}</div>
            <div class="card-meta">
              <span class="card-rating">${movie.rating}</span>
              <span class="card-year">${movie.year}</span>
              <span class="card-dur">${movie.duration}</span>
              <span class="card-tag">${movie.maturity || 'NR'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderRow(rowId, movies, options = {}) {
  const container = document.getElementById(rowId);
  if (!container) return;
  container.innerHTML = movies.map((m, i) => buildCard(m, { ...options, index: i })).join('');

  // Attach click handlers
  container.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.id); }
    });
  });

  // Lazy load images
  lazyLoadImages(container);
}

function renderMyList() {
  const section = document.getElementById('section-mylist');
  const row = document.getElementById('row-mylist');
  if (!row) return;

  const movies = MOVIES.filter(m => myList.includes(m.id));
  if (movies.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';
  renderRow('row-mylist', movies);
}

function initRows() {
  ROWS.forEach(r => {
    const movies = getMoviesByTag(r.tag);
    renderRow(r.id, movies, { showProgress: r.showProgress, showNum: r.showNum });
  });
  renderMyList();

  // Arrow scroll
  document.querySelectorAll('.row-arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
      const row = arrow.closest('.row-wrapper').querySelector('.movie-row');
      const dir = arrow.classList.contains('left') ? -1 : 1;
      row.scrollBy({ left: dir * (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) + 6) * 3, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════════════
   MODAL
═══════════════════════════════════════════════════ */
function openModal(id) {
  const movie = getMovieById(id);
  if (!movie) return;

  currentModalId = id;

  document.getElementById('modal-hero-img').src = movie.backdrop || movie.poster;
  document.getElementById('modal-title').textContent = movie.title;
  document.getElementById('modal-match').textContent = movie.rating;
  document.getElementById('modal-year').textContent = movie.year;
  document.getElementById('modal-dur').textContent = movie.duration;
  document.getElementById('modal-rating-badge').textContent = movie.maturity || 'NR';
  document.getElementById('modal-desc').textContent = movie.desc;
  document.getElementById('modal-genre').textContent = movie.genre;
  document.getElementById('modal-cast').textContent = movie.cast;
  document.getElementById('modal-director').textContent = movie.director;

  updateModalListBtn(id);

  // More like this — same genre tag
  const tag = movie.tags[0];
  const similar = MOVIES.filter(m => m.id !== id && m.tags.includes(tag)).slice(0, 6);
  const moreGrid = document.getElementById('modal-more-grid');
  moreGrid.innerHTML = similar.map(m => `
    <div class="modal-more-card" onclick="openModal('${m.id}')">
      <img src="${m.backdrop || m.poster}" alt="${m.title}" loading="lazy"
           onerror="this.src='${m.poster}'" />
      <div class="modal-more-info">
        <div class="modal-more-title">${m.title}</div>
        <div class="modal-more-meta">${m.year} · ${m.imdb} ⭐</div>
      </div>
    </div>
  `).join('');

  // Play button
  document.getElementById('modal-play').onclick = () => {
    alert(`▶ Now playing: ${movie.title}`);
  };

  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
  currentModalId = null;
}

function updateModalListBtn(id) {
  const btn  = document.getElementById('modal-add-list');
  const icon = document.getElementById('modal-list-icon');
  if (!btn || !icon) return;

  if (isInList(id)) {
    btn.classList.add('added');
    btn.title = 'Remove from My List';
    icon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
  } else {
    btn.classList.remove('added');
    btn.title = 'Add to My List';
    icon.innerHTML = '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>';
  }
}

function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('modal-add-list').addEventListener('click', () => {
    if (currentModalId) toggleList(currentModalId);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ═══════════════════════════════════════════════════
   LAZY LOADING
═══════════════════════════════════════════════════ */
function lazyLoadImages(root = document) {
  const images = root.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.remove('skeleton');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    images.forEach(img => obs.observe(img));
  } else {
    // Fallback
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('skeleton');
    });
  }
}

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
═══════════════════════════════════════════════════ */
function initScrollReveal() {
  const sections = document.querySelectorAll('.row-section');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  sections.forEach(s => obs.observe(s));
}

/* ═══════════════════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════════════════ */
function initBackToTop() {
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════
   NAV LINK ACTIVE STATE
═══════════════════════════════════════════════════ */
function initNavLinks() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/* ═══════════════════════════════════════════════════
   INITIALIZE EVERYTHING
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Simulate load time then reveal
  setTimeout(() => {
    hideLoadingScreen();

    initNavbar();
    initHamburger();
    initSearch();
    initHero();
    initRows();
    initModal();
    initScrollReveal();
    initBackToTop();
    initNavLinks();

  }, 2200);
});
