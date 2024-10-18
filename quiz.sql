-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Paź 18, 2024 at 05:09 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kategoria`
--

CREATE TABLE `kategoria` (
  `ID` int(11) NOT NULL,
  `nazwa` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategoria`
--

INSERT INTO `kategoria` (`ID`, `nazwa`) VALUES
(1, 'Nauka'),
(2, 'Historia'),
(3, 'Geografia'),
(4, 'Literatura'),
(5, 'Sport'),
(6, 'Muzyka'),
(7, 'Kino'),
(8, 'Technologia'),
(9, 'Sztuka'),
(10, 'Matematyka');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pytania`
--

CREATE TABLE `pytania` (
  `ID` int(11) NOT NULL,
  `pytanie` varchar(1000) NOT NULL,
  `0` varchar(100) NOT NULL,
  `1` varchar(100) NOT NULL,
  `2` varchar(100) NOT NULL,
  `3` varchar(100) NOT NULL,
  `ID_kategorii` int(11) DEFAULT NULL,
  `correct` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pytania`
--

INSERT INTO `pytania` (`ID`, `pytanie`, `0`, `1`, `2`, `3`, `ID_kategorii`, `correct`) VALUES
(1, 'Który pierwiastek ma symbol chemiczny O?', 'Ołów', 'Osm', 'Tlen', 'Tytan', 1, 2),
(2, 'Ile planet znajduje się w Układzie Słonecznym?', '7', '8', '9', '10', 1, 1),
(3, 'Kto opracował teorię względności?', 'Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Nikola Tesla', 1, 1),
(4, 'Jak nazywa się proces zamiany wody w parę?', 'Kondensacja', 'Parowanie', 'Sublimacja', 'Skraplanie', 1, 1),
(5, 'Jak nazywa się najdłuższa kość w ciele człowieka?', 'Kość ramienna', 'Kość udowa', 'Kość piszczelowa', 'Kość strzałkowa', 1, 1),
(6, 'Ile chromosomów ma człowiek?', '46', '48', '50', '44', 1, 0),
(7, 'Jakie zwierzę jest największym ssakiem lądowym?', 'Słoń', 'Nosorożec', 'Bizon', 'Hipopotam', 1, 0),
(8, 'Które z poniższych jest pierwiastkiem chemicznym?', 'Sól', 'Woda', 'Hel', 'Kwas', 1, 2),
(9, 'Co to jest fotosynteza?', 'Proces oddychania', 'Proces wytwarzania tlenu', 'Proces wytwarzania energii przez rośliny', 'Proces oddychania przez zwierzęta', 1, 2),
(10, 'Który narząd odpowiada za filtrację krwi?', 'Płuca', 'Serce', 'Wątroba', 'Nerki', 1, 3),
(11, 'Kto wynalazł żarówkę?', 'Alexander Graham Bell', 'Nikola Tesla', 'Thomas Edison', 'James Watt', 1, 2),
(12, 'Co to jest gen?', 'Jednostka informacji dziedzicznej', 'Komórka', 'Organ', 'Bakteria', 1, 0),
(13, 'Jaki jest symbol chemiczny złota?', 'Zn', 'Au', 'Ag', 'Fe', 1, 1),
(14, 'Co mierzy skala Richtera?', 'Trzęsienia ziemi', 'Ciśnienie atmosferyczne', 'Wielkość obwodu Ziemi', 'Promieniowanie', 1, 0),
(15, 'Jakie jest wzór na prędkość?', 'masa x objętość', 'odległość / czas', 'ciśnienie x objętość', 'moc / praca', 1, 1),
(16, 'W którym roku wybuchła II wojna światowa?', '1938', '1939', '1941', '1945', 2, 1),
(17, 'Kto był pierwszym prezydentem USA?', 'Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams', 2, 2),
(18, 'Które imperium było najrozleglejsze w historii?', 'Imperium Rzymskie', 'Imperium Osmańskie', 'Imperium Mongolskie', 'Imperium Brytyjskie', 2, 3),
(19, 'Jakie miasto było stolicą Cesarstwa Bizantyjskiego?', 'Ateny', 'Rzym', 'Konstantynopol', 'Aleksandria', 2, 2),
(20, 'Kiedy miała miejsce Rewolucja Francuska?', '1756', '1789', '1804', '1830', 2, 1),
(21, 'Jakie państwo zaatakowało Polskę 1 września 1939?', 'Związek Radziecki', 'Niemcy', 'Francja', 'Włochy', 2, 1),
(22, 'Kto był przywódcą ZSRR podczas II wojny światowej?', 'Władimir Lenin', 'Nikita Chruszczow', 'Iosif Stalin', 'Michał Gorbaczow', 2, 2),
(23, 'W którym roku upadło Cesarstwo Zachodniorzymskie?', '376', '410', '476', '530', 2, 2),
(24, 'Jakie wydarzenie rozpoczęło Rewolucję Amerykańską?', 'Bitwa pod Gettysburgiem', 'Bitwa pod Bunker Hill', 'Bitwa o Boston', 'Bostońska Herbatka', 2, 3),
(25, 'Kto wynalazł druk?', 'Galileo Galilei', 'Johannes Gutenberg', 'Leonardo da Vinci', 'Isaac Newton', 2, 1),
(26, 'Kto był cesarzem Francji w 1804 roku?', 'Ludwik XIV', 'Napoleon Bonaparte', 'Karol Wielki', 'Filip IV', 2, 1),
(27, 'W którym roku wybuchła I wojna światowa?', '1914', '1918', '1939', '1945', 2, 0),
(28, 'Kto był pierwszym królem Polski?', 'Mieszko I', 'Bolesław Chrobry', 'Kazimierz Wielki', 'Władysław Łokietek', 2, 1),
(29, 'Jakie imperium było odpowiedzialne za upadek Konstantynopola w 1453 roku?', 'Imperium Osmańskie', 'Imperium Perskie', 'Imperium Rzymskie', 'Imperium Greckie', 2, 0),
(30, 'Kiedy doszło do rozbiorów Polski?', 'XVII wiek', 'XVIII wiek', 'XIX wiek', 'XX wiek', 2, 1),
(31, 'Jakie jest największe państwo na świecie pod względem powierzchni?', 'Kanada', 'Chiny', 'Rosja', 'Stany Zjednoczone', 3, 2),
(32, 'Która rzeka jest najdłuższa na świecie?', 'Amazonka', 'Nil', 'Jangcy', 'Missisipi', 3, 1),
(33, 'Jakie miasto jest stolicą Kanady?', 'Toronto', 'Vancouver', 'Ottawa', 'Montreal', 3, 2),
(34, 'Które z tych państw nie ma dostępu do morza?', 'Polska', 'Austria', 'Hiszpania', 'Portugalia', 3, 1),
(35, 'Gdzie znajduje się Wielki Kanion?', 'Meksyk', 'Chile', 'Stany Zjednoczone', 'Brazylia', 3, 2),
(36, 'Który kontynent jest najmniejszy pod względem powierzchni?', 'Australia', 'Antarktyda', 'Europa', 'Afryka', 3, 0),
(37, 'Jakie miasto jest stolicą Australii?', 'Sydney', 'Melbourne', 'Canberra', 'Brisbane', 3, 2),
(38, 'W którym kraju znajduje się Kilimandżaro?', 'Kenia', 'Tanzania', 'RPA', 'Uganda', 3, 1),
(39, 'Jaka jest stolica Japonii?', 'Osaka', 'Tokio', 'Kioto', 'Nagoya', 3, 1),
(40, 'W którym kraju znajduje się Wielki Mur Chiński?', 'Mongolia', 'Chiny', 'Korea Północna', 'Japonia', 3, 1),
(41, 'Jaka jest największa pustynia na świecie?', 'Sahara', 'Pustynia Gobi', 'Pustynia Atakama', 'Antarktyda', 3, 3),
(42, 'Które z tych miast znajduje się na półkuli południowej?', 'Londyn', 'Buenos Aires', 'Nowy Jork', 'Paryż', 3, 1),
(43, 'Jakie jest najwyższe pasmo górskie na świecie?', 'Himalaje', 'Andes', 'Alpy', 'Kordyliery', 3, 0),
(44, 'Która wyspa jest największa na świecie?', 'Grenlandia', 'Madagaskar', 'Borneo', 'Nowa Gwinea', 3, 0),
(45, 'Jakie państwo graniczy z Polską na południu?', 'Rosja', 'Czechy', 'Litwa', 'Niemcy', 3, 1),
(46, 'Kto napisał \"Zbrodnię i karę\"?', 'Lew Tołstoj', 'Anton Czechow', 'Fiodor Dostojewski', 'Aleksander Puszkin', 4, 2),
(47, 'Jakie jest główne dzieło Homera?', 'Iliada', 'Odyseja', 'Eneida', 'Boska Komedia', 4, 0),
(48, 'Który z pisarzy napisał \"Władcę Pierścieni\"?', 'C.S. Lewis', 'J.R.R. Tolkien', 'George R.R. Martin', 'J.K. Rowling', 4, 1),
(49, 'Kto napisał \"Dziady\"?', 'Henryk Sienkiewicz', 'Adam Mickiewicz', 'Juliusz Słowacki', 'Stefan Żeromski', 4, 1),
(50, 'Jaka powieść została napisana przez George’a Orwella?', 'Rok 1984', 'Brave New World', 'Nowy wspaniały świat', 'Zabić drozda', 4, 0),
(51, 'Jak nazywa się główny bohater \"Don Kichota\"?', 'Don Juan', 'Don Kichot', 'Sancho Pansa', 'Quasimodo', 4, 1),
(52, 'Kto napisał \"Opowieść wigilijną\"?', 'Oscar Wilde', 'Charles Dickens', 'Mark Twain', 'Ernest Hemingway', 4, 1),
(53, 'Jakie dzieło napisał William Shakespeare?', 'Hamlet', 'Odyseja', 'Proces', 'Bracia Karamazow', 4, 0),
(54, 'Kto napisał \"Wojna i pokój\"?', 'Anton Czechow', 'Fiodor Dostojewski', 'Lew Tołstoj', 'Iwan Turgieniew', 4, 2),
(55, 'Jaka książka opowiada o podróżach Guliwera?', 'W 80 dni dookoła świata', 'Podróże Guliwera', 'Robinson Crusoe', 'Wyspa Skarbów', 4, 1),
(56, 'Jaka postać występuje w książkach Agathy Christie?', 'Hercule Poirot', 'Sherlock Holmes', 'Philip Marlowe', 'James Bond', 4, 0),
(57, 'Kto jest autorem \"Małego Księcia\"?', 'J.R.R. Tolkien', 'Antoine de Saint-Exupéry', 'J.K. Rowling', 'Hans Christian Andersen', 4, 1),
(58, 'Jaka książka jest częścią trylogii \"Igrzyska Śmierci\"?', 'Kosogłos', 'Więzień Labiryntu', 'Zmierzch', 'Harry Potter', 4, 0),
(59, 'Jak nazywa się główny bohater \"Moby Dicka\"?', 'Ahab', 'Gulliver', 'Kapitan Nemo', 'Jack Sparrow', 4, 0),
(60, 'Kto napisał \"Pana Tadeusza\"?', 'Juliusz Słowacki', 'Adam Mickiewicz', 'Henryk Sienkiewicz', 'Stanisław Wyspiański', 4, 1),
(61, 'W jakim sporcie rywalizuje Usain Bolt?', 'Koszykówka', 'Piłka nożna', 'Lekkoatletyka', 'Pływanie', 5, 2),
(62, 'Ile zawodników liczy drużyna piłkarska?', '10', '11', '12', '13', 5, 1),
(63, 'Które miasto było gospodarzem letnich igrzysk olimpijskich w 2012 roku?', 'Paryż', 'Londyn', 'Tokio', 'Rio de Janeiro', 5, 1),
(64, 'Kto zdobył najwięcej tytułów mistrza świata w Formule 1?', 'Ayrton Senna', 'Michael Schumacher', 'Lewis Hamilton', 'Sebastian Vettel', 5, 1),
(65, 'W jakim sporcie można zdobyć hat-tricka?', 'Tenis', 'Koszykówka', 'Piłka nożna', 'Lekkoatletyka', 5, 2),
(66, 'Kto jest rekordzistą świata w biegu na 100 metrów?', 'Carl Lewis', 'Usain Bolt', 'Tyson Gay', 'Yohan Blake', 5, 1),
(67, 'Ile setów gra się w meczu tenisowym?', '3', '5', '7', '2', 5, 1),
(68, 'Która drużyna wygrała Mistrzostwa Świata w Piłce Nożnej 2018?', 'Francja', 'Chorwacja', 'Niemcy', 'Argentyna', 5, 0),
(69, 'Który sport jest najbardziej popularny w Indiach?', 'Piłka nożna', 'Krykiet', 'Koszykówka', 'Siatkówka', 5, 1),
(70, 'Kto wygrał najwięcej turniejów Wielkiego Szlema w tenisie?', 'Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Pete Sampras', 5, 1),
(71, 'Jaką dyscyplinę sportową uprawiał Michael Jordan?', 'Koszykówka', 'Piłka nożna', 'Tenis', 'Golf', 5, 0),
(72, 'Gdzie odbyły się pierwsze nowożytne igrzyska olimpijskie?', 'Rzym', 'Paryż', 'Ateny', 'Londyn', 5, 2),
(73, 'Kto zdobył najwięcej punktów w historii NBA?', 'Kobe Bryant', 'Michael Jordan', 'LeBron James', 'Kareem Abdul-Jabbar', 5, 3),
(74, 'Który kraj zdobył najwięcej medali olimpijskich?', 'USA', 'Rosja', 'Chiny', 'Wielka Brytania', 5, 0),
(75, 'Ile trwała najdłuższa walka bokserska w historii?', '10 rund', '15 rund', '20 rund', '110 rund', 5, 3),
(76, 'Kto jest znany jako \"Król Popu\"?', 'Elvis Presley', 'Michael Jackson', 'Freddie Mercury', 'Prince', 6, 1),
(77, 'Który zespół stworzył album \"The Wall\"?', 'Led Zeppelin', 'Pink Floyd', 'The Beatles', 'Queen', 6, 1),
(78, 'Jak nazywa się instrument z klawiaturą, na którym gra się pedałami?', 'Gitara', 'Perkusja', 'Harfa', 'Organy', 6, 3),
(79, 'Który kompozytor stworzył \"IX Symfonię\"?', 'Mozart', 'Beethoven', 'Bach', 'Vivaldi', 6, 1),
(80, 'Jak nazywa się słynny gitarzysta zespołu Queen?', 'Freddie Mercury', 'Brian May', 'Jimmy Page', 'Eric Clapton', 6, 1),
(81, 'Który kraj jest znany z tradycyjnej muzyki flamenco?', 'Włochy', 'Hiszpania', 'Francja', 'Portugalia', 6, 1),
(82, 'Jakie są cztery główne rodzaje instrumentów w orkiestrze?', 'Smyczkowe, Dęte drewniane, Dęte blaszane, Perkusyjne', 'Dęte drewniane, Perkusyjne, Klawiszowe, Elektryczne', 'Smyczkowe, Klawiszowe, Elektroniczne, Perkusyjne', 'Dęte blaszane, Smyczkowe, Elektroniczne, Wokalne', 6, 0),
(83, 'Który instrument jest często kojarzony z jazzem?', 'Trąbka', 'Gitara elektryczna', 'Skrzypce', 'Flet', 6, 0),
(84, 'Jak nazywa się znana nagroda muzyczna przyznawana w Stanach Zjednoczonych?', 'Oscar', 'Złoty Glob', 'Grammy', 'Tony', 6, 2),
(85, 'Która piosenkarka jest autorką hitu \"Like a Prayer\"?', 'Madonna', 'Lady Gaga', 'Beyoncé', 'Whitney Houston', 6, 0),
(86, 'Kto jest autorem \"Symfonii Fantastycznej\"?', 'Mozart', 'Chopin', 'Berlioz', 'Brahms', 6, 2),
(87, 'Który z poniższych zespołów jest związany z grunge?', 'The Rolling Stones', 'Nirvana', 'The Beatles', 'Radiohead', 6, 1),
(88, 'Kto skomponował \"Cztery pory roku\"?', 'Beethoven', 'Mozart', 'Vivaldi', 'Bach', 6, 2),
(89, 'Który artysta nagrał utwór \"Imagine\"?', 'Paul McCartney', 'John Lennon', 'George Harrison', 'Ringo Starr', 6, 1),
(90, 'Jakie są główne style muzyczne w epoce baroku?', 'Opera, Kantata, Oratorium', 'Symfonia, Sonata, Rondo', 'Ballada, Pieśń, Walc', 'Tango, Samba, Rumba', 6, 0),
(91, 'Kto wyreżyserował film \"Titanic\"?', 'Steven Spielberg', 'James Cameron', 'Christopher Nolan', 'Quentin Tarantino', 7, 1),
(92, 'Który film zdobył Oscara za najlepszy film w 1994 roku?', 'Forrest Gump', 'Pulp Fiction', 'The Shawshank Redemption', 'Braveheart', 7, 0),
(93, 'Kto zagrał rolę Iron Mana w serii filmów Marvela?', 'Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo', 7, 1),
(94, 'Jaka seria filmowa opowiada o czarodzieju o imieniu Harry?', 'Władca Pierścieni', 'Harry Potter', 'Zmierzch', 'Hobbit', 7, 1),
(95, 'Który reżyser stworzył trylogię \"Władca Pierścieni\"?', 'Steven Spielberg', 'Peter Jackson', 'James Cameron', 'Martin Scorsese', 7, 1),
(96, 'Jak nazywa się najbardziej prestiżowa nagroda filmowa w USA?', 'Grammy', 'Oscar', 'Złoty Glob', 'Tony', 7, 1),
(97, 'Kto wcielił się w rolę Jokera w filmie \"The Dark Knight\"?', 'Jared Leto', 'Joaquin Phoenix', 'Heath Ledger', 'Jack Nicholson', 7, 2),
(98, 'Który aktor grał główną rolę w filmie \"Gladiator\"?', 'Tom Cruise', 'Brad Pitt', 'Russell Crowe', 'Leonardo DiCaprio', 7, 2),
(99, 'W jakim filmie pojawia się fraza \"May the Force be with you\"?', 'Star Wars', 'Star Trek', 'The Matrix', 'Avatar', 7, 0),
(100, 'Kto wyreżyserował film \"Pulp Fiction\"?', 'Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'James Cameron', 7, 2),
(101, 'Jaka jest prawdziwa tożsamość Batmana?', 'Clark Kent', 'Bruce Wayne', 'Peter Parker', 'Tony Stark', 7, 1),
(102, 'Który aktor grał główną rolę w filmie \"Forrest Gump\"?', 'Tom Hanks', 'Robin Williams', 'Mel Gibson', 'Harrison Ford', 7, 0),
(103, 'W którym filmie pojawia się postać o imieniu Neo?', 'Star Wars', 'Inception', 'The Matrix', 'Avatar', 7, 2),
(104, 'Kto zagrał główną rolę w filmie \"Indiana Jones\"?', 'Tom Hanks', 'Harrison Ford', 'Bruce Willis', 'Arnold Schwarzenegger', 7, 1),
(105, 'Który film wyreżyserował Steven Spielberg?', 'Titanic', 'Jurassic Park', 'Avatar', 'The Godfather', 7, 1),
(106, 'Kto wynalazł telefon?', 'Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'James Watt', 8, 1),
(107, 'Który system operacyjny stworzył Microsoft?', 'Linux', 'Windows', 'MacOS', 'Android', 8, 1),
(108, 'Która firma wyprodukowała pierwszy iPhone?', 'Samsung', 'Apple', 'Google', 'Huawei', 8, 1),
(109, 'Co to jest HTML?', 'Język programowania', 'Język znaczników', 'Protokół internetowy', 'Baza danych', 8, 1),
(110, 'Która przeglądarka internetowa została stworzona przez Google?', 'Internet Explorer', 'Safari', 'Firefox', 'Chrome', 8, 3),
(111, 'Co oznacza skrót \"CPU\"?', 'Centralna Jednostka Mocy', 'Centralna Jednostka Przetwarzania', 'Centralny Procesor', 'Centralna Pamięć', 8, 1),
(112, 'Która firma stworzyła system Android?', 'Apple', 'Microsoft', 'Google', 'IBM', 8, 2),
(113, 'Jakie urządzenie służy do przechowywania danych?', 'Monitor', 'Procesor', 'Dysk twardy', 'Zasilacz', 8, 2),
(114, 'Który z tych wynalazców jest kojarzony z prądem przemiennym?', 'Thomas Edison', 'Nikola Tesla', 'Benjamin Franklin', 'Alessandro Volta', 8, 1),
(115, 'Kiedy wynaleziono pierwszy komputer?', '1946', '1955', '1960', '1970', 8, 0),
(116, 'Który język programowania jest używany do tworzenia stron internetowych?', 'Python', 'C++', 'JavaScript', 'Ruby', 8, 2),
(117, 'Co oznacza skrót \"Wi-Fi\"?', 'Wireless Fidelity', 'Wide Fidelity', 'Wireless Fiber', 'Wide Fiber', 8, 0),
(118, 'Która technologia służy do przechowywania danych w chmurze?', 'Bluetooth', 'Ethernet', 'Cloud Storage', 'Fibre Optic', 8, 2),
(119, 'Kto wynalazł żarówkę?', 'Nikola Tesla', 'Isaac Newton', 'Thomas Edison', 'Alexander Graham Bell', 8, 2),
(120, 'Jakie urządzenie umożliwia wykonywanie połączeń telefonicznych?', 'Router', 'Modem', 'Smartfon', 'Klawiatura', 8, 2),
(121, 'Kto namalował \"Mona Lisę\"?', 'Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet', 9, 2),
(122, 'Który styl artystyczny był charakterystyczny dla Picassa?', 'Impresjonizm', 'Kubizm', 'Surrealizm', 'Barok', 9, 1),
(123, 'Jak nazywa się słynna rzeźba Michała Anioła?', 'Mojżesz', 'Dawid', 'Pieta', 'Apollo', 9, 1),
(124, 'Która technika polega na malowaniu farbą na mokrym tynku?', 'Fresk', 'Akwaforta', 'Tempera', 'Mozaika', 9, 0),
(125, 'Jaka epoka była czasem największego rozkwitu sztuki w Europie?', 'Renesans', 'Barok', 'Romantyzm', 'Średniowiecze', 9, 0),
(126, 'Kto namalował \"Słoneczniki\"?', 'Claude Monet', 'Salvador Dali', 'Vincent van Gogh', 'Edgar Degas', 9, 2),
(127, 'W jakim muzeum znajduje się \"Mona Lisa\"?', 'Prado', 'Luwr', 'Tate Modern', 'MOMA', 9, 1),
(128, 'Który malarz jest kojarzony z impresjonizmem?', 'Claude Monet', 'Pablo Picasso', 'Salvador Dali', 'Edvard Munch', 9, 0),
(129, 'Jakie dzieło stworzył Leonardo da Vinci?', 'Gwiazda Betlejemska', 'Ostatnia Wieczerza', 'Guernica', 'Panny z Avignonu', 9, 1),
(130, 'Jak nazywa się kierunek artystyczny, który odrzucał realizm i dążył do oddania emocji?', 'Kubizm', 'Ekspresjonizm', 'Futuryzm', 'Realizm', 9, 1),
(131, 'Który malarz jest autorem \"Krzyku\"?', 'Vincent van Gogh', 'Edvard Munch', 'Pablo Picasso', 'Salvador Dali', 9, 1),
(132, 'Jaki jest główny temat rzeźb Augusta Rodina?', 'Religia', 'Miłość', 'Wojna', 'Mitologia', 9, 1),
(133, 'Kto jest autorem fresku \"Stworzenie Adama\"?', 'Leonardo da Vinci', 'Michelangelo', 'Rafael', 'Caravaggio', 9, 1),
(134, 'Który artysta stworzył rzeźbę \"Mojżesza\"?', 'Bernini', 'Donatello', 'Michelangelo', 'Rodin', 9, 2),
(135, 'Który artysta stworzył dzieło \"Guernica\"?', 'Salvador Dali', 'Pablo Picasso', 'Joan Miró', 'Henri Matisse', 9, 1),
(136, 'Ile wynosi pierwiastek kwadratowy z 16?', '2', '3', '4', '5', 10, 2),
(137, 'Ile stopni ma kąt prosty?', '45', '60', '90', '180', 10, 2),
(138, 'Jakie jest pole kwadratu o boku 5 cm?', '10 cm²', '15 cm²', '20 cm²', '25 cm²', 10, 3),
(139, 'Co to jest liczba pierwsza?', 'Liczba podzielna przez 2', 'Liczba, która ma dokładnie dwa dzielniki', 'Liczba, która ma więcej niż dwa dzielniki', 'Liczba podzielna przez 3', 10, 1),
(140, 'Ile wynosi suma kątów wewnętrznych w trójkącie?', '180°', '360°', '270°', '90°', 10, 0),
(141, 'Ile to jest 5 silnia (5!)?', '25', '50', '120', '60', 10, 2),
(142, 'Co to jest promień koła?', 'Odległość od środka koła do dowolnego punktu na okręgu', 'Odległość do najdalszego punktu okręgu', 'Obwód koła', 'Średnica koła', 10, 0),
(143, 'Jaka jest jednostka pola powierzchni?', 'Metr', 'Metr kwadratowy', 'Centymetr sześcienny', 'Kilogram', 10, 1),
(144, 'Ile wynosi wartość liczby Pi?', '3.12', '3.14', '3.16', '3.18', 10, 1),
(145, 'Co to jest twierdzenie Pitagorasa?', 'a² + b² = c²', 'a + b = c', 'a² - b² = c²', 'a/b = c/d', 10, 0),
(146, 'Co oznacza \"π\" w matematyce?', 'Stosunek obwodu koła do jego średnicy', 'Pierwiastek kwadratowy z liczby', 'Wartość liczby e', 'Stosunek długości do szerokości', 10, 0),
(147, 'Ile boków ma sześciokąt?', '4', '5', '6', '7', 10, 2),
(148, 'Ile wynosi suma kątów wewnętrznych czworokąta?', '180°', '360°', '270°', '90°', 10, 1),
(149, 'Jaki jest wynik działania 7 × 8?', '49', '54', '56', '64', 10, 2),
(150, 'Co to jest średnia arytmetyczna?', 'Najczęściej występująca wartość', 'Średnia różnica wartości', 'Suma wartości podzielona przez ich liczbę', 'Liczba najbliższa medianie', 10, 2);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `pytania`
--
ALTER TABLE `pytania`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `pytania_ibfk_1` (`ID_kategorii`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pytania`
--
ALTER TABLE `pytania`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pytania`
--
ALTER TABLE `pytania`
  ADD CONSTRAINT `pytania_ibfk_1` FOREIGN KEY (`ID_kategorii`) REFERENCES `kategoria` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
