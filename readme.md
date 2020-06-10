# Hittaborrarna Widget

### En widget för förändringsanalys mellan två rasterbilder<br>
<p>Denna widget förenklar valet av de satellitbilder som ingår i en förändringsanalys av eventuellt barkborreskadad skog. Den gör det dessutom enklare för användaren att hantera de parametrar som går att justera i analysen. Genom denna widget blir det möjligt att integrera förändringsanalysen med din egen organisations GIS-data och på så sätt strömlinjeforma ett arbetsflöde som underlättar letandet efter områden drabbade av granbarkborrens härjningar hela vägen från bildanalys till fältarbetet.</p>
<p></p>
<p>Exemplet nedan visar ett område där förändringen mellan två bilder analyserats.</p>
<table style="width:100%">
  <tr>
    <td><img title="Sentinel2-bild från 2018-05-19" src="https://user-images.githubusercontent.com/26382924/84134312-ade42a00-aa48-11ea-998f-3645ad10d843.png" width="300px"></td>
    <td><img title="Sentinel2-bild från 2019-05-29" src="https://user-images.githubusercontent.com/26382924/84134904-8b9edc00-aa49-11ea-8403-d27d81596937.png" width="300px"></td>
    <td><img title="Analys mellan 2018-05-19 och 2019-05-29" src="https://user-images.githubusercontent.com/26382924/84135070-ca349680-aa49-11ea-8e39-a559c1525d87.png" width="300px"></td>
  </tr>
  <tr>
    <td>Sentinel2-bild från 2018-05-19</td>
    <td>Sentinel2-bild från 2019-05-29</td>
    <td>Förändringsanalysen visar med<br>gulgrön färg de områden som<br>förändrats mellan de båda tillfällena</td>
  </tr>
</table>

<p>Analysen som utförs bygger på analys av satellitdata från Sentinel-2 inom det europeiska <a href="https://www.copernicus.eu/sv/">Copernicusprogrammet</a>. Satelliterna passerar Sverige flera gånger per vecka och kan därmed utnyttjas för att snabbt får en aktuell analys. Som vädret är i Sverige kommer tyvärr många bilder att innehålla moln och sökandet efter dem kan vara svårt och tidskrävande. Den här widgten underlättar sökandet efter de molnfria bilder som är lämpliga för analysen men gör det också möjligt att snabbt utföra själva analysen på de molnfria bilderna som valts.</p>
<p>I princip kan vilka bilder som helst användas för att analysera skogen. Funktionen filtrerar nämligen bort de områden som är täckta av moln, dis eller har ett av moln beskuggat område. Pixlar med snö kommer heller inte att analyseras. Men väljer man för molniga bilder eller bilder med snö kan analysen bli direkt felaktig eftersom det finns för få pixlar kvar som går att analysera.</p>
<p>Tjänsten bygger i grunden på en förändringsanalys där skillnaden i vegetationsindex mellan två bilder visas. Förändringarna görs på den skog som klassats som barrskogar eller blandskogar i Naturvårdsverkets <a href=https://www.naturvardsverket.se/Sa-mar-miljon/Kartor/Nationella-Marktackedata-NMD/">Nationella Marktäckedata (NMD)</a>. Användaren får därmed möjlighet att följa de  vitalitetsförändringar som poteniellt kan vara orsakade av granbarkborren.

## Innehållsförteckning

