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
  <p>- Web App Builder i ArcGIS Enterprise 10.7.1 <br>- Web App Builder Developer Edition ver 2.12 för att skapa fristående appliktioner eller anpssa behövs  <br></p>
  
- [Installation](#installation)
- [Användning](#anvandning)
- [Licens](#licens)

## Systemkrav

## Installation

## Användning
### Kartlager
<img title="Kartlager" src="https://user-images.githubusercontent.com/26382924/84244237-a59cf500-ab03-11ea-80df-b2ee83703b17.PNG" width="700px">

- Lagerlistan visar de lager i kartan som är nödvändiga för att utföra analysen.
- Aktivera/avaktivera kartlager genom att klicka i respektive checkbox.
- I höger kolumn finns menyer för den rasterfunktion som ska användas. För Sentinel lagret är detta endast visningslägen, dvs vilken rendering lagret ska ha för att visa före och efter bild. För lagret 'Förändringsanalys' väljs den rasterfunktion som ska användas vid förändringsanalysen.

## Licens

This project is licensed under the terms of the Apache License 2.0.
