# Hittaborrarna Widget

### En widget för förändringsanalys mellan två rasterbilder<br>

<p>Denna widget förenklar valet av de satellitbilder som ingår i en förändringsanalys av eventuellt barkborreskadad skog. Den gör det dessutom enklare för användaren att hantera de parametrar som går att justera i analysen. Genom denna widget blir det möjligt att integrera förändringsanalysen med din egen organisations GIS-data och på så sätt strömlinjeforma ett arbetsflöde som underlättar letandet efter områden drabbade av granbarkborrens härjningar hela vägen från bildanalys till fältarbetet.</p>
<p></p>
<p>Exemplet nedan visar ett område där förändringen mellan två bilder analyserats.</p>
<table style="width:100%">
  <tr>
    <td><img title="Sentinel2-bild från 2018-05-19" src="https://user-images.githubusercontent.com/26382924/84357717-6b485c00-abc6-11ea-9e9d-e4fdc0ed7c61.png" width="300px"></td>
    <td><img title="Sentinel2-bild från 2019-05-29" src="https://user-images.githubusercontent.com/26382924/84357714-6aafc580-abc6-11ea-8b96-52c82f234400.png" width="300px"></td>
    <td><img title="Analys mellan 2018-05-19 och 2019-05-29" src="https://user-images.githubusercontent.com/26382924/84357684-5f5c9a00-abc6-11ea-8e00-32e195269ff9.png" width="300px"></td>
  </tr>
  <tr>
    <td>Sentinel2-bild från 2018-05-19</td>
    <td>Sentinel2-bild från 2019-05-29</td>
    <td>Förändringsanalysen visar med<br>gulgrön färg de områden som<br>förändrats mellan de båda tillfällena</td>
  </tr>
</table>

<p>Analysen som utförs bygger på analys av satellitdata från Sentinel-2 inom det europeiska <a href="https://www.copernicus.eu/sv/">Copernicusprogrammet</a>. Satelliterna passerar Sverige flera gånger per vecka och kan därmed utnyttjas för att snabbt får en aktuell analys. Som vädret är i Sverige kommer tyvärr många bilder att innehålla moln och sökandet efter dem kan vara svårt och tidskrävande. Den här widgten underlättar sökandet efter de molnfria bilder som är lämpliga för analysen men gör det också möjligt att snabbt utföra själva analysen på de molnfria bilderna som valts.</p>

<p>I princip kan vilka bilder som helst användas för att analysera skogen. Funktionen filtrerar nämligen bort de områden som är täckta av moln, dis eller har ett av moln beskuggat område. Pixlar med snö kommer heller inte att analyseras. Men väljer man för molniga bilder eller bilder med snö kan analysen bli direkt felaktig eftersom det finns för få pixlar kvar som går att analysera.</p>

<p>Tjänsten bygger i grunden på en förändringsanalys där skillnaden i vegetationsindex mellan två bilder visas. Förändringarna görs på den skog som klassats som barrskogar eller blandskogar i Naturvårdsverkets <a href=https://www.naturvardsverket.se/Sa-mar-miljon/Kartor/Nationella-Marktackedata-NMD/">Nationella Marktäckedata (NMD)</a>. Användaren får därmed möjlighet att följa de  vitalitetsförändringar som poteniellt kan vara orsakade av granbarkborren.</p>

### Var försiktig med tolkningarna av resultatet

<p>Kunskapen om hur skador från t.ex. granbarkborre yttrar sig i satellitbilder är fortfarande ett reltivt outforskat område. Var därför försiktig med tolkningarna. Alla förändringar som syns är inte angrepp av granbarkborre utan det kan lika gärna vara avverkningar och gallringar. Alla analyser bör därför fältkontrolleras och verifieras.</p>

<p>För att det ska vara möjligt att upptäcka eventuella angrepp av barkborre måste analysen baseras på ett tillräckligt stort tidsspann mellan de två två bilderna. Hur stort det spannet ska vara kan variera mycket - från ett antal veckor till ett antal månader. Kunskapen om vad det är som avgör hur snart granbarkborrens angrepp syns i data från satellitbilder håller på att byggas upp. Full förståelse och tillräcklig erfarenhet saknas förnärvarande.</p>

## Innehållsförteckning

