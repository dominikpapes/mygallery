https://web2-lab6-b3bv.onrender.com

aplikacija služi kao galerija 

1. native API - koristi se pristup kameri
2. aplikacija je installable u pregledniku Google Chrome
3. caching strategija je implementirana: linija 33 u serviceWorker.js,
		asseti definirani na liniji 2 u istoj datoteci se spremaju u cache i dohvaćaju po potrebi
      što između ostalog omogućava i offline rad aplikacije
4. offline rad funkcionira - moze se u dev tools/application/servie workers ukljuciti offline
5. background sync - kad aplikacija prede u offline način rada i kad se nakon toga ponovno poveže na internet
	započinje funkcija koja glumi background sync tako da se registrira sync event koji 3 sekunde nakon ponovnog povezivanja na internet
   šalje notifikaciju, nema pravog slanja podataka na neki server,
	u kodu je označeno gdje bi se to zapravo odvijalo (linija 18, serviceWorker.js)
6. push notifikacija - šalje se po završetku "background synca" i svaki put kad se uslika fotografija
7. progressive enhancement - kod provjere notifikacija; 
		prvo se provjerava jesu li notifikacije podržane u danom pregledniku te ako jesu se aktiviraju njihove funkcije,
		u protivnom aplikacija nastavlja s radom bez notifikacija
   graceful degradation - kod provjere kamere,
		pretpostavlja se da preglednik ima pristup kameri, ako nema postoji rjesenje za taj slučaj i aplikacija nastavlja funkcionirati

