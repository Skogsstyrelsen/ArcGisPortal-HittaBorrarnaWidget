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
- [Installation](#installation)
- [Användning](#anvandning)
- [Licens](#licens)

## Systemkrav
- ArcGIS portal 10.7.1 med Web App Builder.
- Web App Builder Developer Edition ver 2.12 för att skapa fristående appliktioner eller anpassa widget.
## Installation
- <a href="https://enterprise.arcgis.com/en/portal/latest/use/add-custom-widgets.htm"> Installera och registrera Widget i ArcGIS Portal.</a>
- Konfigurera Widget
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
- För att välja bild, klicka på önskad stapel i grafen. Datumet visas då i fältet under grafen.

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