- [Systemkrav](#systemkrav)
- [Friskrivning](#friskrivning)
- [Indata](#indata)
  - [Bildtjänsten Sentinel2_2_0](#bildtjänsten-sentinel2_2_0)
  - [Metadata om moln från webapi](#metadata-om-moln-från-webapi)
- [Installation](#installation)
  - [Installera Widget](#installera-widget)
  - [Installera Proxy för Portal](#installera-proxy-för-portal)
  - [Lägga till och konfigurera Widget](#lägga-till-och-konfigurera-widget)
- [Användning](#användning)
  - [Kartlager](#kartlager)
  - [Bildväljare](#bildväljare)
  - [Valbara parametrar](#valbara-parametrar)
  - [Method](#method)
  - [Translation](#translation)
  - [Vegetation Index](#vegetation-index)
  - [Soil](#soil)
  - [Radnorm](#radnorm)
  - [NIR Band](#nir-band)
  - [Red Band](#red-band)
- [Licens](#licens)

## Friskrivning

Skogsstyrelsen friskriver sig från eventuella felaktigheter i kod.<br>
Skogsstyrelsen tar inte ansvar för att resultatet av en utförd förändringsanalys är korrekt.

## Systemkrav

- ArcGIS portal 10.7.1 med Web App Builder.
- Web App Builder Developer Edition ver 2.12 för att skapa fristående appliktioner eller anpassa widget.
- API nyckel för Skogsstyrelsens webapi som används av Bildväljaren.
- Användarnamn och lösenord för den ArcGIS bildtjänst med Sentineldata som används i widgeten. <a href="https://skogsstyrelsen.se/sjalvservice/karttjanster/geodatatjanster/skaffa-anvandarkonto/"> Beställ användarkonto på Skogsstyrelsens webbplats</a>.

## Indata

### Bildtjänsten Sentinel2_2_0

<p>Analysen bygger på data från satelliten Sentinel-2. Dessa data laddas dagligen ner till Skogsstyrelsen och görs tillgängliga via en bildtjänst med namnet Sentinel2_2_0. Som regel är nya uppdaterade data från gårdagens satellitpassager över Sverige på plats kl 09:30 dagen efter. Informationen om andelen moln är då samtidigt uppdaterade i en databas.</p>
<p>Spektralbanden från Sentinel-2 är i tjänsten ordnade i en ordningsföljd som i huvudsak beror av pixelstorleken i originaldata.<br>Bildtjänsten Sentinel2_2_0 har följande bandordning:
<table style="width:100%">
  <tr>
    <td><b>Bandnummer i bildtjänsten</b></td>
    <td><b>Motsvarar spektralband</b></td>
    <td><b>Min våglängd (nm)</b></td>
    <td><b>Max våglängd (nm)</b></td>
    <td><b>Pixelstorlek (m)</b></td>
  </tr>
  <tr>
    <td>1</td>
    <td>B2-Blue</td>
    <td>458</td>
    <td>522</td>
    <td>10</td>
  </tr>
  <tr>
    <td>2</td>
    <td>B3-Green</td>
    <td>543</td>
    <td>577</td>
    <td>10</td>
  </tr>
  <tr>
    <td>3</td>
    <td>B4-Red</td>
    <td>650</td>
    <td>680</td>
    <td>10</td>
  </tr>
  <tr>
    <td>4</td>
    <td>B8-NIR</td>
    <td>784</td>
    <td>899</td>
    <td>10</td>
  </tr>
  <tr>
    <td>5</td>
    <td>B5-RE1</td>
    <td>698</td>
    <td>712</td>
    <td>20</td>
  </tr>
  <tr>
    <td>6</td>
    <td>B6-RE2</td>
    <td>733</td>
    <td>747</td>
    <td>20</td>
  </tr>
  <tr>
    <td>7</td>
    <td>B7-RE3</td>
    <td>773</td>
    <td>793</td>
    <td>20</td>
  </tr>
  <tr>
    <td>8</td>
    <td>B8A-RE4</td>
    <td>855</td>
    <td>875</td>
    <td>20</td>
  </tr>
  <tr>
    <td>9</td>
    <td>B11-SWIR1</td>
    <td>1565</td>
    <td>1655</td>
    <td>20</td>
  </tr>
  <tr>
    <td>10</td>
    <td>B12-SWIR2</td>
    <td>2100</td>
    <td>2280</td>
    <td>20</td>
  </tr>
  <tr>
    <td>11</td>
    <td>B1-Coast/Aerosol</td>
    <td>433</td>
    <td>453</td>
    <td>60</td>
  </tr>
  <tr>
    <td>12</td>
    <td>B9-Water vapour</td>
    <td>935</td>
    <td>955</td>
    <td>60</td>
  </tr>
  <tr>
    <td>13</td>
    <td>SCL-Cloud layer</td>
    <td>N/A</td>
    <td>N/A</td>
    <td>20</td>
  </tr>
</table>
</p>

### Metadata om moln från webapi

<p>Varje gång nya data från Sentinel-2 kommit in till Skogsstyrelsen så görs en beräkning av andelen moln. Det görs i ett rutmönster över hela landet där varje ruta är 5x5 km. Informationen i dessa rutor lagras i en databastabell och används för att skapa staplarna som visualiseras i denna widget.</p>
<p>I bilden nedan visualiseras informationen från tabellen vid ett specifikt datum. I det här fallet har de 5km-rutor som innehåller mycket moln färgats med rött och de rutor som är relativt fria från moln fått en grön färg</p>

<img title="Sentinel2-bild från 2018-05-19" src="https://user-images.githubusercontent.com/26382924/84281803-4ce84f00-ab39-11ea-84ff-dd64a580e4a5.png" width="300px">

## Installation

### Installera Widget

Widget installeras i ArcGIS Portal som en Custom widget.

- <a href="https://enterprise.arcgis.com/en/portal/latest/use/add-custom-widgets.htm"> Installera och registrera Widget i ArcGIS Portal.</a>

### Installera Proxy för Portal

Bildtjänsten med Sentinel-2data kräver inloggning. För att slippa ange inloggningsuppgifter i en applikation kan anropen till tjänsten gå via en Forward Proxy som sätts upp i Portalen.

- <a href="https://enterprise.arcgis.com/en/portal/latest/administer/windows/using-a-forward-proxy-server-with-portal-for-arcgis.htm">Installera och konfigurera Forward Proxy.</a>

### Lägga till och konfigurera Widget

<a href="https://enterprise.arcgis.com/en/portal/latest/use/widgets-tab.htm">Allmänt om att lägga till widgets i Web Appbuilder.</a>

HittaBorranaWidget fungerar som både "off-panel" och "in-panel" widget. Den fungerar även som "on-screen" widget. När man lagt till widgeten får man direkt möjlighet att konfigurera den.
När man laddar ner widgeten från GitHub följer det med en config.json som delvis är infylld och anpassad för förändringsanalysen som avser barkborrar. Konfigurationen har JSON struktur.

#### Parametrar att konfigurera

- InputLayer - sökväg till ArcGIS REST tjänst med Sentinel-2 data.<br>Om man inte går via egen proxy anges:

```json
"InputLayer": {
    "url": "https://geodata.skogsstyrelsen.se/arcgis/rest/services/Swea/Sentinel2_2_0/ImageServer"
}
```

- ResultLayer - sökväg till ArcGIS REST tjänst med Sentinel-2 data.<br>Om man inte går via egen proxy anges:

```json
"ResultLayer": {
  "url": "https://geodata.skogsstyrelsen.se/arcgis/rest/services/Swea/Sentinel2_2_0/ImageServer"
}
```

- HistogramApi - sökväg till webapi som används av [Bildväljaren](#bildväljare).
- auth - uppgifter om autentiseringen mot Histogramtjänsten, erhålls när man ansöker om tillgång till Skogsstyrelsens externa API. För konfigurering se [Autentisering](#autentisering)

```json
"HistogramApi": {
  "url": "https://api.skogsstyrelsen.se/sksapi/v0.1/Raster/Scl/HistogramDateSummary",
  "auth": {
    "enabled": false,
    "authority": "",
    "clientId": "",
    "clientSecret": "",
    "scope": "",
    "grantType": ""
    }
}
```

#### Autentisering

Skogsstyrelsen API använder protokollet OAuth 2.0 för behörighetskontroll av alla anrop. För att kunna använda Skogsstyrelsen API måste en anropande applikation finnas registrerad i Skogsstyrelsen API. En registrerad applikation erhåller ett servicekonto med en unikt klient-id (ClientId) och en tillhörande privat nyckel (ClientSecret).

Användaruppgifterna (clientId & clientSecret nedan) erhålls av Skogsstyrelsen, och autentiseringen konfigureras sedan enligt följande:

- enabled: true/false, huruvida autentisering ska användas eller ej.
- authority: URL för autentiseringsservern.
- clientId: Applikationens klient-id.
- clientSecret: Applikationens privata nyckel.
- scope: Behörighetstyp. Värdet måste vara `sks_api`
- grantType: Typ av OAuth2 - flöde: Client Credentials. Värdet måste vara `client_credentials`

```json
"HistogramApi": {
  ...
  "auth": {
    "enabled": true,
    "authority": "https://auth.skogsstyrelsen.se/connect/token",
    "clientId": "XXXXXXXXXXXXXX",
    "clientSecret": "XXXXXXXXXXXXXXX",
    "scope": "sks_api",
    "grantType": "client_credentials"
    }
}
```

#### Förifyllda parametrar

- analysisRasterFunctions - Rasterfunktioner i tjänsten med Sentinel-2 data som används vid förändringsanalysen.<br>Ger användaren möjlighet att välja vilken förändringsanalys som ska användas i widgeten (se [Kartlager](#kartlager)).

```json
"analysisRasterFunctions": [
  {
    "name": "SKS_Barkborre",
    "displayName": "SKS Barkborre",
    "useAsDefault": true
  }
]
```

- DisplayRasterFunctions - Rasterfunktioner i tjänsten med Sentinel-2 data som används för visning av bilder.<br>Ger användaren möjlighet att välja hur ingående bilder ska visas (se [Kartlager](#kartlager)).

```json
"DisplayRasterFunctions": [
  {
    "name": "SKS_SWIR1",
    "displayName": "SWIR1 - Mellaninfraröda färger",
    "useAsDefault": false
  },
  {
    "name": "SJV_Jordbruksaktivitet",
    "displayName": "Jordbruksaktivitet",
    "useAsDefault": false
  }
]
```

Det går att ange flera rasterfunktioner både för visning och analys. Dock är det inte säkert att alla fungera med den här widgeten.
Det går att se vilka rasterfunktioner som är tillgängliga genom att se i tjänstens "child resources", RasterFunctionInfos https://geodata.skogsstyrelsen.se/arcgis/rest/services/Swea/Sentinel2_2_0/ImageServer/rasterFunctionInfos

För varje rasterfunktion som ska vara tillgänglig anges:

- `name` - rasterfunktionens namn i tjänsten ("name"). OBS! Var noga med stora och små bokstäver
- `displayName` - Namn som visas i widgeten under Kartlager.
- `useAsDefault` - Sätt till `true` för den rasterfunktion som ska visas som default, annars `false`.

## Användning

### Kartlager

<img title="Kartlager" src="https://user-images.githubusercontent.com/26382924/84244237-a59cf500-ab03-11ea-80df-b2ee83703b17.PNG" width="650px">

- Lagerlistan visar de lager i kartan som är nödvändiga för att utföra analysen.
- Aktivera/avaktivera kartlager genom att klicka i respektive checkbox.
- I höger kolumn finns menyer för den rasterfunktion som ska användas. För Sentinel-2lagret är detta endast visningslägen, dvs vilken rendering lagret ska ha för att visa _Före bild_ och _Efter bild_. För lagret <i>Förändringsanalys</i> väljs den rasterfunktion som ska användas vid förändringsanalysen.

### Bildväljare

<p>Bildväljaren är menat som ett verktyg för att underlätta att välja så bra bilder som möjligt för differensanalysen. En bra bild är att betrakta som en bild med minimala visuella 'störningar' så som moln, molnskugga, iskristaller, dimma, snötäcke mm. Vidare så spelar också bildernas datum in i analysen, både tidsspannet mellan bilderna och vilken årstid bilderna togs eftersom detta direkt påverkar vegationsindex.</p>
<p>För att det ska vara möjligt att upptäcka eventuella angrepp av barkborre måste analysen baseras på ett tillräckligt stort tidsspann mellan de två två bilderna. Hur stort det spannet ska vara kan variera mycket - från ett antal veckor till ett antal månader. Kunskapen om vad det är som avgör hur snart granbarkborrens angrepp syns i data från satellitbilder håller på att byggas upp. Full förståelse och tillräcklig erfarenhet saknas förnärvarande.</p>

<img title="Bildvaljare" src="https://user-images.githubusercontent.com/26382924/84247457-6d4be580-ab08-11ea-988f-67c4897c7fd9.PNG" width="650px">

- Verktyget består av två flikar; <i>Före bild</i> och <i>Efter bild</i>.
  - Den flik som är aktiv bestämmer både vilken bild som kommer att visas i kartfönstret men också vilken bild det är möjligt att välja ett datum för.
  - Med _Före bild_ avses den bild som har det äldsta datumet.
  - Med _Efter bild_ avses den bild som har det senaste datumet.
- Under respektive flik visas en graf med datum på x-axeln samt antal av ett valbart attribut på y-axeln. Grafen visar staplar som representerar ett datum där det finns en bild tillgänglig - men bara inom den aktuella kartutbredningen som för tillfället visas i kartfönstret. Stapelns höjd beror på vilket attribut som användaren valt att visa.
- För att ändra vilket attribut som ska visas, använd menyn till höger ovanför grafen. Följande attribut visas i menyn:
  - **Summa bra data**: (Default.) Vägd summa av de bilder med låg molnighet, lågt istäcke och snötäcke m.m. inom aktuell utbredning i kartan. Ett högt värde kan alltså tolkas som att den aktuella utbredningen i kartan innehåller många relativt klara bilder utan moln.
  - **Antal indexrutor**: Antal 5km-rutor i aktuellt extent
  - **Max indexrutor**: Största möjliga antal rutor i valt extent
  - **Täckning**: Täckning i procent (antal/max antal)
  - **Medel bra data**: (sumBraData / antalIndexrutor)
- Zooma i grafen genom att dra på grafytan med vänster musknapp intryckt. Zomma ut genom att högerklicka i grafytan.

<table style="width:100%">
  <tr>
    <td><img title="ZoomaGrafen" src="https://user-images.githubusercontent.com/26382924/84267859-0f7ac600-ab27-11ea-9540-a1050e91d784.png" width="500px"></td>
    <td><img title="InzoomadGraf" src="https://user-images.githubusercontent.com/26382924/84267877-199cc480-ab27-11ea-86d0-88c32a9f9a13.PNG" width="500px"></td>
  </tr>
  <tr>
    <td>Zooma genom att rita en ruta med vänster musknapp</td>
    <td>Det inzoomad området gör det lättare att välja rätt stapel</td>
  </tr>
</table>

- För att välja bild, klicka på önskad stapel i grafen. Datumet visas då i fältet under grafen. Samma procedur måste upprepas för både _Före bild_ och _Efter bild_.
  <img title="ValjStapelFore" src="https://user-images.githubusercontent.com/26382924/84268595-31c11380-ab28-11ea-8141-ea1587d8674c.PNG" width="500px">

### Valbara parametrar

<p>Här visas de parametrar som är valbara i förändringsanalysen. Här finns inte <i>Före bild</i> och <i>Efter bild</i> eftersom de är obligatoriska, men alla övriga parametrar har default värden som kan ändras.</p>

<img title="ValbaraPrametrar" src="https://user-images.githubusercontent.com/26382924/84248553-e435ae00-ab09-11ea-8824-41985439008c.PNG" width="650px">

#### Method

Parametern styr vilken typ av data som returneras till klienten

- _Colormap_ (default).
  - Räknar om analysen till ett värde värde mellan 0 och 255
  - Returnerar resultatet som en 8-bitars (u8) RGB-bild enligt färgskalan i bilden nedan
- _Raw_ (inte för display utan snarare för vidare bearbetning)
  - Detta är analysen precis som den ser ut från differensen mellan de båda bilderna utan någon skalering.
  - Returnerar det råa resultatet som en 32-bitars float (f32) där värdena löper mellan -2.0 och 2.0.
- _Grayscale_
  - Räknar om analysen till ett värde värde mellan 0 och 255.
  - Returnerar resultatet som en 8-bitars integer (u8) där värdena löper mellan 0 och 255.
  - Områden med låga pixelvärden (mörka) är områden med stor negativ förändring av vegetationsindexet i den senaste bilden.

<table style="width:100%">
  <tr>
    <td><img title="Colorbar" src="https://user-images.githubusercontent.com/26382924/84366632-6938ca00-abd3-11ea-85a2-9386fe25fbf4.png" height="300px"></td>
    <td>Bilden visar färgskalan som används när parametern är satt till <i>Colormap</i>.<br> Färgerna har optimerats för att lättare kunna urskilja förändringar sominnebär ett lägre<br>vegetationsindex i den senaste bilden. Blåa färger indikerar ingen förändring medan gula färger<br>visar på en stor negativ förändring av vegetationsindexet i den senaste bilden (<i>Efter bilden<i>).</td>
  </tr>
</table>

#### Translation

Parametern gör det möjligt att välja om de bilder som ingår i analysen ska matchas till varandra geometriskt. Data från Sentinel-2 dras tyvärr med en geometrisk förskjtning mellan bilderna som oftast gör att translatikonen är nödvändig. Detta förbättrar skärpan i analysen.

- _On_ (default)
  - Geometrisk korrigering utförs
- _Off_
  - Ingen geometrisk korrigering utförs.

#### Vegetation Index

Parametern styr vad som ska beräknas i varje satellitbild och som sedan skillnaderna ska baseras på

- _NDVI_ (Default) Normalised Difference Vegetation Index
- _SAVI_ Soil Adjusted Vegetation Index

#### Soil

Detta värde används endast om _Vegetation Index_ ovan har angivits till SAVI

- Decimalt värde mellan 0.0 och 1.0. Oftast hamnar ett bra värde mellan 0.3 och 0.5

#### Radnorm

Pixelvärdena i satellitdatat kan skilja sig åt något även om det i praktiken inte finns några större skillnader mellan objekten på marken. Oftast beror detta på skillnader i atmosfäriska som ljuset ska passera genom innan det når sensorn i satelliten, men det kan också bero på olika kalibreringar som satellitägaren utfört. Parametern _Radnorm_ kompenserar för dessa skillnader.

- _Regr_ (Default)
  - Kompensationen sker genom att matcha skillnaderna med hjälp av en iterativ regressionsanalys. 30% av pixlarna med de största skillnaderna kastas bort i varje iteration.
  - Denna metod är mer känslig för geometriska skillnader än vad histogrammatchningsmetoden är.
- _Hist_
  - Kompensationen sker här genom en iterativ histogrammatchning. På samma sätt som ovan så kastas 30% av pixlarna med störst skillnader bort i varje iteration.
- _None_
  - Ingen radiometrisk kompensation sker

#### NIR Band

För en korrekt beräkning av NDVI och SAVI måste rätt spektralband används. För en korrekt beräkning av dessa vegetationsindex måste _B8-NIR_ och _B4-RED_ användas (se tabellen ovan). Värdena bör inte ändras.

- Numeriskt värde mellan 1 och 12. (Default 4.)
- Band 13 i bildtjänsten ska aldrig användas. Det innehåller en tematisk klassning av molnen.

#### Red Band

- Numeriskt värde mellan 1 och 12. (Default 3.)
- Band 13 i bildtjänsten ska aldrig användas. Det innehåller en tematisk klassning av molnen.

## Licens

This project is licensed under the terms of the Apache License 2.0.

<a href="https://www.skogsstyrelsen.se/sjalvservice/karttjanster/geodatatjanster/villkor-for-nyttjande-av-skogsstyrelsens-kartdatabaser/">Villkor för nyttjande av Skogsstyrelsens geodata.</a>

Villkoren för nyttjande av bilder från Sentinel-2 från Copernicus-programmet framgår av pdf-dokumentet: <a href="https://scihub.copernicus.eu/twiki/pub/SciHubWebPortal/TermsConditions/TC_Sentinel_Data_31072014.pdf">Terms and conditions for the use and distribution of sentinel data.</a> I korthet säger dokumentet att man har full rätt att både nyttja och distribuera data men källan ska alltid anges genom att t.ex. för bilder tagna 2020 skriva **©Copernicus data 2020**. På Skogsstyrelsen har vi valt att att även skriva ut vilken datakällan är, t.ex. **©Copernicus Sentinel2 data 2020**.