- [Systemkrav](#systemkrav)
- [Indata](#indata)
- [Installation](#installation)
- [Användning](#anvandning)
- [Licens](#licens)

## Systemkrav
- ArcGIS portal 10.7.1 med Web App Builder.
- Web App Builder Developer Edition ver 2.12 för att skapa fristående appliktioner eller anpassa widget.
- API nyckel för Skogsstyrelsens webapi som används av Bildväljaren.
- Användarnamn och lösenord för den ArcGIS bildtjänst med Sentineldata som används i widgeten. <a href="https://skogsstyrelsen.se/sjalvservice/karttjanster/geodatatjanster/skaffa-anvandarkonto/"> Beställ användarkonto på Skogsstyrelsens webbplats</a>.
## Indata

### Bildtjänsten Sentinel2_2_0
<p>Analysen bygger på data från satelliten Sentinel-2. Dessa data laddas dagligen ner till Skogsstyrelsen och görs tillgängliga via en bildtjänst med namnet Sentinel2_2_0. Som regel är nya uppdaterade data från gårdagens satellitpassager över Sverige på plats kl 09:30 dagen efter. Informationen om andelen moln är då samtidigt uppdaterade i en databas.</p>

### Metadata om moln från webapi
<p>Varje gång nya data från Sentinel-2 kommit in till Skogsstyrelsen så görs en beräkning av andelen moln. Det görs i ett rutmönster över hela landet där varje ruta är 5x5 km. Informationen i dessa rutor används för att skapa staplarna som visualiseras i denna widget.</p>

## Installation
### Installera Widget
Widget installeras i ArcGIS Portal som en Custom widget.
- <a href="https://enterprise.arcgis.com/en/portal/latest/use/add-custom-widgets.htm"> Installera och registrera Widget i ArcGIS Portal.</a>

### Installera Proxy för Portal
Bildtjänsten med Sentineldata kräver inloggning. För att slippa ange inloggningsuppgifter i en applikation kan anropen till tjänsten gå via en Forward Proxy som sätts upp i Portalen.
- <a href="https://enterprise.arcgis.com/en/portal/latest/administer/windows/using-a-forward-proxy-server-with-portal-for-arcgis.htm">Installera och konfigurera Forward Proxy.</a>
### Lägga till och konfigurera Widget
<a href="https://enterprise.arcgis.com/en/portal/latest/use/widgets-tab.htm">Allmänt om att lägga till widgets i Web Appbuilder.</a><br>
HittaBorranaWidget fungerar som både "off-panel" och "in-panel" widget. Den fungerar även som "on-screen" widget. När man lagt till widgeten får man direkt möjlighet att konfigurera den. 
När man laddar ner widgeten från GitHub följer det med en config.json som delvis är infylld och anpassad för förändringsanalys barkborrar. 
Konfiguraitonen har JSON struktur. Parametrar att konfigurera:
- InputLayer - sökväg till ArcGIS REST tjänst med Sentinel-2 data. Om man inte går via egen proxy anges "url":"https://geodata.skogsstyrelsen.se/arcgis/rest/services/Swea/Sentinel2_2_0/ImageServer"
- ResultLayer - sökväg till ArcGIS REST tjänst med Sentinel-2 data. Om man inte går via egen proxy anges "url":"https://geodata.skogsstyrelsen.se/arcgis/rest/services/Swea/Sentinel2_2_0/ImageServer"
- HistogramApi - sökväg till webapi som används av Bildväljaren. Här anges "url": "https//apitest.skogsstyrelsen.se/skshejsanhoppsan/v1/"
- apiKey - api nyckel för HistogramApi. Erhålls när man ansöker om tillgång till API.

Förifyllda parametrar:
- analysisRasterFunctions - Rasterfunktioner i tjänsten med Sentinel-2 data som används vid förändringdsanalysen. Ger användaren möjlighet att välja vilken förändringsanalys som ska användas i widgeten (sektion Kartlager).
- DisplayRasterFunctions - Rasterfunktioner i tjänsten med Sentinel-2 data som används för visning av bilder. Ger användaren möjlighet att välja hur ingående bilder ska visas (sektion Kartlager).

Det går att ange flera rasterfunktioner både för visning och analys. Dock är det inte säkert att alla fungera med den här widgeten.
Det går att se vilka rasterfunktioner som är tillgängliga genom att se i tjänstens "child resources", RasterFunctionInfos  https://geodata.skogsstyrelsen.se/arcgis/rest/services/Swea/Sentinel2_2_0/ImageServer/rasterFunctionInfos

För varje rasterfunktion som ska vara tillgänglig anges:
- name - rasterfunktionens namn i tjänsten ("name")
- displayName - Namn som visas i widgeten under Kartlager.
- useAsDefault - "true" visas som default, "false" visas inte som default.

## Användning
### Kartlager
<img title="Kartlager" src="https://user-images.githubusercontent.com/26382924/84244237-a59cf500-ab03-11ea-80df-b2ee83703b17.PNG" width="650px">

- Lagerlistan visar de lager i kartan som är nödvändiga för att utföra analysen.
- Aktivera/avaktivera kartlager genom att klicka i respektive checkbox.
- I höger kolumn finns menyer för den rasterfunktion som ska användas. För Sentinel lagret är detta endast visningslägen, dvs vilken rendering lagret ska ha för att visa före och efter bild. För lagret 'Förändringsanalys' väljs den rasterfunktion som ska användas vid förändringsanalysen.

### Bildväljare
<p>Bildväljaren är menat som ett verktyg för att underlätta att välja så bra bilder som möjligt för differensanalysen. En bra bild är att betrakta som en bild med minimala visuella 'störningar' så som moln, molnskugga, iskristaller, dimma, snötäcke mm. Vidare så spelar också bildernas datum in i analysen, både tidsspannet mellan bilderna och vilken årstid bilderna togs eftersom detta direkt påverkar vegationsindex.</p>

<img title="Bildvaljare" src="https://user-images.githubusercontent.com/26382924/84247457-6d4be580-ab08-11ea-988f-67c4897c7fd9.PNG" width="650px">

- Verktyget består av två flikar; 'Före bild' och 'Efter bild'.
- Under respektive flik visas en graf med datum på x-axeln samt antal av ett valbart attribut på y-axeln.
- För att ändra vilket attribut som ska visas, använd menyn till höger ovanför grafen. Följande attribut visas i menyn:
  - Antal indexrutor: Antal 5km-rutor i aktuellt extent
  - Max indexrutor: Största möjliga antal rutor i valt extent
  - Täckning: Täckning i procent (antal/max antal)
  - Summa bra data: Vägd summa av de bilder med låg molnighet, lågt istäcke och snötäcke mm. i aktuell utbredning i kartan. Ett högt värde kan alltså tolkas som att den aktuella utbredningen i kartan innehåller många relativt klara bilder utan moln.
  - Medel bra data: (sumBraData / antalIndexrutor)
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

- För att välja bild, klicka på önskad stapel i grafen. Datumet visas då i fältet under grafen.
<img title="ValjStapelFore" src="https://user-images.githubusercontent.com/26382924/84268595-31c11380-ab28-11ea-8141-ea1587d8674c.PNG" width="500px">


### Valbara parametrar
<p>Här visas de parametrar som är valbara i förändringsanalysen. Här finns inte 'Före bild' och 'Efter bild' eftersom de är obligatoriska, men all övriga parametrar har default värden som kan ändras.</p>

<img title="ValbaraPrametrar" src="https://user-images.githubusercontent.com/26382924/84248553-e435ae00-ab09-11ea-8824-41985439008c.PNG" width="650px">

#### Method:
Parametern styr vilken typ av data som returneras till klienten
- Colormap (default). 
  - Räknar om analysen till ett värde värde mellan 0 och 255
  - Returnerar resultatet som en 8-bitars (u8) RGB-bild enligt färgskalan i bilden nedan
- Raw (inte för display utan snarare för vidare bearbetning)
  - Detta är analysen precis som den ser ut från differensen mellan de båda bilderna utan någon skalering.
  - Returnerar det råa resultatet som en 32-bitars float (f32) där värdena löper mellan -2.0 och 2.0.
- Grayscale
  - Räknar om analysen till ett värde värde mellan 0 och 255
  - Returnerar resultatet som en 8-bitars integer (u8) där värdena löper mellan 0 och 255
#### Translation:
Parametern gör det möjligt att välja om de bilder som ingår i analysen ska mtachas till varandra geometriskt. Detta är oftast nödvändigt för att analysen ska få den skärpa som behövs.
- On (default)
  - Geometrisk korrigering utförs
- Off
  - Ingen geometrisk korrigering utförs.
#### Vegetation Index:
- NDVI
- SAVI
#### Soil:
- Numerisk värde mellan 0.0 och 1.0
#### Radnorm:
- Regr
- Hist
#### NIR Band:
- Numerisk värde mellan 1 och 12
#### Red Band:
- Numeriskt värde mellan 1 och 12

## Licens

This project is licensed under the terms of the Apache License 2.0.
